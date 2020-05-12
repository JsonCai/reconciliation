import http from '../request/request'

let tenantId = '23945197-a5df-44bf-842f-106b42f80355'
let applyPersonId = 'fe5e209b-ad9d-419e-aeda-f92b09d2823d'

// 创建营收单
export function createRevenueAccounts(data){
	data.revenuePersonId = applyPersonId
	data.tenantId = tenantId
	console.log(JSON.stringify(data))
	return http.post('/revenue-accounts',data)
}
// 更新营收单
export function updateRevenueForm(id,data){
	data.revenuePersonId = applyPersonId
	data.tenantId = tenantId
	return http.put('/revenue-accounts/'+id,data)
}
// 申请营收
export function applyRevenue(data){
	data.revenuePersonId = applyPersonId
	data.tenantId = tenantId
	console.log(JSON.stringify(data))
	return http.post('/revenue-accounts/submit',data)
}
// 获取营收详情
export function revenueDetail(id){
	return http.get('/revenue-accounts/'+id)
}
// 获取营收单据列表
export function searchRevenueList(data){
	data.revenuePersonId = applyPersonId
	data.tenantId = tenantId
	console.log(JSON.stringify(data))
	return http.post('/revenue-accounts/search',data)
}