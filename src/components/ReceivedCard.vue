<template>
  <view class="list-item">
    <view class="list-item-head">
      <image :src="item.cardHalfImg" class="default-bg" />
      <view class="totalNum">{{item.cardNum}}份</view>
    </view>
    <view class="list-item-body">
      <view class="lib-head lib-head2 li-policy flex-xy">
        <view class="lc-left2 flex-xy">
          <view>
            <image class="userImg2" :src="item.giftFromUserHeadImgUrl"/>
          </view>
          <view>
            <view class="nickName2">{{item.giftFromUserNick}}</view>
            <view class="receDate2">送给我的礼物<text>{{item.gmtCreated}}</text></view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: {}
    }
  },
}
</script>

<style lang="scss">
.list-item {
  padding-top: 40rpx;
  position: relative;
}
.list-item-head {
  text-align: center;
  image {
    width: 690rpx;
    height: 200rpx;
    border-radius: 20rpx 20rpx 0 0;
    z-index: -1;
  }
  .policyPackage {
    position: absolute;
    font-size: 24rpx;
    top: 150rpx;
    left: 73rpx;
    color: #ab6236;
  }
  .totalNum {
    position: absolute;
    top: 50rpx;
    right: 10rpx;
    width: 90rpx;
    height: 44rpx;
    font-size: 26rpx;
    line-height: 46rpx;
    background-color: #fff;
    border-radius: 22rpx;
  }
}
.list-item-body {
  margin-top: -14rpx;
  background-color: #fff;
  border-radius: 0 0 20rpx 20rpx;
  .lib-head {
    padding: 20rpx 0 20rpx 0;
    margin: 0 28rpx;
    justify-content: space-between;
    border-bottom: 1rpx solid #e5e5e5;
  }
  .li-policy {
    border: none;
  }
  .price {
    color: #343434;
    font-size: 38rpx;
  }
  .receiveTime {
    color: #b9b9b9;
    font-size: 24rpx;
  }
  .status-text {
    font-size: 14px;
  }
  .lib-right {
    font-size: 26rpx;
    line-height: 26rpx;
    border: 1px solid #bfbfbf;
    padding: 14rpx 20rpx;
    border-radius: 40rpx;
    position: relative;
  }
  .lib-right:active {
    background-color: #f5f5f5;
  }
  .dataCollectButton {
    position: absolute;
    top: 0;
    left: 0;
    width: 190rpx;
    height: 66rpx;
    opacity: 0;
  }
  .receivedList {
    .listContent {
      justify-content: space-between;
      margin: 0 28rpx;
      padding: 20rpx 0;
      border-bottom: 1rpx solid #e3e3e3;
      display: none;
      overflow: hidden;
    }
    .click {
      padding-bottom: 20rpx;
      overflow: hidden;
    }

    .last {
      border-bottom: 0rpx solid #e3e3e3;
    }
    .userImg {
      width: 70rpx;
      height: 70rpx;
      border-radius: 50%;
      margin-right: 20rpx;
    }
    .nickName {
      font-size: 30rpx;
    }
    .receDate {
      font-size: 24rpx;
      color: #999;
    }
    .listActive {
      display: flex;
      animation-iteration-count: 1;
      animation: heightChange 500ms;
      position: relative;
      z-index: 3;
      // transform: translateY(-100%);
    }
    @keyframes heightChange {
      0% {
        transform: translateY(-100%);
      }
      100% {
        transform: translateY(0%);
      }
    }
  }

  .rl-left {
    color: #6b80a5;
    font-size: 26rpx;
  }
  .rl-right {
    transition: transform 0.6s;
  }
  .rl-right-active {
    transform: rotate(180deg);
  }
  .rl-right image {
    width: 25rpx;
    height: 16rpx;
    margin-bottom: 6rpx;
  }
  .lib-head2 {
    padding: 0;
    .userImg2 {
      width: 70rpx;
      height: 70rpx;
      margin-top: 18rpx;
      border-radius: 50%;
      margin-right: 10rpx;
    }
    .nickName2 {
      font-size: 28rpx;
      width: 550rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .receDate2 {
      font-size: 24rpx;
      color: #999;
      text {
        float: right;
        text-align: right;
        font-size: 24rpx;
        color: #999;
        width: 300rpx;
      }

    }
  }
}
</style>
