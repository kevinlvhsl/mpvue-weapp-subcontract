import Vue from 'vue'
import App from './App'
import mixin from './utils/mixin'
import store from './utils/store'
import Toast from '../static/vant/toast/toast'

// Vue.use(Toast)
// 全局组件
Vue.prototype.$store = store
Vue.prototype.$toast = Toast

// 全局mixin
Vue.mixin(mixin)

Vue.config.productionTip = false
// app
App.mpType = 'app'
const app = new Vue({
  store,
  ...App
})
app.$mount()
console.log('当前环境：：', process.env)
