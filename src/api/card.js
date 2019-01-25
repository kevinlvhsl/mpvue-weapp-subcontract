/*
 * @Author: kevin.liangxj
 * @Date: 2018-11-26 18:21:35
 * @Last Modified by: luoqiang
 * @Last Modified time: 2018-12-06 14:55:28
 */
import fetch from '../http/fetch'
const PREV_PATH = '/v1/miniPrograms'
/**
 * 获取当前用户信息
 */
export const activeCard = (data) => {
  return fetch.post(PREV_PATH + '/card/active', {
    ...data
  })
}
/**
 * 获取卡券列表
 */
export const getMyCardList = () => {
  return fetch.post(PREV_PATH + '/card/list', { 'hideLoading': true })
}

/**
 * 获取卡券信息
 */
export const getCardDetail = (cardNo) => {
  return fetch.post(PREV_PATH + '/card/info', { cardNo })
}

/**
 * 兑换卡券
 * cardNo: 卡密
 */
export const exchangeCard = (cardCode) => {
  return fetch.post(PREV_PATH + '/card/bindCard', {
    cardCode
  })
}

// ============================ 优惠券 ===================================
/**
 * 获取当前用户 拥有的优惠券列表
 */
export const getCouponList = (data) => {
  return fetch.post(PREV_PATH + '/card/myCoupons', {
    ...data
  })
}

/**
 * 获取下单时 优惠券列表
 */
export const getUnusedCard = (data) => {
  return fetch.post(PREV_PATH + '/card/unusedCard', {
    ...data
  })
}

/**
 * 商品详情页 优惠券列表
 * productId 商品ID
 */
export const getProductCouponList = (param) => {
  return fetch.post(PREV_PATH + '/card/listCard', {
    ...param
  })
}

/**
 * 商品详情页 优惠券领取
 * productId 商品ID
 */
export const productReceiveCard = (param) => {
  return fetch.post(PREV_PATH + '/card/receiveCard', {
    ...param
  })
}
