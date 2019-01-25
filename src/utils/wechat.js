// import wx from './wx'

export function wxLogin () {
  return new Promise((resolve, reject) => {
    return wx.login({ success: resolve, fail: reject })
  })
}

export function getWXUserInfo () {
  return new Promise((resolve, reject) => {
    return wx.getUserInfo({ success: resolve, fail: reject })
  })
}

/**
 * 去登录页面
 * @param {string} backUrl 返回当前的页面
 */
export function goToLogin (backUrl) {
  wx.navigateTo({
    url: '/pages/login/main?backUrl=' + backUrl
  })
}

/**
 * 去绑定页面
 * @param {string} backUrl 返回当前的页面
 */
export function goToBind (backUrl) {
  wx.navigateTo({
    url: '/pages/bindMobile/main?backUrl=' + backUrl
  })
}

/**
 * 获取微信授权信息
 */
export function getWXSetting () {
  return new Promise((resolve, reject) => {
    return wx.getSetting({ success: resolve, fail: reject })
  })
}

export function setStorage (key, value) {
  return new Promise((resolve, reject) => {
    wx.setStorage({ key: key, data: value, success: resolve, fail: reject })
  })
}

export function getStorage (key) {
  return new Promise((resolve, reject) => {
    wx.getStorage({ key: key, success: resolve, fail: reject })
  })
}
// 设置有效天数
export function setStorageSync (key, value, expiredays) {
  if (expiredays) {
    const exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    wx.setStorageSync(key, { value, time: exdate.getTime() })
  } else {
    wx.setStorageSync(key, { value })
  }
}

export function getStorageSync (key) {
  if (!wx.getStorageSync(key)) return ''
  let data = wx.getStorageSync(key)
  if (data.time && Date.now() > +data.time) {
    return ''
  }
  return data.value
}

export function getLocation (type) {
  return new Promise((resolve, reject) => {
    wx.getLocation({ type: type, success: resolve, fail: reject })
  })
}

export function payMement (payParams, cb) {
  return new Promise((resolve, reject) => {
    console.log('支付参数：', payParams)
    //  微信支付
    wx.requestPayment({
      appId: payParams.appId,
      timeStamp: payParams.timeStamp,
      nonceStr: payParams.nonceStr,
      package: payParams.package,
      signType: payParams.signType,
      paySign: payParams.paySign,
      success: function (res) {
        cb && cb()
      },
      fail: function (res) {
        console.error('requestPayment fail', res)
      },
      complete: function (res) {
        console.log('requestPayment complete')
      }
    })
  })
}
