
import {
	baseUrl
} from '../../config/config'

const tenantId = '23945197-a5df-44bf-842f-106b42f80355'

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
