<template>
	<view>
		<fakeSearch @onSearch='onSearch' />
		<view class="list-wrap">
			<mescroll-body ref="mescrollRef" @init="mescrollInit" top="140" bottom="10" @down="downCallback" @up="upCallback">
				<view class="list" v-for="listItem in dataList" :key="listItem.specialAccountId">
					<specialPayments :specialPayment="listItem" @clickItem="itemClick(listItem)" @onDel="onDel"></specialPayments>
				</view>
			</mescroll-body>
		</view>
		<view class="btn-add" @tap="applyFrom">&#xe604;</view>
		<loading :isShow='isShowLoading'></loading>
	</view>
</template>
<script>
	import fakeSearch from '@/components/fakeSearch/fakeSearch.vue';
	import MescrollBody from "@/components/mescroll-diy/beibei/mescroll-body.vue";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import specialPayments from '@/components/specialPaymentsItem/specialPaymentsItem.vue';

	import {
		searchSpecialList,
		delSpecialPaymentsForm
	} from '../../../api/specailPayments/specialPayments.js'

	import {
		REFRESH_DELAYED
	} from '@/config/config.js'

	export default {
		mixins: [MescrollMixin],
		components: {
			fakeSearch,
			MescrollBody,
			specialPayments
		},
		data() {
			return {
				dataList: []
			};
		},
		onReachBottom() {
			console.log(this.tabIndex)
			this.$refs.list.loadMore()
		},
		methods: {
			onDel(item) {
				uni.showModal({
					title: '提示',
					content: '确定要删除该数据?',
					success: res => {
						this.showLoading()
						if (res.confirm) {
							delSpecialPaymentsForm(item.specialAccountId)
								.then(res => {
									uni.showToast({
										title: '删除成功',
										icon: 'none'
									})
									setTimeout(() => {
										this.dismissLoading()
										this.mescroll.resetUpScroll()
									}, REFRESH_DELAYED)
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
			applyFrom() {
				uni.navigateTo({
					url: '../payments/payments'
				})
			},
			loadMore() {
				this.mescroll && this.mescroll.onReachBottom()
			},
			getApplyFormData(page) {
				let offset = page.size * (page.num - 1)
				const params = {
					offset,
					limit: page.size
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
				searchSpecialList(this.getApplyFormData(page))
					.then(res => {
						console.log(res)
						this.mescroll.endSuccess(res.data.specialAccounts.length);
						if (page.num == 1) {
							this.dataList = []
						}
						this.dataList = this.dataList.concat(res.data.specialAccounts)
					})
					.catch(err => {
						if (page.num == 1) {
							this.dataList = []
							this.mescroll.endSuccess(0);
						}
						uni.showToast({
							icon: 'none',
							title: "请求失败"
						})
						console.log(err)
					})
			},
			itemClick(item) {
				uni.navigateTo({
					url: '../payments/payments?id=' + item.specialAccountId
				})
			},
			onSearch() {
				uni.navigateTo({
					url: '../searchPage/searchPage'
				})
			}
		},
		onLoad() {
			uni.$on("reload", () => {
				console.log("paymentList reload")
				this.mescroll.resetUpScroll()
			})
		}
	};
</script>

<style>
</style>
