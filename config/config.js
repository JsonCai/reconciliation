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
	expenseAccountStatus: 2
}
const tabReject = {
	id: "tab04",
	name: '被拒收',
	expenseAccountStatus: 3
}
const tabGathring = {
	id: "tab05",
	name: '被收款',
	expenseAccountStatus: 4
}
const tabUnpass = {
	id: "tab06",
	name: '未通过',
	expenseAccountStatus: 3
}
const tabSuccess = {
	id: "tab07",
	name: '已成功',
	expenseAccountStatus: 5
}
const tabWaitRemit = {
	id: "tab08",
	name: '待打款',
	expenseAccountStatus: 4
}
const tabRemited = {
	id: "tab09",
	name: '已打款',
	expenseAccountStatus: 5
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
const tabWaitRecepit = {
	id: "tab13",
	name: '待收款',
	expenseAccountStatus: 2
}
const tabRecepited = {
	id: "tab14",
	name: '已收款',
	expenseAccountStatus: 4
}
const tabRejected = {
	id: "tab15",
	name: '已拒收',
	expenseAccountStatus: 3
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
export const tellerRevenueTab = [
	tabAll,
	tabWaitRecepit,
	tabRecepited,
	tabRejected
]
// export default {
// 	bossTabs,
// 	buyerTabs,
// 	revenueTabs,
// 	tellerTabs
// }

// 返回审核状态数据 （1.未提交2.已提交3.被拒收4.被收款）
export function getRevenueStateStr(stateCode) {
	if (stateCode == 1) {
		return "未提交"
	} else if (stateCode == 2) {
		return "已提交"
	} else if (stateCode == 3) {
		return "被拒收"
	} else if (stateCode == 4) {
		return "被收款"
	}
}

// 返回特殊收支类型列表
export const specialType = [{
		name: '其他收入',
		type: 1
	},
	{
		name: '其他支出',
		type: 2
	}
]


export const MessageTypes = {
	bossCode: 1, // 老板-待审批消息
	cashierRemitCode: 2, // 出纳-待打款消息
	cashierCollectCode: 3, // 出纳-待收款消息
	purchaseCode: 4, // 采购员-申报消息
	revenueCode: 5, // 营收员-营收消息
	accountantExpanseCode: 6, // 会计-支出消息
	accountantEarningCode: 7 // 会计-收入消息
}

// 报表款项类型（1.主营收入2.主营支出3.其它收入4.其它支出）
export const StatementTypes = {
	mainBusinessExpenses: 1,
	mainBusinessIncome: 2,
	otherExpenses: 3,
	otherIncome: 4
}

export const REFRESH_DELAYED = 1500
