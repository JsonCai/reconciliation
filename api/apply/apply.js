import http from '../request/request'
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
	return http.post('/expense-accounts',data)
}
// 获取报销单据列表
export function createApplyForm(data){
	return http.get('/expense-accounts',data)
}
// 删除销单据列表
export function delApplyForm(,id,data){
	return http.post(url + '/' + id,data)
}