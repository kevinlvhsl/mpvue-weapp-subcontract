<template>
  <div>
    <div>步步鸡小程序</div>
    <div>需要获取您的头像，昵称等信息</div>
    <button id="authButton" open-type="getUserInfo" lang="zh_CN" size="mini" @getuserinfo="onGotUserInfo">同意获取用户</button>
  </div>
</template>

<script>
export default {
  name: 'loginBar',
  data () {
    return {}
  },
  methods: {
    onGotUserInfo (e) {
      // console.log(e.mp.detail.rawData)
      if (e.mp.detail.rawData) {
        // 用户按了允许授权按钮
        console.log('用户按了允许授权按钮')
      } else {
        // 用户按了拒绝按钮
        console.log('用户按了拒绝按钮')
      }
    },
    getSetting () {
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function (res) {
                console.log(res.userInfo)
                // 用户已经授权过
                console.log('用户已经授权过')
              }
            })
          } else {
            console.log('用户还未授权过')
          }
        }
      })
    }
  }
}
</script>

<style>
</style>
