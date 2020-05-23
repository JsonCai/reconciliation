import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		token: '',
		roles:[]
	},
	mutations:{
		setToken(state,token){
			state.token = token
		},
		setRoles(state,roles){
			state.roles = roles
		}
	}
})
export default store
