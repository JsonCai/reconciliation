<template>
	<view class="list-wrap">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<view v-for="(item,index) in dataList" :key="item.messageId">
				<statementItem :statement="item" @clickItem="clickItem" :fromType='requestData.statementItemType'></statementItem>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollBody from "@/components/mescroll-diy/beibei/mescroll-body.vue";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import {
		getSectionStatementList
	} from '@/api/statement/statement.js'
	import {
		deepClone
	} from '@/libs/utils';
	import statementItem from '@/components/statementItem/statementItem.vue'
	import {
		StatementTypes
	} from '@/config/config.js'
	export default {
		mixins: [MescrollMixin],
		components: {
			MescrollBody,
			statementItem
		},
		data() {
			return {
				dataList: [],
				requestData: {}
			};
		},
		filters: {
			unreadNum(num) {
				return num > 99 ? "99+" : num
			}
		},
		methods: {
			clickItem(statement) {
				// uni.navigateTo({
				// 	url: '../msgList/msgList?channelSerialNumber' + item.code
				// })
				if (this.requestData.statementItemType == StatementTypes.mainBusinessExpenses) {
					uni.navigateTo({
						url: '../../buyer/applyDetail/applyDetail?id=' + statement.statementItemId
					})
				} else if (this.requestData.statementItemType == StatementTypes.otherExpenses) {
					uni.navigateTo({
						url: '../../revenue/revenueDetail/revenueDetail?id=' + statement.statementItemId
					})
				} else {
					uni.navigateTo({
						url: '../../specialPayments/payments/payments?id=' + statement.statementItemId
					})
				}
			},
			getRequestData(page) {
				let offset = page.size * (page.num - 1)
				let params = deepClone(this.requestData)

				params.offset = offset
				params.limit = page.size
				return params
			},
			/*下拉刷新的回调 */
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				console.log('upCallback')
				getSectionStatementList(this.getRequestData(page))
					.then(res => {
						console.log(res)
						this.mescroll.endSuccess(res.data.statementItemDtos.length);
						if (page.num == 1) {
							this.dataList = []
						}
						this.dataList = res.data.statementItemDtos
					})
					.catch(err => {
						console.log(err)
						if (page.num == 1) {
							this.dataList = []
							this.mescroll.endSuccess(0);
						}
						uni.showToast({
							icon: 'none',
							title: "请求失败"
						})
					})
			}
		},
		onLoad(option) {
			if (option.request) {
				this.requestData = JSON.parse(decodeURIComponent(option.request))
				console.log(this.requestData)
				var title = "主营应收明细"
				if (this.requestData.statementItemType == StatementTypes.mainBusinessExpenses) {
					title = "主营支出明细"
				} else if (this.requestData.statementItemType == StatementTypes.otherExpenses) {
					title = "其他支出明细"
				} else if (this.requestData.statementItemType == StatementTypes.otherIncome) {
					title = "其他收入明细"
				}
				uni.setNavigationBarTitle({
					title
				})
			}
		}
	}
</script>

<style lang="less">
</style>
