<template>
	<view class="list-wrap">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<view class="msg-label" v-for="(item,index) in dataList" :key="item.code" @tap="onClick(item.code)">
				<image class="msg-img" :src="item.img"></image>
				<view class="v-text">
					<text class="msg-title">{{item.title}}</text>
					<text class="msg-content">{{item.content}}</text>
				</view>
				<text v-if="item.latestMessageTime">{{item.latestMessageTime}}</text>
				<text class="msg-num" v-if="item.unReadMessageCount">{{item.unReadMessageCount | unreadNum}}</text>
				<text class="arrow-right">&#xe662;</text>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollBody from "@/components/mescroll-diy/beibei/mescroll-body.vue";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import {
		getMessageBox
	} from '@/api/message/message.js'

	import {
		MessageTypes
	} from '@/config/config.js'
	//Z...MessageTypeList
	// console.log({...MessageTypeList})

	// const {
	// 	bossCode, // 老板-待审批消息
	// 	cashierRemitCode, // 出纳-待打款消息
	// 	cashierCollectCode, // 出纳-待收款消息
	// 	purchaseCode: 4, // 采购员-申报消息
	// 	revenueCode: 5, // 营收员-营收消息
	// 	accountantExpanseCode: 6, // 会计-支出消息
	// 	accountantEarningCode: 7 // 会计-收入消息
	// } = MessageTypeList

	// 1."待审批消息"2."待打款消息"3."待收款消息"4."申报消息"5."营收消息"6."支出消息"7."收入消息"
	// const bossCode = 1 // 老板-待审批消息
	// const cashierRemitCode = 2 // 出纳-待打款消息
	// const cashierCollectCode = 3 // 出纳-待收款消息
	// const purchaseCode = 4 // 采购员-申报消息
	// const revenueCode = 5 // 营收员-营收消息
	// const accountantExpanseCode = 6 // 会计-支出消息
	// const accountantEarningCode = 7 // 会计-收入消息
	const imgList = [{
			img: "../../static/images/msg_apply.png",
			title: "采购员",
			content: "申报消息",
			code: MessageTypes.purchaseCode
		},
		{
			img: "../../static/images/msg-revenue.png",
			title: "营收员",
			content: "营收消息",
			code: MessageTypes.revenueCode
		},
		{
			img: "../../static/images/msg_backlog_remit.png",
			title: "出纳",
			content: "待打款消息",
			code: MessageTypes.cashierRemitCode
		},
		{
			img: "../../static/images/msg_backlog_collect.png",
			title: "出纳",
			content: "待收款消息",
			code: MessageTypes.cashierCollectCode
		},
		{
			img: "../../static/images/msg_approve.png",
			title: "老板",
			content: "待审批消息",
			code: MessageTypes.bossCode
		},
		{
			img: "../../static/images/msg_expense.png",
			title: "会计",
			content: "支出消息",
			code: MessageTypes.accountantExpanseCode
		},
		{
			img: "../../static/images/msg_earning.png",
			title: "会计",
			content: "收入消息",
			code: MessageTypes.accountantEarningCode
		},
	]
	export default {
		mixins: [MescrollMixin],
		components: {
			MescrollBody
		},
		data() {
			return {
				dataList: []
			};
		},
		filters: {
			unreadNum(num) {
				return num > 99 ? "99+" : num
			}
		},
		methods: {
			onClick(code) {
				// switch (code) {
				// 	case purchaseCode:
				// 		console.log(code)
				// 		break;
				// 	case revenueCode:
				// 		console.log(code)
				// 		break;
				// 	case cashierRemitCode:
				// 		console.log(code)
				// 		break;
				// 	case cashierCollectCode:
				// 		console.log(code)
				// 		break;
				// 	case bossCode:
				// 		console.log(code)
				// 		break;
				// 	case accountantExpanseCode:
				// 		console.log(code)
				// 		break;
				// 	case accountantEarningCode:
				// 		console.log(code)
				// 		break;
				// }
				uni.navigateTo({
					url: '../msgList/msgList?channelSerialNumber' + item.code
				})
			},
			/*下拉刷新的回调 */
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				getMessageBox()
					.then(res => {
						this.mescroll.endSuccess(res.data.messageChannels.length);
						if (page.num == 1) {
							this.dataList = []
						}
						this.dataList = this.dataList.concat(
							res.data.messageChannels.map(item => {
								let messageItem = imgList[item.channelSerialNumber - 1]
								messageItem.title = item.channelTitle
								messageItem.unReadMessageCount = item.unReadMessageCount
								messageItem.latestMessageTime = item.latestMessageTime
								return messageItem
							}))
					})
					.catch(err => {
						console.log(err)
						this.mescroll.endErr()
					})
			}
		},
		onLoad() {
			// console.log(bossCode)
		}
	}
</script>

<style lang="less">
	@import url('./msg.less');
</style>
