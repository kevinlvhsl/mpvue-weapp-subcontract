<template>
  <van-toast id="van-toast" />
</template>

<script>
import { login, getUserInfo, updateUserInfo, getConfig } from '@/api/app'
import { wxLogin, getWXSetting, getWXUserInfo, setStorageSync } from '@/utils/wechat'
import { mapState, mapActions } from 'vuex'
import { APP_CONFIG } from './utils/config.js'
export default {
  computed: {
    ...mapState([
      'openId'
    ])
  },
  methods: {
    ...mapActions(['SetOpenId', 'SetToken', 'SetUserInfo', 'GetBatchs', 'SetSystemInfo', 'SetConfig']),
    async getSetting () {
      const setting = await getWXSetting()
      if (setting.authSetting['scope.userInfo']) {
        console.log('授权信息', setting)
        const data = await getWXUserInfo()
        if (data && data.errMsg === 'getUserInfo:ok') {
          await updateUserInfo(data.userInfo)
          const userRes = await getUserInfo()
          this.SetUserInfo(userRes)
        } else {
        }
      } else {
        console.log('用户还未授权过, 暂不做处理')
      }
    },
    // 拆分wx.login，结构更清晰
    async _login() {
      let _this = this
      const loginData = await wxLogin()
      if (loginData.code) {
        const code = loginData.code
        _this.login(code)
      } else {
        _this.$toast('微信登录失败')
      }
    },
    // 使用了async+await的语法，用同步的方式写异步脚本
    async login(code) {
      let _this = this
      try {
        const resData = await login(code)
        _this.SetOpenId(resData.openId)
        _this.SetToken(resData.token)
        setStorageSync('TOKEN', resData.token, 0)
        _this.getSetting()
      } catch (err) {
        console.error(err)
      }
    },
    async getConfig() {
      const conf = await getConfig() || {}
      const bbjConf = { ...APP_CONFIG }
      Object.keys(conf).forEach(k => {
        if (k in bbjConf) {
          bbjConf[k] = conf[k]
        }
      })
      bbjConf['BUBUJI_INDEX_BANNER'] = JSON.parse(bbjConf['BUBUJI_INDEX_BANNER'])
      this.SetConfig(bbjConf)
    }
  },
  onLaunch() {
    console.log('app launch')
    // 检测小程序是否有新版本更新
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '暖冬”吃鸡“需重新加载小程序~',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          // 小程序有新版本，会主动触发下载操作（无需开发者触发）
          wx.getUpdateManager().onUpdateFailed(function () {
            // 当新版本下载失败，会进行回调
            wx.showModal({
              title: '提示',
              content: '检查到有新版本，下载失败，请检查网络设置',
              showCancel: false
            })
          })
        } else {
          console.log('恭喜你当前已经是最新的版步步鸡小程序了')
        }
      })
    } else { // 版本过低则无法使用该方法
      wx.showModal({
        title: '提示',
        confirmColor: '#5BB53C',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
    const _this = this
    wx.getSystemInfo({
      success: function(info) {
        _this.SetSystemInfo(info)
      }
    })
    this.getConfig()
  }
}
</script>

<style lang="scss">
@import './assets/fonts/iconfont.css';
// .container {
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: space-between;
//   padding: 20rpx 0;
//   box-sizing: border-box;
// }
/* this rule will be remove */
* {
  box-sizing: border-box;
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
.page {
  background-color: #f4f4f4;
  min-height: 100vh;
}

</style>
