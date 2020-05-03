import http from '../request/request'

let tenantId = '4ed3e7ff-89b3-4308-87dc-a583d076510d'
let applyPersonId = '930ee9c2-aee2-4e51-a170-fdf323fbce82'
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