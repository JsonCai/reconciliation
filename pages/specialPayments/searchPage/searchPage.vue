<template>
	<view>
		<realSearch @cancelKeyword="cancelKeyword" @onCancel="onCancel" @onConfirm="onConfirm"></realSearch>
		<view class="list-wrap" v-if="isShow">
			<mescroll-body ref="mescrollRef" @init="mescrollInit" top="120" bottom="10" @down="downCallback" @up="upCallback">
				<view class="list" v-for="listItem in dataList" :key="listItem.specialAccountId">
					<view @tap="itemClick(listItem)">
						<specialPayments :specialPayment="listItem" @onDel="onDel(listItem)"></specialPayments>
					</view>
				</view>
			</mescroll-body>
		</view>
		<loading :isShow='isShowLoading'></loading>
	</view>
</template>

<script>
	import realSearch from '@/components/realSearch/realSearch.vue'
	import MescrollBody from "@/components/mescroll-diy/beibei/mescroll-body.vue";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import specialPayments from '@/components/specialPaymentsItem/specialPaymentsItem.vue';
	import {
		searchSpecialList
	} from '../../../api/specailPayments/specialPayments.js'
	export default {
		mixins: [MescrollMixin],
		components: {
			realSearch,
			MescrollBody,
			specialPayments
		},
		data() {
			return {
				dataList: [],
				isShow: false,
				searchKey: ""
			};
		},
		onReachBottom() {
			this.loadMore()
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
			loadMore() {
				this.mescroll && this.mescroll.onReachBottom()
			},
			getApplyFormData(page) {
				let offset = page.size * (page.num - 1)
				const params = {
					expenseAccountTitleMatch: this.searchKey,
					offset,
					limit: page.size,
				}
				console.log(params)
				return params
			},
			/*下拉刷新的回调 */
			downCallback() {
				console.log(this.mescroll)
				this.mescroll.resetUpScroll()
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				searchSpecialList(this.getApplyFormData(page))
					.then(res => {
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
			cancelKeyword() {
				this.isShow = false
			},
			onCancel() {
				uni.navigateBack()
			},
			onConfirm(key) {
				this.searchKey = key
				this.isShow = true
				this.downCallback()
			}
		},
		onBackPress() {
			uni.hideKeyboard()
		},
		onLoad() {
			uni.$on("reload", () => {
				this.mescroll.resetUpScroll()
			})
		}
	}
</script>

<style>

</style>
