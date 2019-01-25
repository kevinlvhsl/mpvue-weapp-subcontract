<template>
  <view class="com-list-loading">
    <image v-if="OSS_PREV" :src="OSS_PREV + '/icon/loading1.png'" class="loading-img animate-loading" />
    <view class="loading-text">加载中...</view>
  </view>
</template>
<script>
export default {
  name: 'list-loading',
  created () {
  }
}
</script>

<style lang="scss">
.com-list-loading {
  padding-top: 20rpx;
  text-align: center;
  .loading-img {
    width: 40rpx;
    height: 40rpx;
    margin: 10rpx auto;
  }
  .loading-text {
    text-align: center;
    font-size: 30rpx;
    color: #9E9E9E;
    margin-left: 10rpx;
  }
}
</style>
