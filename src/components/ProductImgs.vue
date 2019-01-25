<template>
  <view class="prduct-img">
    <div class="comparison-title">
      <div class="horizon"></div>
      <div class="horizon-text">步步鸡提货卡</div>
    </div>
    <view style="width:100%;font-size:0px;">
      <image
        v-for="img in images"
        :key="img"
        :src="img"
        class="default-bg"
        style="width: 750rpx;"
        mode="widthFix"
      />
    </view>
  </view>
</template>

<script>

export default {
  props: {
    images: {
      type: Array,
      default() {
        return ['http://p-za-chicken.oss-cn-hzfinance.aliyuncs.com/bubuji/product_intoduce_1_1.png']
      }
    }
  },
  data() {
    return {
      randomVersion: Date.now()
    }
  }
}
</script>
<style lang="scss">
.prduct-img {
  background: #fff;
  .comparison-title {
    position: relative;
    width: 492rpx;
    height: 88rpx;
    margin: 0 auto;
    padding-top: 42rpx;
    .horizon {
      height: 2rpx;
      background-color: #e6e6e6;
    }
    .horizon-text {
      position: absolute;
      top: 44rpx;
      left: 50%;
      line-height: 44rpx;
      font-size: 32rpx;
      padding: 0 22rpx;
      text-align: center;
      transform: translate(-50%, -50%);
      background-color: #fff;
      z-index: 5;
      font-weight: 600;
    }
  }
  image {
    width: 750rpx;
  }
}
</style>
