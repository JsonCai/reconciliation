import {
	baseUrl
} from '../config/config'
import store from '../store'
const COS = require('./uploadSDK/uploadSDK');
function getAuthorization() {
	return store.state.token
}
export function getCos() {
	var Bucket = 'fzg-1300449266';
	var Region = 'ap-shanghai';
	// 初始化实例
	var cos = new COS({
		getAuthorization: function(options, callback) {
			console.log(baseUrl + '/tencent-cloud/sts/cos/federation-token')
			// 异步获取签名
			uni.request({
				url: baseUrl + '/tencent-cloud/sts/cos/federation-token',
				method: 'GET',
				header: {
					Authorization: getAuthorization()
				},
				success: (res) => {
					console.log(123123123123123)
					console.log(res)
				},
				fail: (err) => {
						console.log(22222222222222)
					reject(err)
				}
			});
		}
	});
	return cos
}
