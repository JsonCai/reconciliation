import http from '../request/request'

// 获取企业总报表
export function getStatement() {
	return http.get('/statement/total-statement')
}
// 获取企业区间报表
export function getSectionStatement(data) {
	console.log(JSON.stringify(data))
	return http.get('/statement/section-statement', data)
}
// 获取企业区间报表
export function getSectionStatementList(data) {
	console.log(JSON.stringify(data))
	return http.get('/statement/section-statement/statement-item', data)
}
