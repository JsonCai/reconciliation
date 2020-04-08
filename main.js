import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'
// 注册全局组件
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)
const app = new Vue({
    ...App
})
app.$mount()
