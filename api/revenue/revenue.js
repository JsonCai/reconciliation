import http from '../request/request'

let tenantId = '4ed3e7ff-89b3-4308-87dc-a583d076510d'
let applyPersonId = '930ee9c2-aee2-4e51-a170-fdf323fbce82'

export function createRevenueAccounts(data){
	data.revenuePersonId = applyPersonId
	data.tenantId = tenantId
	return http.post('/expense-accounts',data)
}