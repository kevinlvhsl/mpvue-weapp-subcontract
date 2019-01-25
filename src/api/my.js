/*
 * @Author: kevin.liangxj
 * @Date: 2018-11-16 18:02:58
 * @Last Modified by: kevin.liangxj
 * @Last Modified time: 2018-11-29 17:52:40
 */

// ****************** 个人中心相关的接口 ****************** //

import fetch from '../http/fetch'
const PREV_PATH = '/v1/miniPrograms'
/**
 * 获取当前用户信息
 */
export const getUserInfo = () => {
  return fetch.post(PREV_PATH + '/user/info')
}

/**
 * 获取当前用户信息
 */
export const getSignature = () => {
  return fetch.get('/oss/get_signature')
}

/**
 * 上传图片到oss
 * @param {FormData} data
 * 注： 本接口不需要走统一request拦截，故不用request
 */
// export function uploadImg(data) {
//   return fetch.post({
//     url: uploadAction,
//     data
//   })
// }
