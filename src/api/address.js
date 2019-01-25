/*
 * @Author: kevin.liangxj
 * @Date: 2018-11-27 11:54:53
 * @Last Modified by: luoqiang
 * @Last Modified time: 2018-12-06 10:04:32
 */
import fetch from '../http/fetch'
const PREV_PATH = '/v1/miniPrograms'
/**
 * 地址列表
 */
export const getAddressList = () => {
  return fetch.post(PREV_PATH + '/address/list', {
  })
}
/**
 * 地址列表
 */
export const getAddressDetail = (id) => {
  return fetch.post(PREV_PATH + '/address/get/' + id, {
  })
}
/**
 * 保存地址信息
 */
export const saveAddress = (data) => {
  return fetch.post(PREV_PATH + '/address/save', {
    ...data
  })
}
/**
 * 删除地址信息
 */
export const deleteAddress = (id) => {
  return fetch.post(PREV_PATH + '/address/delete/' + id)
}
/**
 * 验证地址是否支持配送
 * data: 省市区、cardNo 或 projectId
 */
export const verifyDeliveryAddr = (data) => {
  return fetch.post(PREV_PATH + '/address/validate', {
    ...data
  }, { hideLoading: true })
}
