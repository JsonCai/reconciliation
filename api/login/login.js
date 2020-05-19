
import {
	baseUrl
} from '../../config/config'

export function getCompany(openId){
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
				console.log(res.data,res.header)
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			}
		});
	})
}
