export const baseUrl = 'https://fzg.fzzxwl.com:31886'

const tabAll = {
	id: "tab01",
	name: '全部',
	expenseAccountStatus: null
}
const tabUnSumit = {
	id: "tab02",
	name: '未提交',
	expenseAccountStatus: 1
}
const tabSumit = {
	id: "tab03",
	name: '已提交',
	expenseAccountStatus: 3
}
const tabReject = {
	id: "tab04",
	name: '被拒收',
	newsid: 4
}
const tabGathring = {
	id: "tab05",
	name: '被收款',
	expenseAccountStatus:4
}
const tabUnpass = {
	id: "tab06",
	name: '未通过',
	expenseAccountStatus: 3
}
const tabSuccess = {
	id: "tab07",
	name: '已成功',
	newsid: 7
}
const tabWaitRemit = {
	id: "tab08",
	name: '待打款',
	newsid: 8
}
const tabRemited = {
	id: "tab09",
	name: '已打款',
	newsid: 9
}
const tabWaitApprove = {
	id: "tab10",
	name: '待审批',
	expenseAccountStatus: 2
}
const tabRefuse = {
	id: "tab11",
	name: '已拒绝',
	expenseAccountStatus: 3
}
const tabPass = {
	id: "tab12",
	name: '已通过',
	expenseAccountStatus: 4
}


export const bossTabs = [
	tabAll,
	tabWaitApprove,
	tabRefuse,
	tabPass
]

export const buyerTabs = [
	tabAll,
	tabUnSumit,
	tabSumit,
	tabUnpass,
	tabSuccess
]

export const revenueTabs = [
	tabAll,
	tabUnSumit,
	tabSumit,
	tabReject,
	tabGathring
]

export const tellerTabs = [
	tabAll,
	tabWaitRemit,
	tabRemited
]
export const kjTabs = [
	tabAll,
	tabWaitRemit,
	tabRemited
]
// export default {
// 	bossTabs,
// 	buyerTabs,
// 	revenueTabs,
// 	tellerTabs
// }

// 返回审核状态数据 （1.未提交2.已提交3.被拒收4.被收款）
export function getRevenueStateStr(stateCode){
	if(stateCode == 1){
		return "未提交"
	}else if(stateCode == 2){
		return "已提交"
	}else if(stateCode == 3){
		return "被拒收"
	}else if(stateCode == 4){
		return "被收款"
	}
}

// 返回特殊收支类型列表
export const specialType = [
	{
		name:'其他收入',
		type:1
	},
	{
		name:'其他支出',
		type:2
	}
]
