// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import { getBatchs } from '@/api/gift'
import { getSignature } from '@/api/my'
import { getAddressList } from '@/api/address'
import { getUserInfo } from '@/api/app'
import { STATUS_STR, ORDER_STATUS, APP_CONFIG } from './config'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // OSS_PREV,
    token: '',
    openId: '',
    userInfo: { // 用户信息
      nickName: '',
      avator: '',
    },
    unBindError: false,
    batchs: [], // 批次列表
    systemInfo: {}, // 手机系统信息
    addressList: [], // 收货地址列表
    tempAddress: '', // 临时收货地址，用于页面间传递

    sendCardStatus: false, // 送礼记录 我的卡添加红点
    policy: '', // 认证
    OSSAccessKeyId: '', // ossID
    signature: '', // 阿里云签名
    success_action_status: 200, // 上传成功后的返回状态码
    appConfig: { ...APP_CONFIG }
  },
  getters: {
    openId: state => state.openId,
    userInfo: state => state.userInfo,
    batchs: state => state.batchs,
    appConfig: state => state.appConfig,
    systemInfo: state => state.systemInfo,
    addressList: state => state.addressList,
    tempAddress: state => state.tempAddress,
    STATUS_STR: () => STATUS_STR,
    ORDER_STATUS: () => ORDER_STATUS,
    mySendCardHistory: state => state.sendCardStatus,
    policyInfo: state => {
      return {
        policy: state.policy,
        OSSAccessKeyId: state.OSSAccessKeyId,
        signature: state.signature,
        success_action_status: '200',
      }
    }

  },
  mutations: {
    SET_TOKEN: (state, t) => {
      state.token = t
    },
    SET_OPEN_ID: (state, id) => {
      state.openId = id
    },
    SET_USER_INFO: (state, info) => {
      state.userInfo = { ...state.userInfo, ...info }
    },
    SET_MY_CARD_HISTORY: (state, flag) => {
      state.sendCardStatus = flag
    },
    SET_APP_CONFIG: (state, info) => {
      state.appConfig = { ...info }
    },
    SET_BATCHS: (state, list) => {
      state.batchs = list
    },
    SET_SYS_INFO: (state, info) => {
      state.systemInfo = info
    },
    SET_ADDRESS_LIST: (state, list) => {
      state.addressList = list
    },
    SET_TEMP_ADDRESS: (state, val) => {
      state.tempAddress = val
    },
    // 设置上传图片所需要的信息
    SET_POLICY(state, data) {
      state.policy = data.policy
      state.OSSAccessKeyId = data.accessid
      state.signature = data.signature
    },
    SET_BIND_ERROR(state, s) {
      state.unBindError = s
    },
  },
  actions: {
    async GetUserInfo({ commit }) {
      const info = await getUserInfo('hide')
      commit('SET_USER_INFO', info)
    },
    SetUserInfo({ commit }, info) {
      commit('SET_USER_INFO', info)
    },
    SetOpenId({ commit }, id) {
      commit('SET_OPEN_ID', id)
    },
    SetToken({ commit }, token) {
      commit('SET_TOKEN', token)
    },
    SetMyCardHistory({ commit }, flag) {
      commit('SET_MY_CARD_HISTORY', flag)
    },
    SetConfig({ commit }, conf) {
      commit('SET_APP_CONFIG', conf)
    },
    async GetBatchs({ commit }) {
      const data = await getBatchs()
      commit('SET_BATCHS', data || [])
    },
    async QueryGiftDetail({ commit }) {
      const data = await getBatchs()
      console.log('卡批次：', data)
      commit('SET_BATCHS', data || [])
    },
    SetSystemInfo({ commit }, info) {
      commit('SET_SYS_INFO', info)
    },
    /**
     * 更新收货地址列表
     */
    async UpdateAddressList({ commit }) {
      const data = await getAddressList()
      commit('SET_ADDRESS_LIST', data || [])
    },
    /**
     * 获取 收货地址列表
     */
    async GetAddressList({ dispatch, state }, force) {
      // 如果有强制更新，则直接更新列表，否则看当前是否有数据， 没有数据就获取一次，有数据则表示之前已经获取过，不处理
      if (force) {
        dispatch('UpdateAddressList')
      } else {
        if (!state.addressList.length) {
          await dispatch('UpdateAddressList')
        }
      }
    },
    SetTempAddress({ commit }, val) {
      commit('SET_TEMP_ADDRESS', val)
    },
    async GetPolicy({ state, commit }) {
      if (!state.policy) {
        const res = await getSignature()
        commit('SET_POLICY', res.data)
      }
    },
  }
})

export default store
