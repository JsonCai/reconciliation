export const baseUrl = 'https://fzg.fzzxwl.com:31886'

const tabAll = {
	id: "tab01",
	name: '全部',
	newsid: 0
}
const tabUnSumit = {
	id: "tab02",
	name: '未提交',
	newsid: 1
}
const tabSumit = {
	id: "tab03",
	name: '已提交',
	newsid: 3
}
const tabReject = {
	id: "tab04",
	name: '被拒收',
	newsid: 4
}
const tabGathring = {
	id: "tab05",
	name: '被收款',
	newsid: 5
}
const tabUnpass = {
	id: "tab06",
	name: '未通过',
	newsid: 6
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
	newsid: 10
}
const tabRefuse = {
	id: "tab11",
	name: '已拒绝',
	newsid: 11
}
const tabPass = {
	id: "tab12",
	name: '已通过',
	newsid: 12
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

// export default {
// 	bossTabs,
// 	buyerTabs,
// 	revenueTabs,
// 	tellerTabs
// }
