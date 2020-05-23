import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		token: '',
		permissions:''
	},
	mutations:{
		setToken(state,token){
			state.token = token
		},
		setPermissions(state,permissions){
			state.permissions = permissions
		}
	}
})
export default store
