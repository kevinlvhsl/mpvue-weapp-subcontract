<template>
  <div class="page page-orders">
    <div class="container">
      <view class="order-list" :style="{'min-height': minHeight + 'px; padding: 0'}">
        <view class="list-item-order" v-if="list && list.length"
          v-for="(item, index) in list" :key="index">
          <view class="order-title">
              <view class="order-no"> 订单编号： {{item.orderNo}}</view>
              <view :class="['order-state', item.showStatus > STATUS_STR.THREE ? 'signed' : 'unSign']"> {{item.showStatusName}}</view>
          </view>
          <view class="order-detail" @click="goDetail(item.orderNo)">
            <GoodCard
              :img="item.skuImg"
              :productName="p.productName"
              :skuName="p.skuName"
              :price="p.price"
              :count="p.quantity"
              v-for="(p,pid) in item.orderItem"
              :key="pid"
            />
          </view>
          <view>
            <GoodCard
              v-if="item.promotion && item.promotion.isBuyOneWithFreeOne"
              :img="item.skuImg"
              :productName="p.productName"
              :skuName="p.skuName"
              price="赠品"
              :count="p.quantity"
              v-for="(p,pid1) in item.orderItem"
              :key="pid1"
            />
          </view>
          <view class="order-amount">共{{item.orderItem.length}}件商品 实付
            <text class="bold fs32 c333">￥{{item.amountPaid}} </text></view>
          <view class="btns">
            <view class="btn btn-5 btn-ghost" v-if="item.showStatus === STATUS_STR.ONE" @click="cancel(item)">取消订单</view>
            <view class="btn btn-5 btn-theme" v-if="item.showStatus === STATUS_STR.ONE" @click="goPay(item)">去支付</view>
            <view class="btn btn-5 btn-ghost" v-if="item.showStatus > STATUS_STR.TWO && item.showStatus < STATUS_STR.FIVE" @click="goExpress(item.orderNo)">查看物流</view>
            <view class="btn btn-5 btn-theme" v-if="item.showStatus === STATUS_STR.FOUR && !item.haveComment" @click="goComment(item)">去评价</view>
          </view>
        </view>

        <view class="empty-main" style="margin-top: 220rpx;" v-if="!loading && list && !list.length">
          <view>
              <image :src="OSS_PREV + '/order_empty.png'" class="empty-image" />
          </view>
          <view class="empty-text">{{'您还没有订单,赶紧去购买吧'}}</view>

          <view class="empty-others flex-xy" @tap="goIndex"> 去看看 </view>
        </view>
        <view class="no-more" v-if="!loading && list.length && !hasMore">没有更多了</view>
      </view>
    </div>
    <PayMode
      :showPay="showPay"
      :orderId="orderId"
      @close="showPay = false"
      @payFail="payFail"
      @PaySuccess="paySuccess"
    />
    <van-toast id="van-toast" />
  </div>
</template>

<script>
import { getOrders, cancelOrder } from '@/api/order'
import PayMode from '@/components/PayMode'
import GoodCard from '@/components/GoodCard.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'orders',
  components: {
    PayMode,
    GoodCard
  },
  data() {
    return {
      loading: true,
      list: [],
      showPay: false,
      orderId: '',
      start: 0,
      PAGE_SIZE: 10,
      hasMore: true,
      countDown: [],
      timer: null
    }
  },
  computed: {
    ...mapGetters(['STATUS_STR', 'systemInfo']),
    minHeight() {
      return this.systemInfo.windowHeight ? this.systemInfo.windowHeight - 45 : 558
    },
    listLength() {
      return this.list.length
    },
    pagenation() {
      return {
        start: this.listLength,
        length: this.PAGE_SIZE
      }
    },
  },
  methods: {
    // 重新获取第一页数据（刷新）
    getFirstPage() {
      clearInterval(this.timer)
      this.hasMore = true
      this.list = []
      this.getData()
    },
    async getData() {
      this.loading = true
      const data = await getOrders(this.pagenation)
      this.loading = false
      console.log('查到的订单：', data)
      if (!data || (data && data.length !== this.PAGE_SIZE)) {
        console.log('没有10条了', data.length)
        this.hasMore = false
      }
      const list = data.map(ord => {
        ord.amountPaid = this.toFixed(ord.amountPaid)
        return ord
      })
      wx.stopPullDownRefresh()
      this.list = [...this.list, ...list]
    },
    goDetail(orderNo) {
      wx.navigateTo({ url: '/pages/orderDetail/main?orderNo=' + orderNo })
    },
    async cancel(item) {
      const res = await cancelOrder(item.orderNo)
      if (res) {
        this.$toast.success('取消成功')
        setTimeout(() => {
          this.getFirstPage()
        }, 1000)
      }
    },
    goPay(order) {
      console.log('goPay')
      this.orderId = order.orderNo
      this.showPay = true
    },
    payFail() {
      console.log('支付失败')
      this.showPay = false
    },
    paySuccess() {
      console.log('支付成功')
      this.showPay = false
    },
    goComment(order) {
      wx.navigateTo({
        url: `/pages/commentEdit/main?orderNo=${order.orderNo}&projectId=${order.productId}`
      })
    },
    goExpress(orderNo) {
      wx.navigateTo({ url: '/pages/expressDetail/main?orderNo=' + orderNo })
    },
  },
  onPullDownRefresh() {
    console.log('下拉了')
    this.getFirstPage()
  },
  onReachBottom() {
    console.log('上拉了')
    if (this.hasMore) {
      this.getData()
    }
  },
  onUnload() {
    this.list = []
    clearInterval(this.timer)
  },
  onHide() {
    this.hasMore = true
    clearInterval(this.timer)
  },
  async onShow() {
    // 如果从上一个页面过来时，有地址信息，则修改地址信息
    this.hasMore = true
    this.list = []
    this.getData()
    setTimeout(() => {
      if (this.list.some(i => i.showStatus === this.STATUS_STR.ONE)) {
        clearInterval(this.timer)
        // 如果有未支付订单， 一分钟刷一次数据
        this.timer = setInterval(() => {
          this.getFirstPage()
        }, 60 * 1000)
      }
    }, 2000)
  }
}
</script>

<style lang="scss">
.page-orders {
  padding: 5px 0;
  .container {
    .order-list {
      width: 100%;
      height: auto;
      box-sizing: border-box;
      padding: 0 30rpx 20rpx;
      .list-item-order {
        width: 100%;
        font-size: 26rpx;
        position: relative;
        color: #737373;
        margin: 20rpx auto;
        background-color: #fff;
        padding: 10rpx 0;
        .order-title {
          height: 66rpx;
          line-height: 66rpx;
          padding-left: 20rpx;
          .order-time {
            font-size: 26rpx;
            color: #acacac;
          }
          .order-state {
            position: absolute;
            top: 10rpx;
            right: 15rpx;
            font-size: 24rpx;
            width: 120rpx;
            height: 46rpx;
            color: #ef7349;
            font-weight: bold;
            text-align: right;
            &.unSign {
                color: #f8b428;
            }
            &.signed {
                color: #000;
            }
          }
        }
        .order-detail {
          padding-left: 10rpx;
          display: flex;
          // background-color: #FAFAFA;
          .detail-left {
            width: 160rpx;
            padding-top: 20rpx;
            .product-img {
              width: 134rpx;
              height: 134rpx;
              margin: 0 10rpx;
            }
          }
          .detail-right {
            flex: 1;
            .prodName {
              width: 500rpx;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .desc-item {
              line-height: 60rpx;
            }
          }
        }
        .order-amount {
          padding: 0 20rpx;
          line-height: 60rpx;
          margin-top: 20rpx;
          height: 60rpx;
          text-align: right;
          font-size: 28rpx;
          color: #666;
        }
        .btns {
          display: flex;
          justify-content: flex-end;
          padding: 10rpx 0;
          .btn {
            margin: 10rpx 20rpx 10rpx 0;
            min-width: 180rpx;
          }
        }
      }
    }
    .no-more {
      text-align: center;
      font-size: 28rpx;
      color: #999;
      line-height: 80rpx;
    }
  }
}
</style>
