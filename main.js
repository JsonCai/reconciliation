import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)

import store from './store'

Vue.prototype.$store = store
const app = new Vue({
	store,
	...App
})
app.$mount()
