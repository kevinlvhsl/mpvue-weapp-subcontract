
import Vue from 'vue'
import { wxLogin, goToLogin, setStorageSync, getStorageSync, goToBind } from '../utils/wechat.js'
import { host } from '../utils/config'
import Toast from '../../static/vant/toast/toast'
import request2 from './request.js'
import store from '../utils/store'
const Fly = require('flyio/dist/npm/wx')
const fly = new Fly()
Vue.prototype.$http = fly
fly.config.baseURL = host
// const isLoginUrl = url => url.indexOf('/login') > -1

fly.interceptors.request.use((request) => {
  // 给所有请求添加自定义header
  // console.time(request.url)
  const token = getStorageSync('TOKEN')
  console.log('==request== url:', request.url, '== 请求data:', request.body)
  if (token) {
    request.timeout = 15 * 1000
    request.headers = {
      'content-type': 'application/json',
      'Authorization': token
    }
    !request.hideLoading && Toast.loading({
      duration: 15000,
      message: '加载中...'
    })
    return request
  } else {
    console.log('没有token，要先请求微信登录')

    fly.lock()
    return wxLogin().then((res) => {
      return request2({
        data: { code: res.code },
        url: '/login'
      }).catch(({ data }) => {
        console.warn('登录失败:', data.message)
      })
    }).then(data => {
      request.timeout = 30000
      request.headers = {
        'content-type': 'application/json',
        'Authorization': data.token
      }

      setStorageSync('TOKEN', data.token, 7)
      fly.unlock()
      request.url = request.url
      return request
    })
  }
})
fly.interceptors.response.use(
  (response) => {
    !response.request.hideLoading && Toast.clear()
    //  * 处理code信息
    const data = response.data
    // console.timeEnd(response.request.url)
    console.log('==response== url:', response.request.url, '== 返回data:', response.data)
    let code = data.errorCode
    switch (code) {
      case 2:
        if (store.state.unBindError) return
        store.commit('SET_BIND_ERROR', true)
        goToBind()
        break
      case 0:
        return data.data
      case 1:
        if (data.message.indexOf('抱歉') > -1) {
          setStorageSync('TOKEN', '')
          wx.showModal({
            title: '提示',
            content: '您还未授权,是否前去授权登录',
            success (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                if (store.state.unBindError) return
                store.commit('SET_BIND_ERROR', true)
                goToLogin(true)
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } else {
          if (data.message === 'formId不能为空') return
          console.error(data)
          // Toast(data.message)
          wx.showToast({ title: data.message, icon: 'none' })
        }
        break
      default:
        let msg = data.message
        if (msg) {
          wx.showToast({ title: msg, icon: 'none' })
          // Toast(msg)
        }
    }
    return data.data
  },
  (err) => {
    Toast.clear()
    wx.hideLoading()
    console.log('err::', err)
    if (err.status === 503) {
      Toast('网络连接异常')
    } else if (err.status === 502) {
      Toast('网络连接超时')
    } else if (err.status === 1) {
      Toast(err.message)
    } else {
      if (err.message) {
        err.message !== 'request:ok' ? Toast(err.message) : Toast('请求数据失败,请稍后再试')
      } else {
        Toast('请求数据失败,请稍后再试')
      }
    }
    // Do something with response error
  })
export default fly
