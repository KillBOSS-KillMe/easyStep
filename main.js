import Vue from 'vue'
import App from './App'
import globalData from './static/js/common.js'

import store from './static/js/store.js'
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
