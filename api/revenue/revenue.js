import http from '../request/request'

// 创建营收单
export function createRevenueAccounts(data){
	console.log(JSON.stringify(data))
	return http.post('/revenue-accounts',data)
}
// 更新营收单
export function updateRevenueForm(id,data){
	console.log('/revenue-accounts/'+id)
	console.log(data)
	return http.put('/revenue-accounts/'+id,data)
}
// 申请营收
export function applyRevenue(data){
	console.log(JSON.stringify(data))
	return http.post('/revenue-accounts/submit',data)
}
// 获取营收详情
export function revenueDetail(id){
	return http.get('/revenue-accounts/'+id)
}
// 接收营收单据
export function receiveRevenueAccounts(data){
	console.log(JSON.stringify(data))
	return http.post('/revenue-accounts/receipt',data)
}
// 获取营收单据列表
export function searchRevenueList(role,data){
	console.log(JSON.stringify(data))
	return http.post('/revenue-accounts/search/'+role,data)
}
// 营收人员 搜索匹配条件的营收单据
export function revenueSearchRevenueList(data){
	return searchRevenueList('as-revenue-person',data)
}
// 收款人 搜索匹配条件的营收单据
export function receiptSearchRevenueList(data){
	return searchRevenueList('as-receipt-person',data)
}
// 确认查看人 搜索匹配条件的营收单据
export function confirmSearchRevenueList(data){
	return searchRevenueList('as-confirm-person',data)
}
// 删除营收单据列表
export function delRevenueForm(id){
	return http.doDelete('/revenue-accounts/' + id)
}