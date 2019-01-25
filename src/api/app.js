/*
 * @Author: kevin.liangxj
 * @Date: 2018-11-19 10:21:57
 * @Last Modified by: luoqiang
 * @Last Modified time: 2018-12-17 14:38:51
 */

import fetch from '../http/fetch'
const PREV_PATH = '/v1/miniPrograms'
/**
 * 登录、获取token
 */
export const login = (code) => {
  return fetch.post(PREV_PATH + '/login', {
    code
  }, {
    hideLoading: true
  })
}

/**
 * 获取当前用户信息
 */
export const getUserInfo = (loadState) => {
  return fetch.post(PREV_PATH + '/user/info', {}, { hideLoading: loadState })
}
/**
 * 更新前用户信息
 */
export const updateUserInfo = (info) => {
  return fetch.post(PREV_PATH + '/update/user', {
    headImgUrl: info.avatarUrl,
    ...info
  })
}

/**
 * 获取APP的配置项
 */
export const getConfig = () => {
  return fetch.get(PREV_PATH + '/system/config', {
  }, { hideLoading: true })
}

/**
 * 收集formId
 */
export const collectFormId = (formId) => {
  return fetch.post(PREV_PATH + '/formId/save', {
    formId
  }, { hideLoading: true })
}
/**
 * 获取验证码
 */
export const getVerificationCode = (mobile) => {
  return fetch.post(PREV_PATH + '/user/sendCode/' + mobile)
}
/**
 * 绑定手机号
 */
export const bindMobile = (data) => {
  return fetch.post(PREV_PATH + '/user/bind', {
    ...data
  })
}
