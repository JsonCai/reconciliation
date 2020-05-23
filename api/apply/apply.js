import http from '../request/request'

// 创建报销单据
export function createApplyForm(data){
	return http.post('/expense-accounts',data)
}
// 获取采购人员报销单据列表
export function getBuyeApplyrForm(data){
	return http.post('/expense-accounts/search/as-apply-person',data)
}
// 获取审核人员报销单据列表
export function getApprovalApplyrForm(data){
	return http.post('/expense-accounts/search/as-approval-person',data)
}
// 获取打款人报销单据列表
export function getPaymentApplyrForm(data){
	return http.post('/expense-accounts/search/as-payment-person',data)
}
// 获取确认打款人报销单据列表
export function getConfirmApplyrForm(data){
	return http.post('/expense-accounts/search/as-confirm-person',data)
}
// 删除销单据列表
export function delApplyForm(id){
	return http.doDelete('/expense-accounts/' + id)
}
// 报销单详情Audit
export function applyDetail(id){
	return http.get('/expense-accounts/'+id)
}
// 更新报销单
export function updateApplyForm(id,data){

	return http.put('/expense-accounts/'+id,data)
}
// 申请报销
export function applyExpense(data){
	return http.post('/expense-accounts/apply-expense',data)
}
// 审批报销单据
export function approveExpense(data){
	return http.post('/expense-accounts/approval-expense-account',data)
}
// 报销单据打款
export function paymentExpence(data){
	return http.post('/expense-accounts/payment-expense-account',data)
}

// 获取报销单据列表
export function delApply(expenseAccountId){
	return http.post('/expense-accounts/search' + expenseAccountId ,{
		expenseAccountId
	})
}