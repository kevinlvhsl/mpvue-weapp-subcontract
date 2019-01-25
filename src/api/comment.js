import fetch from '../http/fetch'
const PREV_PATH = '/v1/miniPrograms'

/**
 * 获取商品的评价详情
 */
export const getComments = (data) => {
  return fetch.post(PREV_PATH + '/comment/list', {
    ...data
  })
}
/**
 * 评价
 */
export const comment = (data) => {
  return fetch.post(PREV_PATH + '/comment/add', {
    ...data
  })
}
/**
 * 追评
 */
export const recomment = (data) => {
  return fetch.post(PREV_PATH + '/comment/append', {
    ...data
  })
}
/**
 * 追评
 */
export const getCommentDetail = (orderNo) => {
  return fetch.post(PREV_PATH + '/comment/orderComment', {
    orderNo
  })
}
