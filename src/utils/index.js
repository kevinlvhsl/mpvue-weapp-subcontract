function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

/**
 * 获取当前小程序页面的路径
 */
export const getPageUrl = function () {
  /* eslint-disable no-undef */
  const pages = getCurrentPages()
  const curPage = pages[pages.length - 1]

  const route = curPage.route
  const param = curPage.options
  let queryStr = []
  for (let k in param) {
    queryStr.push(`${k}=${param[k]}`)
  }
  return encodeURIComponent(`/${route}?${queryStr.join('&')}`)
}

export const checkAddress = function ({ deliverName, phoneNumber, province, city, area, address }) {
  console.log('deliverName:', deliverName, 'phoneNumber:', phoneNumber)
  if (!deliverName || !deliverName.trim()) {
    wx.showToast({ title: '收货人不能为空', icon: 'none' })
    return false
  }
  if (!phoneNumber || !phoneNumber.trim()) {
    wx.showToast({ title: '手机号不能为空', icon: 'none' })
    return false
  }
  const reg = /^1[2-9][0-9][\d]{8}$/
  if (!reg.test(phoneNumber)) {
    wx.showToast({ title: '请填写正确的11位手机号', icon: 'none' })
    return false
  }
  if (!area) {
    wx.showToast({ title: '请选择省市区域', icon: 'none' })
    return false
  }
  if (!address) {
    wx.showToast({ title: '请填写详细地址', icon: 'none' })
    return false
  }
  if (address.length < 5) {
    wx.showToast({ title: '详细地址至少5个字符', icon: 'none' })
    return false
  }
  return true
}

export const calcAngle = function (count) {
  if (count === 6) {
    return [
      { min: 31, max: 89 },
      { min: 91, max: 149 },
      { min: 151, max: 209 },
      { min: 211, max: 269 },
      { min: 271, max: 329 },
      { min: 331, max: 389 },
    ]
  }
}
