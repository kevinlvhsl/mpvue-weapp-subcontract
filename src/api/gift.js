/*
 * @Author: kevin.liangxj
 * @Date: 2018-11-16 18:02:58
 * @Last Modified by: luoqiang
 * @Last Modified time: 2019-01-04 14:21:49
 */

// ****************** 送礼相关的接口 ****************** //

import fetch from '../http/fetch'
const PREV_PATH = '/v1/miniPrograms'

/**
 * 获取卡券批次
 */
export const getBatchs = () => {
  return fetch.get(PREV_PATH + '/card/batch/infos', {
  }, {
    hideLoading: true
  })
}

/**
 * 获取卡券批次详细信息
 */
export const getBatchInfo = (batchNo) => {
  return fetch.post(PREV_PATH + '/card/batch/info', {
    batchNo
  }, {
    hideLoading: true
  })
}
/**
 * 合并卡券成一个红包
 */
export const mergeCardToBag = (data) => {
  return fetch.post(PREV_PATH + '/card/mergeSend', {
    ...data
  })
}
/**
 * 发送红包前，先暂存礼物相关的图片和文字
 * @param {*} data
 */
export const saveGiftText = (data) => {
  return fetch.post(PREV_PATH + '/gift/saveGiftImgAndText', {
    ...data
  },
  {
    hideLoading: true
  })
}

// ****************** 送礼模块 ****************** //

/**
 * 获取送礼详情页面数据
 */
export const queryGiftDetail = (data) => {
  return fetch.post(PREV_PATH + '/card/batch/info', data)
}

// ****************** 送礼记录 ****************** //

/**
 * 查询 送礼记录列表
 */
export const querySendGiftRecord = () => {
  return fetch.post(PREV_PATH + '/gift/querySendGiftRecord', {})
}

/**
 * 查询 收礼记录列表
 */
export const queryReceiveGiftRecord = () => {
  return fetch.post(PREV_PATH + '/gift/queryReceiveGiftRecord', {})
}

/**
 * 查询 送出的 红包中领取人 列表  和 接收红包页面 查询红包个数
 */
export const queryGiftOpenRecord = (param) => {
  return fetch.post(PREV_PATH + '/gift/queryGiftOpenRecord', {...param})
}
/**
 * 送红包之前 初始化红包 （转赠单个卡）
 * cardNo: 卡号
 */
export const beforeInitTransferGift = (cardNo) => {
  return fetch.post(PREV_PATH + '/gift/beforInitTransferGift', { cardNo })
}
/**
 * 初始化红包 （转赠单个卡）
 * cardNo: 卡号
 */
export const initTransferGift = (cardNo) => {
  return fetch.post(PREV_PATH + '/gift/initTransferGift', { cardNo })
}

/**
 * 接收红包页面 打开红包
 * orderId: 订单号
 */
export const openSendGift = (param) => {
  return fetch.post(PREV_PATH + '/gift/openSendGift', { ...param })
}

/**
 * 个人中心 打开红包
 * giftId: 红包ID
 */
export const openTransferGift = (giftId) => {
  return fetch.post(PREV_PATH + '/gift/openTransferGift', { giftId })
}

/**
 * 购买礼品成功后 送给自己
 * @param {*} param
 */
export const sendMyCards = (param) => {
  return fetch.post(PREV_PATH + '/gift/sendMyself', {
    ...param
  })
}
