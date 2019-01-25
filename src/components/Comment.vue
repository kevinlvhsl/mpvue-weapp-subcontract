<template>
<view class="com-comment">
  <view class="comment-head">
    <img class="head" :src="comment.userHeadImg || '/static/images/noAvatar.png'"/>
    <view class="user-info">
      <view class="nickname">{{comment.userName || '匿名用户'}}</view>
      <view class="time">{{comment.commentTime}}</view>
    </view>
  </view>
  <view :class="['comment-content', {'in-list': inList}]">
    <view class="content">{{ comment.content }}</view>
    <view class="imgs">
      <image class="img" v-for="(img, index) in comment.imgs"
        @click="prevImage(img, comment.imgs)"
        mode="aspectFill"
        :src="img" alt="评论图" :key="index"
      />
    </view>
    <view class="kefu-reply" v-if="comment.opsReply">
      <text class="label">客服回复：</text>
      <text>{{ comment.opsReply.content }}</text>
    </view>
    <view class="append-comment" v-if="appendComment.commentTime">
      <view class="append-time"> {{ commentTime }}</view>
      <view class="reply-content">
        <view class="content">{{ appendComment.content }}</view>
        <view class="imgs">
          <image class="img"
            v-for="(img, index) in appendComment.imgs"
            :key="index"
            mode="aspectFill"
            @click="prevImage(img, appendComment.imgs)"
            :src="img" alt="评论图"
            />
        </view>
        <view class="kefu-reply" v-if="appendComment.opsReply">
          <text class="label">客服回复： </text>
          <text>{{ appendComment.opsReply.content }}</text>
        </view>
      </view>
    </view>
  </view>
</view>
</template>

<script>
export default {
  name: 'com-comment',
  props: ['comment', 'inList'],
  data () {
    return {
      imgs: ['https://p-za-chicken.oss-cn-hzfinance.aliyuncs.com/bubuji/harf_card_2.png', 'http://p-za-chicken.oss-cn-hzfinance.aliyuncs.com/bubuji/harf_card_1.png']
    }
  },
  computed: {
    appendComment() {
      return this.comment.appendComment || {}
    },
    commentTime() {
      const reg = new RegExp(/-/g)
      const t = this.appendComment.commentTime && this.appendComment.commentTime.replace(reg, '/')
      const t2 = this.comment.commentTime && this.comment.commentTime.replace(reg, '/')
      const delta = new Date(t).getTime() - new Date(t2).getTime()
      const day = 1000 * 60 * 60 * 24
      if (delta < day) return '当天追评'
      return Math.floor(delta / day) + '天后追评'
    }
  },
  methods: {}
}
</script>

<style lang="scss" >
.com-comment {
  padding: 30rpx;
  background-color: #fff;
  margin: 20rpx auto;
  .comment-head {
    display: flex;
    font-size: 24rpx;
    .head {
      height: 50rpx;
      width: 50rpx;
      margin-right: 20rpx;
      border-radius: 50%;
      border: 1rpx solid $theme-color;
    }
    .nickname {
      color: #000;
    }
    .time {
      color: #999;
    }
  }
  // 评论内容
  .comment-content {
    &.in-list {
      padding-left: 70rpx;
    }
    .content {
      color: #000;
      font-size: 28rpx;
      padding: 14rpx 0;
      line-height: 2;
    }
    .imgs {
      .img {
        width: 150rpx;
        height: 150rpx;
        margin-right: 20rpx;
      }
    }
    .kefu-reply {
      padding: 20rpx;
      color: #999;
      font-size: 28rpx;
      background-color: #F4F4F4;
      .label {
        color: #000;
      }
    }
    // 追评内容
    .append-comment {
      margin-top: 30rpx;
      .append-time {
        color: $theme-color;
        font-size: 28rpx;
        line-height: 2;
      }
      .content {
        line-height: 1.6;
      }
    }
  }
}
</style>
