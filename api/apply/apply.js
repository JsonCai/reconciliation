import http from '../request/request'

let tenantId = '23945197-a5df-44bf-842f-106b42f80355'
let applyPersonId = 'fe5e209b-ad9d-419e-aeda-f92b09d2823d'
// try {
//     const personId = uni.getStorageSync('personId');
//     if (personId) {
//         applyPersonId = personId
//     }
// } catch (e) {
//     // error
// }
// 创建报销单据
export function createApplyForm(data){
	data.applyPersonId = applyPersonId
	data.tenantId = tenantId
	console.log(JSON.stringify(data))
	return http.post('/expense-accounts',data)
}
// 获取报销单据列表
export function getApplyForm(data){
	data.applyPersonId = applyPersonId
	data.tenantId = tenantId
	console.log(JSON.stringify(data))
	return http.get('/expense-accounts',data)
}
// 删除销单据列表
export function delApplyForm(id,data){
	return http.post(url + '/' + id,data)
}
// 报销单详情
export function applyDetail(id){
	return http.get('/expense-accounts/'+id)
}
// 更新报销单
export function updateApplyForm(id,data){
	data.applyPersonId = applyPersonId
	data.tenantId = tenantId
	return http.put('/expense-accounts/'+id,data)
}
// 申请报销
export function applyExpense(data){
	data.applyPersonId = applyPersonId
	data.tenantId = tenantId
	console.log(JSON.stringify(data))
	return http.post('/expense-accounts/apply-expense',data)
}
// 审批报销单据
export function approveExpense(data){
	data.approvalPersonId = applyPersonId
	data.tenantId = tenantId
	console.log(JSON.stringify(data))
	return http.post('/expense-accounts/approval-expense-account',data)
}
// 报销单据打款
export function paymentExpence(data){
	data.paymentPersonId = applyPersonId
	console.log(JSON.stringify(data))
	return http.post('/expense-accounts/payment-expense-account',data)
}
// 获取报销单据列表
export function searchApplyFormList(data){
	data.applyPersonId = applyPersonId
	data.tenantId = tenantId
	console.log(JSON.stringify(data))
	return http.post('/expense-accounts/search',data)
}