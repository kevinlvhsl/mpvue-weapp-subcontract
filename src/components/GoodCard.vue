<template>
  <view class="good-card">
    <view class="left">
      <img :src="img" alt="商品" class="default-bg" />
    </view>
    <view class="center">
      <view class="title c000">{{productName}}</view>
      <view v-if="skuName && !orderType" class="sku">{{skuName}}</view>
      <view v-if="activetime && orderType">{{activetime}}</view>
    </view>
    <view class="right">
      <view class="price c333"><span v-if="!priceType">￥</span>{{price}}</view>
      <view class="count c666"><span v-if="count">x</span> {{count}}</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'card',
  props: ['img', 'productName', 'skuName', 'price', 'count', 'activetime', 'num', 'orderType'],
  computed: {
    priceType() { // 满足 买一赠一需求
      return parseFloat(this.price).toString() === 'NaN'
    }
  }
}
</script>

<style lang="scss">
.good-card {
  display: flex;
  padding: 20rpx;
  align-items: stretch;
  font-size: 24rpx;
  width: 100%;
  .left {
    width: 150rpx;
    height: 150rpx;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .center {
    margin: 0 16rpx;
    flex: 1;
    text-align: left;
    >view{
      margin-bottom:3px;
    }
    .title{
      font-size: 14px;
      color: #333;
    }
    .sku {
      color: #999;
      font-size: 12px;
    }
  }
  .right {
    width: 200rpx;
    color: #333;
    text-align: right;
    .count {
      color: #666;
    }
  }
}
</style>
