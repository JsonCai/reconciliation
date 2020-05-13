
import {
	baseUrl
} from '../../config/config'

let tenantId = '23945197-a5df-44bf-842f-106b42f80355'

export function login(data) {
	console.log(data)
	data.tenantId = tenantId
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + '/employees/wechat-login',
			method: 'POST',
			data,
			success: (res) => {
				console.log('成功了')
				resolve(res.header)
			},
			fail: (err) => {
				console.log('失败了')
				reject(err)
			}
		});
	})
}
