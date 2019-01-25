<template >
  <view class="nav flex">
    <view v-for="(item,key) in tabs" :key="key" :class="['nav-li flex-xy', curIndex == key  ? 'active' : '']" @click="changeTab($event,key,item)">
      {{item}}
      <view class="nav-bottom-main" v-if="curIndex == key">
        <view class="nav-bottom"></view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      default: []
    },
    index: {
      // 默认选中
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      curIndex: 0
    }
  },
  onReady() {
    this.curIndex = this.index
  },
  methods: {
    //  切换tab （注意后期需要在切换的时候进行数据请求）
    changeTab(ev, index, text) {
      this.curIndex = index
      this.$emit('onChange', index, text)
    }
  }
}
</script>

<style lang="scss">
.nav {
  height: 90rpx;
  width: 100%;
  background: #fff;
  font-size: 30rpx;
  top: 0;
  position: fixed;
  z-index: 999;
}
.nav .nav-li {
  width: 50%;
  float: left;
  color: #9e9e9e;
  position: relative;
}
.nav .active {
  color: #f8b428;
}
.nav .nav-bottom-main {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
}
.nav .nav-bottom-main .nav-bottom {
  height: 5rpx;
  width: 30rpx;
  background: #f8b428;
  margin: 0 auto;
}
.nav-color {
  width: 100%;
  height: 10rpx;
  background: #f4f3f8;
}

</style>
