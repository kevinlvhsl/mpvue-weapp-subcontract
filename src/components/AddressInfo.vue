<template>
  <div class="com-address-info">
    <div class="com-title c666">收货地址</div>
    <div class="add-items">
      <van-cell-group>
        <van-field
          v-model="name"
          required
          label="收货人"
          clearable
          placeholder="请输入用户名"
          bind:change="onChange"
          :maxlength=20
        />
        <van-field
          v-model="phoneNumber"
          required
          label="手机号码"
          :maxlength=11
          clearable
          placeholder="请输入11位手机号"
          bind:change="onChange"
        />

        <div  class="relative">
          <picker mode="region" class="btn-trans" @change="bindRegionChange" :value="region">
            <view class="btn-trans" style="color: #b2b2b2"></view>
          </picker>
          <van-field
            :value="joinAddress"
            label="省市区"
            required
            icon="arrow"
            disabled
          />
        </div>
        <van-field
          v-model="address"
          label="详细地址"
          required
          type="textarea"
          placeholder="请输入详细地址(最多50字)"
          :maxlength=50
          autosize
        />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import MyCell from './MyCell'
export default {
  props: ['title'],
  components: {
    MyCell
  },
  data() {
    return {
      phoneNumber: '124', // 电话
      name: 'dd', // 姓名
      privince: '', // 省
      city: '', // 市
      area: '', // 区 县
      address: '初始地址', // 完整地址
      region: ['', '', ''],
    }
  },
  computed: {
    joinAddress() {
      return this.area ? `${this.privince} ${this.city} ${this.area}` : '请选择省市区'
    },
    cellTip() {
      return this.area ? '' : '请选择省市区'
    }
  },
  methods: {
    bindRegionChange (e) {
      console.log('picker发送选择改变，携带值为', e)
      const region = e.target.value

      this.region = region
      this.privince = region[0] // 省
      this.city = region[1]
      this.area = region[2]
      // this.receiveAddress = e.detail.value.join('')
    }
  }
}
</script>

<style lang="scss">
.com-address-info {
  input {
    padding-left: 8rpx;
  }
  .com-title {
    font-size: 30rpx;
    line-height: 3;
    text-indent: 1em;
  }
  .area-text {
    // background: red;
    height: 100px;
    width: 200px;
    font-size: 20px;
    position: absolute;
    top: 0;
    z-index: 20;
  }
  .add-detail {
    height: 108rpx;
    width: 350rpx;
    padding: 8rpx;
    line-height: 1.3;
  }
  // .relative {
  //   border: 1px solid red;
  //   height: 50px;
  //   background-color: pink;
  //   position: relative;
  // }
}
</style>
