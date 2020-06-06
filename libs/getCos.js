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
					if (res.data.code == '0') {
						const sessionToken = res.data.data.cosFederationToken.credentials.sessionToken
						console.log(JSON.stringify({
							TmpSecretId: res.data.data.cosFederationToken.credentials.tmpSecretId,
							TmpSecretKey: res.data.data.cosFederationToken.credentials.tmpSecretKey,
							XCosSecurityToken: res.data.data.cosFederationToken.credentials.sessionToken,
							ExpiredTime: res.data.data.cosFederationToken.expiredTime
						}))
						callback({
							TmpSecretId: res.data.data.cosFederationToken.credentials.tmpSecretId,
							TmpSecretKey: res.data.data.cosFederationToken.credentials.tmpSecretKey,
							XCosSecurityToken: res.data.data.cosFederationToken.credentials.sessionToken,
							ExpiredTime: res.data.data.cosFederationToken.expiredTime
						});
					}

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

export async function doUploadImages(C, cid, files) {
	var netPaths = []
	if (files && files.length) {
		for (var i in files) {
			let path = await doUploadImage(C, cid, files[i])
			console.log(path)
			netPaths.push(path)
		}
		return netPaths
	}
	return files
}

function doUploadImage(C, cid, filePath) {
	return new Promise((reslove, reject) => {
		var filename = filePath.substr(filePath.lastIndexOf('/') + 1);
		C.postObject({
			Bucket: 'fzg-1300449266',
			Region: 'ap-shanghai',
			Key: cid + '/' + filename,
			FilePath: filePath,
			onProgress: function(info) {
				console.log(JSON.stringify(info));
			}
		}, function(err, data) {
			console.log(err || data);
			if (data.Location) {
				reslove("https://" + data.Location)
			} else {
				reject(err)
			}
		});
	})
}