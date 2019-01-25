import Vue from 'vue'
import App from './index'
import store from '@/utils/store'

const app = new Vue({
  ...App,
  store
})
app.$mount()
