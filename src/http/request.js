
import { setStorageSync, getStorageSync } from '../utils/wechat'
// import config from './config'
import { host } from '../utils/config'
const path = '/v1/miniPrograms'
const pathname = `${host}${path}`
const isLoginUrl = url => url.indexOf('/login') > -1
const noop = () => { }
/**
 * 通用接口请求封装
 * @param {object} options 请求参数
 *    url: 请求地址，如果没有带全路径，则使用后台接口地址
 *    method: 请求方法，不传默认是get
 *    data: 请求数据
 *    header: 请求头
 */
export default function (options) {
  let url
  let method = 'get'
  let data = {}
  let param = '?TOEKN=' + (getStorageSync('TOEKN') || '')
  let header = {
    'content-type': 'application/json'
  }
  if (!options) {
    throw new Error('request URL must not undefined')
  }
  if (typeof options === 'string') { // 只有一个参数时就是url
    url = options
  } else {
    url = options.url
    method = options.method || 'post'
    data = options.data || {}
    header = options.header || {
      'content-type': 'application/json'
    }
  }

  if (url.indexOf('http') === -1) {
    url = pathname + url
  }
  url = isLoginUrl(url) ? url : url + param

  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method,
      header,
      success: (res) => {
        if (res && res.statusCode === 200) {
          console.error('request login res::', res.data)
          const data = res.data
          if (data.errorCode === 0) {
            if (isLoginUrl(url)) {
              setStorageSync('TOKEN', data.data.token, 7)
            }
            return resolve(data.data)
          } else {
            return reject(res)
          }
        } else {
          reject(res)
        }
      },
      complete: options.complete || noop
    })
  })
}
