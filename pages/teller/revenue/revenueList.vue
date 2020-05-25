<template>
	<mescroll-body ref="mescrollRef" @init="mescrollInit" top="240" bottom="10" @down="downCallback" @up="upCallback">
		<view class="list" v-for="listItem in dataList" :key="listItem.revenueAccountId">
			<revenueItem :revenueItem="listItem" @clickItem="itemClick" fromType='teller'></revenueItem>
		</view>
	</mescroll-body>
</template>

<script>
	import MescrollBody from "@/components/mescroll-diy/beibei/mescroll-body.vue";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import revenueItem from '@/components/revenueItem/revenueItem.vue';
	import {
		receiptSearchRevenueList
	} from '../../../api/revenue/revenue.js'

	export default {
		mixins: [MescrollMixin],
		components: {
			revenueItem,
			MescrollBody
		},
		data() {
			return {
				dataList: []
			};
		},
		props: {
			tab: Object // tab菜单,此处用于取关键词
		},
		methods: {
			loadMore() {
				this.mescroll && this.mescroll.onReachBottom()
			},
			reload(){
				this.mescroll && this.mescroll.resetUpScroll()
			},
			getApplyFormData(page) {
				let offset = page.size * (page.num - 1)
				const params = {
					offset,
					limit: page.size,
					revenueAccountStatus: this.tab.expenseAccountStatus
				}
				console.log(params)
				return params
			},
			/*下拉刷新的回调 */
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				receiptSearchRevenueList(this.getApplyFormData(page))
					.then(res => {
						console.log(res)
						this.mescroll.endSuccess(res.data.revenueAccounts.length);
						if (page.num == 1) {
							this.dataList = []
						}
						this.dataList = this.dataList.concat(res.data.revenueAccounts)
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
			},
			itemClick(item) {
				uni.navigateTo({
					url: '../../revenueDetail/revenueDetail?id=' + item.revenueAccountId
				})
			}
		},
		mounted() {

		}
	};
</script>
