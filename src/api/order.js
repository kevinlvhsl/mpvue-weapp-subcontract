/*
 * @Author: kevin.liangxj
 * @Date: 2018-11-22 16:48:31
 * @Last Modified by: luoqiang
 * @Last Modified time: 2019-01-15 14:39:44
 */

import fetch from '../http/fetch'
const PREV_PATH = '/v1/miniPrograms'

// ****************** 订单的相关接口 ****************** //

/**
 * 获取当前用户 订单列表
 */
export const getOrders = (data) => {
  return fetch.post(PREV_PATH + '/order/list', {
    ...data
  }, {
    // hideLoading: true
  })
}

/**
 * 获取当前用户 订单详情
 * orderNo: 订单号
 */
export const getOrderInfo = (orderNo) => {
  return fetch.post(PREV_PATH + '/order/info/' + orderNo)
}
/**
 * 获取当前用户 订单物流详情
 * orderNo: 订单号
 */
export const getOrderExpress = (orderNo) => {
  return fetch.get(PREV_PATH + '/order/expressDetail/' + orderNo)
}

/**
 * 获取订单状态
 * orderNo: 订单号
 */
export const getOrderStatus = (param) => {
  return fetch.post(PREV_PATH + '/order/status', {
    ...param
  }, {
    hideLoading: true
  })
}
/**
 * 更新订单的收货地址
 * data: 地址信息
 */
export const updateOrderAddress = (data) => {
  return fetch.post(PREV_PATH + '/order/address/update', {
    ...data
  })
}

/**
 * 取消订单
 * orderNo: 订单号
 */
export const cancelOrder = (orderNo) => {
  return fetch.get(PREV_PATH + '/order/cancel/' + orderNo)
}

/**
 * 申请退款
 * data: 退款申请的参数
 *  reason: 退款原因     （必填）
 *  orderNo: 订单号      （必填）
 *  explain: 退款说明
 *  num : 退款数量
 *  orderAmt : 订单金额
 *  refundAmt: 退款金额
 *  refundUrls (Array[string], optional): 退款凭证url
 *  refundWay: 退回方式
 *  rejectReason: 拒绝原因 ,
 *  remark: 备用
 */
export const refundOrder = (data) => {
  return fetch.post(PREV_PATH + '/order/refund/apply', {
    ...data
  })
}

/**
 *
 * @param {*} param
 */
export const orderCreate = (param) => {
  return fetch.post(PREV_PATH + '/order/create', {
    ...param
  })
}

export const commentOrder = (param) => {
  return fetch.post(PREV_PATH + '/order/create', {
    ...param
  })
}

/**
 * 礼品购买成功后 送礼订单接口查询
 * @param {} param
 */
export const getCardInfo = (param) => {
  return fetch.post(PREV_PATH + '/order/cardInfo', {
    ...param
  })
}

/**
 * 获取提货卡信息接口
 * @param {} param
 */
export const getPickUpCard = (cardNo) => {
  return fetch.post(PREV_PATH + `/order/pickUpCard/${cardNo}`)
}
