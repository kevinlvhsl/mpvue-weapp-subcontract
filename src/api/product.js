/*
 * @Author: kevin.liangxj
 * @Date: 2018-11-26 18:21:35
 * @Last Modified by: luoqiang
 * @Last Modified time: 2018-11-30 18:40:07
 */
import fetch from '../http/fetch'
const PREV_PATH = '/v1/miniPrograms'
/**
 * 查询商品详情
 */
export const getProductDetail = (pid) => {
  return fetch.get(PREV_PATH + `/product/${pid}`)
}
/**
 * 查询商品详情
 */
export const getProductList = (pid) => {
  return fetch.get(PREV_PATH + `/product/presale/list`)
}
