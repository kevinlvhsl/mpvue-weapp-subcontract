<template>
  <view v-if="visible" class="modal-wrap">
    <view class="modal-mask"></view>
    <view class="modal-content">
      <slot />
    </view>
  </view>
</template>

<script>
export default {
  name: 'modal',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  created () {
  }
}
</script>

<style lang="scss">
.modal-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, .4);
  .modal-mask {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
  }
  .modal-content {
    position: absolute;
    z-index: 100;
  }
}
</style>
