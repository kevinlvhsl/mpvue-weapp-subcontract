<template>
    <van-popup :show="show"
    :close-on-click-overlay="true"
    overlay-style="background:block"
    position="bottom"
    :overlay="true"
    @close="closePay">
      <div class="payItem">
        <div>赠送人数</div><div><van-stepper value="1" @change="handleNumber" maxlength="2" /></div>
      </div>
      <div class="payItem">
        <div>{{buyNumText}}</div><div><van-stepper value="1" @change="handleCopies" /></div>
      </div>
      <div class="payItem" v-if="isSend">
        <div>总购买份数</div><div class="num">{{number * redcount}}份</div>
      </div>
     <div class="gap"></div>
         <div class="payment">
            应付款：<label for="" style="color: #d84124; font-weight: 500; font-size: 43rpx;">¥ {{allPrice}}</label>
         </div>
      <div>
          <div class="sendToFriend" @tap="showPayPop">{{payText}}</div>
      </div>

    </van-popup>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      twoWay: true,
      default: false
    },
    price: {
      type: String,
      default: ''
    },
    isSend: {
      // 是否买来送人
      type: Boolean,
      default: false
    },
    closePay: {
      // 关闭回调
      type: Function,
      default() {}
    },
    showPayPop: {
      // 显示下一步
      type: Function,
      default() {}
    }
  },

  data() {
    return {
      allPrice: 0,
      forSelf: false,
      number: 1,
      redcount: 1,
    }
  },

  computed: {
    payText() {
      return this.isSend ? '支付并赠送' : '支付'
    },
    buyNumText() {
      return this.isSend ? '每人领取份数' : '购买份数'
    }
  },
  watch: {
    number(newV, oldV) {
      this.allPrice = newV * this.price * this.redcount
    },
    redcount(newV, oldV) {
      this.allPrice = newV * this.number * this.price
    },
    price(newV, oldV) {
      this.allPrice = newV * this.number * this.redcount
    }
  },
  onUnload() {
    this.closePay()
    this.number = 1
    this.redcount = 1
    this.allPrice = this.price
  },
  mounted() {
    this.allPrice = this.price
  },
  methods: {
    /**
     * 修改人数
     */
    handleNumber: function(event) {
      const {
        mp: { detail }
      } = event

      this.number = detail
    },
    /**
     * 修改份数
     */
    handleCopies: function(event) {
      const {
        mp: { detail }
      } = event

      this.redcount = detail
    },
    closePay() {
      this.$emit('click')
    },
    showPayPop() {
      this.$emit('goPayClick', this.number, this.redcount)
    }
  }
}
</script>

<style lang="scss">
.payItem {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  padding: 30rpx;
  font-size: 16px;
}
.payItem > div {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}
.payItem > div:last-child {
  text-align: right;
}
.gap {
  width: 100%;
  background-color: #f3f3f7;
  height: 10px;
}
.num {
  font-size: 20px;
  color: #4c4c4c;
  letter-spacing: 5px;
}

.payment {
  text-align: center;
  font-size: 16px;
  padding: 16px 0 10px 0;
}
.goods-item-giftsName {
  font-weight: 400;
  font-size: 32rpx;
}

.goods-item-giftsItemName {
  font-weight: 400;
  font-size: 24rpx;
}

.goods-item-giftsAmountName {
  font-weight: 400;
  font-size: 34rpx;
}

.weui-cell:before {
  content: ' ';
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1rpx solid #f3f3f7;
  color: #d9d9d9;
  left: 15px;
  right: 15px;
}
</style>
