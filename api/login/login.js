
import {
	baseUrl
} from '../../config/config'

const tenantId = '3c0c90e3-97ba-4c5e-b9c3-7320e8eab329'

export function login(data) {
	data.tenantId = tenantId
	console.log(data)
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
				console.log('失败了')
				reject(err)
			}
		});
	})
}
