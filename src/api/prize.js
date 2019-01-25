/*
 * @Author: kevin.liangxj
 * @Date: 2019-01-11 18:45:41
 * @Last Modified by: kevin.liangxj
 * @Last Modified time: 2019-01-15 15:43:59
 */

import fetch from '../http/fetch'
const PREV_PATH = '/v1/cfevent'
/**
 * 获取当前抽奖活动信息
 */
export const getActivityInfo = () => {
  return fetch.post(PREV_PATH + `/prize/activity/info`)
}
/**
 * 抽奖
 */
export const getDraw = () => {
  return fetch.post(PREV_PATH + `/prize/draw`, {}, { hideLoading: true })
}
/**
 * 获取所有人的中奖信息
 */
export const getWinRecord = () => {
  return fetch.get(PREV_PATH + `/prize/roll/record/15`, {}, { hideLoading: true })
}
/**
 * 获取当前用户中奖纪录
 * @param {object} param
 */
export const getPrizeList = (param) => {
  return fetch.post(PREV_PATH + '/prize/record/list', {...param}, {
    hideLoading: true
  })
}
/**
 * 获取购买商品成功抽奖次数
 * @param {string} orderNo
 */
export const getChance = (orderNo) => {
  return fetch.get(PREV_PATH + `/prize/buy/chance/${orderNo}`)
}
