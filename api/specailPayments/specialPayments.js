import http from '../request/request'

let tenantId = '23945197-a5df-44bf-842f-106b42f80355'
let applyPersonId = 'fe5e209b-ad9d-419e-aeda-f92b09d2823d'

// 创建特殊收支单
export function createSpecialAccounts(data) {
	data.handlePersonId = applyPersonId
	data.tenantId = tenantId
	console.log(JSON.stringify(data))
	return http.post('/special-accounts', data)
}
// 更新特殊收支单
export function updateSpecialForm(id, data) {
	data.handlePersonId = applyPersonId
	data.tenantId = tenantId
	return http.put('/special-accounts/' + id, data)
}
// 获取特殊收支
export function SpecialDetail(id) {
	return http.get('/special-accounts/' + id)
}
// 获取特殊收支列表
export function searchSpecialList(data) {
	console.log(JSON.stringify(data))
	return http.post('/special-accounts/search', data)
}
// 返回特殊收支单据
export function getSpecialPaymentsDetail(id) {
	return http.get('/special-accounts/' + id)
}
// 删除营收单据列表
export function delSpecialPaymentsForm(id){
	return http.detele('/special-accounts/' + id)
}