
import {
	baseUrl
} from '../../config/config'

export function getCompany(openId){
	console.log(baseUrl + '/employees/bind-wechat-number/tenants')
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + '/employees/bind-wechat-number/tenants',
			method: 'GET',
			data:{
				wechatNumber:openId
			},
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				console.log(err)
				reject(err)
			}
		});
	})
}

export function login(data) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + '/employees/wechat-login',
			method: 'POST',
			data,
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			}
		});
	})
}
export function getWxUid(data){
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + '/we-chat/mini-program/unionid',
			method: 'GET',
			data,
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			}
		});
	})
}
