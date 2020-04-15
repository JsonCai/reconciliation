<template>
	<view>

		<view class="msg-label" v-for="(item,index) in list" :key="item.code" v-if="item.code&permissionCode" @tap="onClick(item.code)">
			<image class="msg-img" :src="item.img"></image>
			<view class="v-text">
				<text class="msg-title">{{item.title}}</text>
				<text class="msg-content">{{item.content}}</text>
			</view>
			<text class="msg-num" v-if="item.unreadNum">{{item.unreadNum | unreadNum}}</text>
			<text class="arrow-right">&#xe662;</text>
		</view>

	</view>
</template>

<script>
	const purchaseCode = 1 // 采购员-申报消息
	const revenueCode = 2 // 营收员-营收消息
	const cashierRemitCode = 4 // 出纳-待打款消息
	const cashierCollectCode = 8 // 出纳-待收款消息
	const bossCode = 16 // 老板-待审批消息
	const accountantExpanseCode = 32 // 会计-支出消息
	const accountantEarningCode = 64 // 会计-收入消息
	export default {
		data() {
			return {
				purchaseCode: 1,
				permissionCode: purchaseCode | revenueCode | cashierRemitCode | cashierCollectCode | bossCode |
					accountantExpanseCode | accountantEarningCode,
				list: [{
						img: "../../static/images/msg_apply.png",
						title: "采购员",
						content: "申报消息",
						code: purchaseCode,
						unreadNum: 10
					},
					{
						img: "../../static/images/msg-revenue.png",
						title: "营收员",
						content: "营收消息",
						code: revenueCode,
						unreadNum: 99
					},
					{
						img: "../../static/images/msg_backlog_remit.png",
						title: "出纳",
						content: "待打款消息",
						code: cashierRemitCode,
						unreadNum: 9999
					},
					{
						img: "../../static/images/msg_backlog_collect.png",
						title: "出纳",
						content: "待收款消息",
						code: cashierCollectCode
					},
					{
						img: "../../static/images/msg_approve.png",
						title: "老板",
						content: "待审批消息",
						code: bossCode
					},
					{
						img: "../../static/images/msg_expense.png",
						title: "会计",
						content: "支出消息",
						code: accountantExpanseCode
					},
					{
						img: "../../static/images/msg_earning.png",
						title: "会计",
						content: "收入消息",
						code: accountantEarningCode
					},
				]
			};
		},
		filters: {
			unreadNum(num) {
				return num > 99 ? "99+" : num
			}
		},
		methods: {
			onClick(code) {
				switch (code) {
					case purchaseCode:
						console.log(code)
						break;
					case revenueCode:
						console.log(code)
						break;
					case cashierRemitCode:
						console.log(code)
						break;
					case cashierCollectCode:
						console.log(code)
						break;
					case bossCode:
						console.log(code)
						break;
					case accountantExpanseCode:
						console.log(code)
						break;
					case accountantEarningCode:
						console.log(code)
						break;
				}
			}
		}
	}
</script>

<style lang="less">
	@import url('./msg.less');
</style>
