/* * @Author: luoqiang * @Date: 2018-11-26 16:37:44*@Last Modified by: luoqiang* @Last Modified time: 2018-11-26 16:37:44 */

// ****************** 支付相关的接口 ****************** //

import fetch from '../http/fetch'
const PREV_PATH = '/v1/miniPrograms'

/**
 * 最福利支付去掉
 */
// export const payZFL = (data) => {
//   return fetch.get(PREV_PATH + '/create/order/pay', {
//   })
// }

/**
 * 礼品订单生产并支付
 */
export const CreateOrderPay = (param) => {
  return fetch.post(PREV_PATH + '/create/order/pay', {
    ...param
  })
}

/**
 * 普通商品支付
 */
export const CreatePay = (param) => {
  return fetch.post(PREV_PATH + '/order/pay', {
    ...param
  })
}
