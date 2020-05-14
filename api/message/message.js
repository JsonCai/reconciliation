import http from '../request/request'

let tenantId = '23945197-a5df-44bf-842f-106b42f80355'
let applyPersonId = 'fe5e209b-ad9d-419e-aeda-f92b09d2823d'

// 获取消息页数据
export function getMessageBox(){
	return http.get('/message-box/channels')
}
// 获取消息列表数据
export function getMessageList(channelSerialNumber){
	return http.get('/message-box/channels/'+channelSerialNumber+'/messages')
}