import http from '../request/request'

let tenantId = '4ed3e7ff-89b3-4308-87dc-a583d076510d'
let applyPersonId = '930ee9c2-aee2-4e51-a170-fdf323fbce82'

// 创建营收单
export function createRevenueAccounts(data){
	data.revenuePersonId = applyPersonId
	data.tenantId = tenantId
	console.log(JSON.stringify(data))
	return http.post('/revenue-accounts',data)
}
// 更新营收单
export function updateRevenueForm(id,data){
	data.applyPersonId = applyPersonId
	data.tenantId = tenantId
	return http.put('/revenue-accounts/'+id,data)
}
// 申请营收
export function applyRevenue(data){
	data.applyPersonId = applyPersonId
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
	data.applyPersonId = applyPersonId
	data.tenantId = tenantId
	console.log(JSON.stringify(data))
	return http.post('/revenue-accounts/search',data)
}