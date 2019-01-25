import config from './config'
import { collectFormId } from '@/api/app'
import { goToBind } from '@/utils/wechat'
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      OSS_PREV: config.OSS_PREV,
      maxFormCount: 100
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    ...mapActions(['GetUserInfo']),
    ossImg(url) {
      return config.OSS_PREV + (url[0] === '/' ? url : '/' + url)
    },
    goIndex() {
      wx.switchTab({
        url: '/pages/index/main'
      })
    },
    // 预览图片
    prevImage(index, urls) {
      wx.previewImage({
        urls: urls,
        current: urls[index]
      })
    },
    // 保留两位小数
    toFixed(num) {
      return Number(num).toFixed(2)
    },
    setTimeout(cb, duration = 2000) {
      const _t = setTimeout(() => {
        clearTimeout(_t)
        cb && cb()
      }, duration)
    },
    // 收集formId
    collectFormId(e, success = () => {}) {
      console.log('收集formId', e)
      if (!e || !e.target || e.target.formId === 'the formId is a mock one') { return }
      const target = e.target
      const formId = target.formId
      collectFormId(formId).then(res => {
        this.maxFormCount = res.data || 1
        console.log('formId个数为：' + res.data)
      }).catch((err) => {
        console.error('收集表单ID失败', err)
      })
    },
    /**
     *
     * @param {string} url 跳转的页面路径+参数
     * @param {bool} needCheck 是否要校验用户手机号: 默认不需要
     * @param {string} method 跳转方式
     */
    commonSkip(url, needCheck = false, method = 'navigateTo', cb) {
      if (needCheck) {
        this.checkMobileBind(() => {
          wx[method]({
            url,
            success: () => {
              cb && cb()
            }
          })
        })
      } else {
        wx[method]({
          url,
          success: () => {
            cb && cb()
          }
        })
      }
    },
    checkMobileBind(cb) {
      if (this.userInfo.mobile) {
        cb && cb()
      } else {
        this.GetUserInfo().then(() => {
          if (this.userInfo.mobile) {
            cb && cb()
          } else {
            goToBind()
          }
        })
      }
    }
  }
}
