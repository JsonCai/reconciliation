import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		token: '',
		roles:[],
		cid:''
	},
	mutations:{
		setToken(state,token){
			state.token = token
		},
		setRoles(state,roles){
			state.roles = roles
		},
		setCid(state,cid){
			state.cid = cid
		},
		clearInfo(state){
			state.token = ''
			state.roles = []
			state.cid = ''
		}
	}
})
export default store
