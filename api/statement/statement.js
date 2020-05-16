import http from '../request/request'

// 获取企业总报表
export function getStatement(){
	return http.get('/statement/total-statement')
}