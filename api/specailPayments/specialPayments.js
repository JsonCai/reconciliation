import http from '../request/request'

let tenantId = '4ed3e7ff-89b3-4308-87dc-a583d076510d'
let applyPersonId = '930ee9c2-aee2-4e51-a170-fdf323fbce82'

// 创建营收单
export function createSpecialAccounts(data){
	data.revenuePersonId = applyPersonId
	data.tenantId = tenantId
	console.log(JSON.stringify(data))
	return http.post('/special-accounts',data)
}
// 更新营收单
export function updateSpecialForm(id,data){
	data.applyPersonId = applyPersonId
	data.tenantId = tenantId
	return http.put('/special-accounts/'+id,data)
}
// 申请营收
export function applySpecial(data){
	data.applyPersonId = applyPersonId
	data.tenantId = tenantId
	console.log(JSON.stringify(data))
	return http.post('/revenue-accounts/submit',data)
}
// 获取营收详情
export function SpecialDetail(id){
	return http.get('/revenue-accounts/'+id)
}