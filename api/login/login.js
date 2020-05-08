import http from '../request/request.js'

let Authorization = ''

export const KEY_AUTHORIZATION = 'KEY_AUTHORIZATION'

export function getAuthorization() {
	if (Authorization) {
		return Authorization
	}
	try {
		Authorization = uni.getStorageSync(KEY_AUTHORIZATION)
	} catch (e) {
		return ''
	}
	return Authorization
}
export function login(data) {
	return http.post('/employees/wechat-login', data)
}
