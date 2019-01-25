<template>
  <div :class="['com-cell', {'last-cell': isLast}]">
    <div class="left">
      <i v-if="iconName" :class="['iconfont', iconName]"></i>
      <text>{{title}}</text>
    </div>
    <div class="center">
      <slot name="center" />
    </div>
    <div class="right">
      <text v-if="value">{{value}}</text>
      <text v-if="isLink" class="iconfont icon-arrow-right arrow"></text>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isLast: {
      type: Boolean,
      defalut: false
    },
    iconName: {
      type: String,
      defalut: ''
    },
    title: String,
    isLink: {
      type: Boolean,
      defalut: false
    },
    value: String
  }
}
</script>

<style lang="scss">
.com-cell {
  display: flex;
  justify-content: space-between;
  padding: 16rpx 30rpx;
  align-items: center;
  line-height: 1.4;
  background-color: #fff;
  border-top: 1rpx solid #dedede;
  font-size: 28rpx;
  color: #666;
  &.last-cell {
    border-bottom: 1rpx solid #dedede;
  }
  .left {
    color: #333;
    max-width: 35%;
    font-weight: 500;
    min-width: 180rpx;
  }
  .center {
    // border: 1px solid red;
    margin: 0 20rpx;
    height: 100%;
    flex: 1;
  }
  .right {
    min-width: 60rpx;
    text-align: right;
    display: flex;
    align-items: center;
  }
}
</style>
