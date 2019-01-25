
<template>
   <view class="card-qa">
    <view class="title">
      <image v-if="img_prefixer2" class="icon" :src="img_prefixer2+'icon/qa.png'" />Q&A
    </view>
    <view class="tips_container">
      <view class="tips_title">
        Q：步步鸡e卡如何赠送？
      </view>
      <view class="tips">
        A：步步鸡e卡可在小程序内直接支付，并赠送给微信通讯录内好友或微信群，卡券按照先领先得的规则点击领取，直到领完为止。如24小时内未被领取，则此e卡将被退回。
      </view>
      <view class="tips_title">
        Q：步步鸡e卡如何激活使用？
      </view>
      <view class="tips">
        A：收到步步鸡e卡的用户可直接点击“激活使用”提交订单，并填写收货地址完成激活。也可以登录“步步鸡”小程序，在“我的”中选择e卡进行激活使用。
      </view>
      <view class="tips_title">
        Q：步步鸡跟其他鸡有什么不同？
      </view>
      <view class="tips">
        A：步步鸡在养殖中引入区块链、物联网、智能防伪等技术，实现鸡只成长过程步步可见，从而确保到达您餐桌的每一只步步鸡都是放心鸡。并且，您在收到鸡后可扫描脚环上的二维码查看鸡只生命档案。
      </view>
      <view class="tips_title">
        Q：步步鸡的脚环如何拆除和回收？
      </view>
      <view class="tips">
        A：我们郑重声明步步鸡脚环经过专业测试，确保健康安全无危害，拆除时剪断硅胶伸缩环即可，拆除后建议垃圾分类后再进行处理。
      </view>
      <view class="tips_title">
        Q：步步鸡的产地在哪里？
      </view>
      <view class="tips">
        A：步步鸡的养殖地选在自然生态优良的地区，截止目前，已在安徽、河南、贵州等地建立养殖基地。
      </view>
      <view class="tips_title">
        Q：步步鸡吃什么长大？
      </view>
      <view class="tips">
        A：步步鸡为谷物喂养，日食百草、啄昆虫，辅以果蔬、黑水虻，保证营养健康无添加。
      </view>
      <view class="tips_title">
        Q：步步鸡是什么品种？
      </view>
      <view class="tips">
        A：根据养殖地环境情况精选当地优质土鸡品种，比如安徽淮南麻黄鸡、寿霍土鸡、河南本地柴鸡等。
      </view>
      <view class="tips_title">
        Q：步步鸡的口感如何？
      </view>
      <view class="tips">
        A：步步鸡均为生态散养（100m2仅养15只）、日均运动超过5000步、且养足166天，因此其肉质鲜美口感绝佳。
      </view>
      <view class="tips_title">
        Q：步步鸡如何烹饪好吃？
      </view>
      <view class="tips">
        A：最纯正的土鸡，简单的烹饪就能保持最原始的味道，我们推荐您加盐炖汤即可，也可以根据自己的口味和喜好加入其他佐料，或者进行红烧，爆炒等。
      </view>
      <view class="tips_title">
        Q：冻鲜和冷鲜有什么区别？
      </view>
      <view class="tips">
        A：冻鲜：屠宰后先冷却排酸，随后转入速冻库进行超低温急冻，最大程度锁住鸡肉中的营养和水分，保证鸡肉口感。您可随吃随下单，不用漫长等待，顺丰全程-18℃恒温冷链配送，让您想吃就吃。
          <view>冷鲜：根据订单数统一屠宰、冷却排酸，随即交由顺丰冷运全程0-4℃恒温储运配送，从农场到餐桌，给您最新鲜的鸡肉品质。您需提前预约，指定日期发货。供给有限，重在口感更佳！</view>
      </view>
      <view class="tips_title">
        Q：步步鸡可配送的城市有哪些？
      </view>
      <view class="tips">
        A：步步鸡优先选择顺丰冷链配送，目前开通冷链运输的城市有：北京、上海、重庆、武汉、成都、西安、太原、郑州、大连、南京、无锡、苏州、南通、淮安、常州、济南、青岛、烟台、潍坊、合肥、芜湖、杭州、嘉兴、宁波、绍兴、温州、金华、福州、厦门、广州、深圳、佛山、东莞、南昌、长沙。其他未开通的城市可使用顺丰速运配送。
      </view>
    </view>
  </view>
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
      default() {

      }
    },
    showPayPop: {
      // 显示下一步
      type: Function,
      default() {

      }
    }

  },

  data() {
    return {
      allPrice: 0,
      forSelf: false,
      redcount: 1,
      number: 1
    }
  },

  computed: {
    payText() {
      return this.isSend ? '支付并赠送' : '支付'
    },
    buyNumText() {
      return this.isSend ? '每人领取份数' : '购买份数'
    },

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
  destroyed() {
    this.show = false
    this.$apply()
  },
  methods: {
    /**
     * 修改人数
     */
    handleNumber: function(event) {
      const { mp: { detail } } = event

      this.number = detail
    },
    /**
     * 修改份数
     */
    handleCopies: function(event) {
      const { mp: { detail } } = event

      this.redcount = detail
    },
    closePay() {
      this.$emit('click')
    },
    showPayPop() {
      this.$emit('goPayClick')
    },

  }
}
</script>

<style lang="scss">
.card-qa {
  padding: 0 36rpx 36rpx 36rpx;
  margin-bottom: 20rpx;
  background: #fff;
  font-size: 32rpx;

  .title {
    line-height: 100rpx;
    height: 100rpx;
    opacity: 0.6;
    border-bottom: 1rpx solid #ebebeb;

    image.icon {
      width: 34rpx;
      height: 34rpx;
      vertical-align: top;
      margin-top: 30rpx;
      margin-right: 10rpx;
    }
  }

  .tips_container {
    background: #fff;
    padding: 20rpx 0 80rpx 0;

    .tips_title {
      padding: 20rpx 0;
      font-size: 30rpx;
      color: #000;
    }

    .tips {
      font-size: 26rpx;
      color: #8d8d8d;
      margin-bottom: 50rpx;
    }
  }
}

</style>
