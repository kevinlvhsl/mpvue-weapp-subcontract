<template>
  <view class="pay-channel" v-if="showPay">
    <view class="modal paymodal"></view>
    <block>
      <view class="pay-pop">
        <view class="pop-title">选择支付方式
          <view @tap="closePayModal" class="payClose iconfont icon-cha1"></view>
        </view>
        <view class="pop-content">
          <form report-submit="true">
            <radio-group class="radio-group" @change="radioChange">
              <view class="item">
                <label class="radio">
                  <div class="iconfont icon-weixin wxicon"></div>
                  <text class="text-ct">微信支付</text>
                  <radio value="wx" :checked="payChannel === 'wx'"/>
                </label>
              </view>
              <view class="item bottom-bor">
                <label class="radio">
                  <image v-if="OSS_PREV" class="pimg zuifuli" :src="OSS_PREV+'/icon/zuifuli.png'" />
                  <text class="text-ct">最福利积分兑换</text>
                  <radio value="zfl" class="radio_style" :checked="payChannel === 'zfl'"/>
                </label>
              </view>
            </radio-group>
          </form>
        </view>
        <view class="pop-footer">
          <form report-submit="true" @submit="toPay">
            <button class="btn-pay" formType="submit">确认支付</button>
          </form>
        </view>
      </view>
    </block>
  </view>
</template>

<script>
import { CreatePay } from '@/api/pay'
import { getOrderStatus } from '@/api/order'
import { mapActions } from 'vuex'

export default {
  props: {
    // 是否展示支付窗口
    showPay: {
      type: Boolean,
      twoWay: true,
      default: false
    },
    // 订单批次
    orderId: {
      type: String,
      default: 0
    }
  },
  data() {
    return {
      payChannel: 'wx', // 支付渠道
      timer: null, // 定时器句柄
      reqStatus: false // 请求状态
    }
  },
  computed: {
    ...mapActions
  },
  onLoad() {
    this.payChannel = 'wx'
  },
  methods: {
    clearTimer() {
      console.log('主动关闭了timer')
      clearInterval(this.timer)
      this.timer = null
    },
    checkPaySts(orderNo) {
      // 最福利 未支付时返回
      if (wx.getStorageSync('zflPayRun') === false) {
        this.clearTimer()
        wx.removeStorageSync('zflPayRun')
      }

      getOrderStatus({
        orderNo
      }).then(
        result => {
          this.a++

          // 支付成功
          if (result.paymentStatus === 20) {
            this.$emit('PaySuccess')
            this.clearTimer()
            //  支付成功
            wx.redirectTo({
              url: `/pages/paymentSuccess/main?orderId=${orderNo}`
            })
          } else {
            if (this.a >= 1000) this.orderFail()
          }
        },
        res => {
          console.error('查询状态error了')
          if (res.errMsg !== 'requestPayment:fail') {
            if (this.a >= 1000) this.orderFail()
          }
        }
      )
    },
    orderFail() {
      this.clearTimer()
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '查询不到状态,请稍后看看',
        success() {
          wx.redirectTo({
            url: `/pages/orders/main`
          })
        }
      })
    },
    closePayModal() {
      this.clearTimer()
      this.showPay = false
      this.$emit('close')
      this.$emit('toPage')
    },
    radioChange(event) {
      const {
        mp: { detail }
      } = event
      this.collectFormId(event)
      this.payChannel = detail.value
    },
    // 支付
    toPay(event) {
      // const { mp: { detail } } = event
      this.collectFormId(event)
      let param = {
        orderId: this.orderId
      }
      this.showPay = false
      this.$emit('close')
      // 最福利
      if (this.payChannel === 'zfl') {
        // 最福利积分兑换
        param.payWay = 'zfl'
        CreatePay(param).then(
          result => {
            this.clearTimer()
            if (result) {
              this.timer = setInterval(() => { this.checkPaySts(result.orderNo) }, 1000)
              wx.navigateTo({
                url: `/pages/payWeb/main?url=${encodeURIComponent(result.url)}`,
                success() {
                  // 设置flag
                  wx.setStorageSync('zflPayRun', true)
                }
              })
            }
          },
          () => {
            this.clearTimer()
          }
        )
      } else {
        // 微信支付
        param.payWay = 'wx_lit'
        CreatePay(param).then(result => {
          if (result === null) {
            this.$emit('payFail')
            return
          }
          var payParams = result.channelPayParams.payParams

          if (payParams) {
            this.timer = setInterval(() => {
              this.checkPaySts(result.outTradeNo)
            }, 1000)
            //  微信支付
            wx.requestPayment({
              timeStamp: payParams.timeStamp,
              nonceStr: payParams.nonceStr,
              package: payParams.package,
              signType: payParams.signType,
              paySign: payParams.paySign,
              success: res => {
                console.log('requestPayment success')
              },
              fail: res => {
                this.clearTimer()
                this.$emit('payFail')
              },
              complete: res => {
                console.log('requestPayment complete')
              }
            })
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
.wxicon,
.zflicon {
  font-size: 40px;
}
.wxicon {
  color: #5ac33a;
  margin: -2px;
}
.zflicon {
  color: #c33d30;
}
.payClose {
  position: absolute;
  right: 14px;
  font-size: 20px;
  top: 0px;
  color: #ccc;
}
/* 选中后的 背景样式 （红色背景 无边框 可根据UI需求自己修改） */
radio .wx-radio-input.wx-radio-input-checked {
  border: none;
  background: #f8b428;
}
/* 选中后的 对勾样式 （白色对勾 可根据UI需求自己修改） */
radio .wx-radio-input.wx-radio-input-checked::before {
  border-radius: 50%; /* 圆角 */
  width: 27px; /* 选中后对勾大小，不要超过背景的尺寸 */
  height: 27px; /* 选中后对勾大小，不要超过背景的尺寸 */
  line-height: 27px;
  text-align: center;
  font-size: 18px; /* 对勾大小 30rpx */
  color: #fff; /* 对勾颜色 白色 */
  background: #f8b428;
  transform: translate(-50%, -50%) scale(1);
  -webkit-transform: translate(-50%, -50%) scale(1);
}
.pay-channel {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 999;
  .modal {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #414141;
    opacity: 0.8;
    z-index: 102; // transition: opacity 0.5s ease-in-out;
  }
  .paymodal {
    z-index: 200;
  }
  .pay-pop {
    width: 632rpx;
    background-color: #fff;
    position: fixed;
    left: 59rpx;
    top: 318rpx;
    z-index: 300;
    overflow: hidden;
    border-radius: 12rpx;
    .pop-title {
      line-height: 100rpx;
      font-size: 32rpx;
      text-align: center;
    }
    .pop-content {
      height: 278rpx;
      font-size: 28rpx;
      box-sizing: border-box;
      .item {
        line-height: 128rpx;
        height: 128rpx;
        display: flex;
        width: 90%;
        margin: 0 auto;
        color: rgba(31, 31, 31, 0.9);
        .radio {
          display: flex;
          line-height: 128rpx;
        }
        .pimg {
          height: 72rpx;
          width: 72rpx;
          margin-top: 28rpx;
        }
        .text-ct {
          width: 450rpx;
          text-indent: 24rpx;
        }
        &.bottom-bor {
          border-top: 1rpx solid rgba(227, 227, 227, 0.5);
        }
      }
    }
    .pop-footer .btn-pay {
      background-color: #f8b428;
      height: 100rpx;
      line-height: 100rpx;
      font-size: 32rpx;
      text-align: center;
      color: #fff;
      border-radius: 0;
    }
    .pop-footer .btn-pay::after {
      border-radius: 0;
    }
  }
}
</style>
