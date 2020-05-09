import http from '../request/request'

let tenantId = '4ed3e7ff-89b3-4308-87dc-a583d076510d'
let applyPersonId = '930ee9c2-aee2-4e51-a170-fdf323fbce82'

// 创建特殊收支单
export function createSpecialAccounts(data){
	data.handlePersonId = applyPersonId
	data.tenantId = tenantId
	console.log(JSON.stringify(data))
	return http.post('/special-accounts',data)
}
// 更新特殊收支单
export function updateSpecialForm(id,data){
	data.handlePersonId = applyPersonId
	data.tenantId = tenantId
	return http.put('/special-accounts/'+id,data)
}
// 获取特殊收支
export function SpecialDetail(id){
	return http.get('/special-accounts/'+id)
}
// 获取特殊收支列表
export function searchSpecialList(data){
	data.handlePersonId = applyPersonId
	data.tenantId = tenantId
	console.log(JSON.stringify(data))
	return http.post('/special-accounts/search',data)
}