<template>
	<view>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" top="240" bottom="10" @down="downCallback" @up="upCallback">
			<view class="list" v-for="listItem in dataList">
				<revenueItem :revenueItem="listItem" @clickItem="itemClick" fromType='revenue' @onDel="onDel"></revenueItem>
			</view>
		</mescroll-body>
		<loading :isShow='isShowLoading'></loading>
	</view>
</template>

<script>
	import MescrollBody from "@/components/mescroll-diy/beibei/mescroll-body.vue";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import revenueItem from '@/components/revenueItem/revenueItem.vue';
	import {
		revenueSearchRevenueList,
		delRevenueForm
	} from '../../../api/revenue/revenue.js'
	import {
		REFRESH_DELAYED
	} from '@/config/config.js'

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
			onDel(item) {
				uni.showModal({
					title: '提示',
					content: '确定要删除该数据?',
					success: res => {
						if (res.confirm) {
							this.showLoading()
							delRevenueForm(item.revenueAccountId)
								.then(res => {
									if (res.code == 0) {
										uni.showToast({
											title: '删除成功',
											icon: 'none'
										})
										setTimeout(() => {
											this.dismissLoading()
											this.reload()
										}, REFRESH_DELAYED)
									}
								})
								.catch(err => {
									this.dismissLoading()
									uni.showToast({
										title: '删除失败',
										icon: 'none'
									})
								})
						}
					}
				});
			},
			loadMore() {
				this.mescroll && this.mescroll.onReachBottom()
			},
			reload() {
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
				revenueSearchRevenueList(this.getApplyFormData(page))
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
					})
			},
			itemClick(item) {
				if (item.revenueAccountStatus == 1 || item.revenueAccountStatus == 3) {
					uni.navigateTo({
						url: '../../revenueForm/revenueForm?id=' + item.revenueAccountId
					})
				} else {
					uni.navigateTo({
						url: '../revenueDetail/revenueDetail?id=' + item.revenueAccountId
					})
				}
			}
		}
	};
</script>
