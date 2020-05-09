import http from '../request/request.js'

let Authorization = ''

export const KEY_AUTHORIZATION = 'KEY_AUTHORIZATION'

export function getAuthorization() {
	if (Authorization) {
		return Authorization
	}
	try {
		// Authorization = uni.getStorageSync(KEY_AUTHORIZATION)
		Authorization ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InRlbmFudElkIjoiNGVkM2U3ZmYtODliMy00MzA4LTg3ZGMtYTU4M2QwNzY1MTBkIiwiZW1wbG95ZWVJZCI6IjUxMzQ5NzIwLTEwYWItNDVlOC05Nzc1LTNlMmIzMWNmYThjZSIsImVtcGxveWVlTmFtZSI6IuaWueWFqOWLhyIsInBlcm1pc3Npb25zIjpbIuWuoeaguOaKpemUgOWNleaNriIsIuaJk-asvuaKpemUgOWNleaNriJdfSwiZXhwIjoxNTg5MzkxODEzfQ.0AVLNfYjbUBhbaMxJmzsn8caXQdFXX3OCNkQJ1A13gg'
	} catch (e) {
		return ''
	}
	return Authorization
}
export function login(data) {
	return http.post('/employees/wechat-login', data)
}
