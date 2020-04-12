import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'
Vue.filter('formatDate',function(time){
	if (time == "") {
		return ""
	}
	
	const text = time.year + "-" + (time.month < 9 ? "0" + (time.month + 1) : (time.month + 1)) +
		"-" + (time.day < 10 ? "0" + time.day : time.day)
	return text
})
const app = new Vue({
	...App
})
app.$mount()
