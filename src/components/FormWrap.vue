<template>
<!-- <view class="relative bor">
  <form :report-submit=true>
    <slot name="center" />
    <button class="btn-trans" form-type="submit"></button>
  </form>
</view> -->
<view class="relative bor2">
  <form report-submit="true" @submit="collectFormId">
    <slot name="center" />
    <button form-type="submit" style="background-color:red; position:absolute;width: 100px;height:100px;top:0"></button>
  </form>
</view>
</template>

<script>
export default {
  name: 'form-wrap',

  data () {
    return {
    }
  },

  methods: {}
}
</script>

<style lang='' >

</style>
