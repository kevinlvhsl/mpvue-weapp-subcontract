<template>
  <view class="list-item">
    <view class="list-item-head">
      <image :src="item.cardHalfImg" class="default-bg" />
      <view class="totalNum">{{item.cardNum}}份</view>
    </view>
    <view class="list-item-body">
      <view class="lib-head flex-xy">
        <view class="lib-left">
          <view class="price">¥ {{item.unitPrice}}</view>
          <view class="receiveTime">{{item.gmtCreated}}</view>
        </view>
        <view v-if="item.orderId && item.statusText == '1'" class="lib-right" @tap="shareRedPacket" >
          <button class="dataCollectButton" data-za-title="送礼记录-分享给好友"></button>分享给好友
        </view>
        <view class="status-text" v-if="item.orderId && item.statusText == '2'">{{STATUS_TEXT[item.statusText]}}</view>
        <view class="status-text" v-if="item.orderId && item.statusText == '3'">{{STATUS_TEXT[item.statusText]}}</view>
        <view class="status-text" v-if="!item.orderId && item.statusText == '1'"><button class="sendSingleCard" open-type="share" :data-giftid="item.giftId" :data-cardimg="item.cardImg">分享给好友</button></view>
        <!-- <view class="status-text" v-if="!item.orderId">{{STATUS_TEXT[item.statusText]}}</view> -->
      </view>
      <view class="receivedList">
        <view class="click" @tap="clickList">
          <view class="rl-head flex-xy">
            <view class="rl-left">已领取的好友（{{item.haveOpened}}/{{item.giftNum}}）</view>
            <view :class="['iconfont icon-arrow-up', openIcon ? 'rl-right-active' : '']"></view>
          </view>
          <view :key="key1"  v-for="(it,key1) in receivedList" :class="['listContent flex-xy last', openIcon ? 'listActive' : '']">
            <view class="lc-left flex-xy">
              <view>
                <image class="userImg" :src="it.headImgUrl" />
              </view>
              <view class="nickName">{{it.nick}}</view>
            </view>
            <view class="receDate">
              <view style="text-align:right;font-size: 28rpx;color:#666;">x {{it.cardNum}}份</view>
              {{it.gmtCreated}}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { queryGiftOpenRecord } from '@/api/gift'
export default {
  props: {
    item: {
      type: Object,
      default: {}
    },
    username: {
      type: String
    }
  },
  data: function data() {
    return {
      STATUS_TEXT: {
        '1': '领取中',
        '2': '已领完',
        '3': '已退回'
      },
      receivedList: [], // 领取人列表
      openIcon: false
    }
  },
  methods: {
    //  切换tab （注意后期需要在切换的时候进行数据请求）
    shareRedPacket() {
      wx.redirectTo({
        url: '/pages/giftSendCard/main?tradeNo=' + this.item.orderId + '&batchNo=' + this.item.batchNo
      })
    },
    clickList: function clickList() {
      this.openIcon = !this.openIcon
      const { haveOpened, giftNum } = this.item
      if (haveOpened === giftNum && this.receivedList.length === giftNum) return
      queryGiftOpenRecord({ giftId: this.item.giftId }).then(result => {
        this.receivedList = result.openUsers
        this.item.haveOpened = result.openedNum

        if (result.openedNum === result.giftNum) this.item.statusText = '2'
      })
    }
  }
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
  .lib-right,.sendSingleCard {
    font-size: 26rpx;
    line-height: 26rpx;
    border: 1px solid #bfbfbf;
    padding: 14rpx 20rpx;
    border-radius: 40rpx;
    position: relative;
  }
  .lib-right:active,.sendSingleCard:active {
    background-color: #f5f5f5;
  }
 .sendSingleCard::after{
   border:0;
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
      // padding-top: 20rpx;
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
  }
 .rl-head {
    padding: 10px 28rpx;
    justify-content: space-between;
    position: relative;
    z-index: 9;
    background: #fff;
    width: 100%;
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
      text {
        font-size: 24rpx;
        display: inline-block;
        width: 320rpx;
        color: #999;
      }
      font-size: 24rpx;
      color: #999;
    }
  }
}
</style>
