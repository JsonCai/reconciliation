import {
	baseUrl
} from '../../config/config'
import store from '../../store'

function getAuthorization(){
	return store.state.token
}
function onHttpSuccess(res, resolve, reject) {
	if (res.statusCode == 403) {
		uni.switchTab({
			url: '/pages/me/me'
		})
		reject(res)
	} else if (res.data.code == 0) {
		resolve(res.data)
	} else {
		reject(res)
	}
}

const http = {
	post: (url, data) => {
		console.log(baseUrl + url)
		return new Promise((resolve, reject) => {
			uni.request({
				url: baseUrl + url,
				method: 'POST',
				data,
				header: {
					Authorization: getAuthorization()
				},
				success: (res) => {
					onHttpSuccess(res, resolve, reject)
				},
				fail: (err) => {
					reject(err)
				}
			});
		})
	},
	get: (url, data) => {
		console.log(baseUrl + url)
		return new Promise((resolve, reject) => {
			uni.request({
				url: baseUrl + url,
				method: 'GET',
				data,
				header: {
					Authorization: getAuthorization()
				},
				success: (res) => {
					onHttpSuccess(res, resolve, reject)
				},
				fail: (err) => {
					reject(err)
				}
			});
		})
	},
	put: (url, data) => {
		return new Promise((resolve, reject) => {
			uni.request({
				url: baseUrl + url,
				method: 'PUT',
				data,
				header: {
					Authorization: getAuthorization()
				},
				success: (res) => {
					onHttpSuccess(res, resolve, reject)
				},
				fail: (err) => {
					reject(err)
				}
			});
		})
	},
	doDelete: (url, data) => {
		return new Promise((resolve, reject) => {
			uni.request({
				url: baseUrl + url,
				method: 'DELETE',
				data,
				header: {
					Authorization: getAuthorization()
				},
				success: (res) => {
					onHttpSuccess(res, resolve, reject)
				},
				fail: (err) => {
					reject(err)
				}
			});
		})
	}
}

export default http
