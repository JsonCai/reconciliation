<template>
	<view>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" top="240" bottom="10" @down="downCallback" @up="upCallback">
			<view class="list" v-for="listItem in dataList" :key="listItem.expenseAccountId">
				<applyItem :applyItem="listItem" @clickItem="itemClick" fromType='buyer' @onDel="onDel"></applyItem>
			</view>
		</mescroll-body>
		<loading :isShow='isShowLoading'></loading>
	</view>
</template>

<script>
	import MescrollBody from "@/components/mescroll-diy/beibei/mescroll-body.vue";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import applyItem from '@/components/applyItem/applyItem.vue';
	import {
		getApplyForm,
		getBuyeApplyrForm,
		delApplyForm
	} from '../../../api/apply/apply.js'
	import {
		REFRESH_DELAYED
	} from '@/config/config.js'

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
		props: {
			tab: Object // tab菜单,此处用于取关键词
		},
		methods: {
			onDel(item) {
				console.log(REFRESH_DELAYED)
				uni.showModal({
					title: '提示',
					content: '确定要删除该数据?',
					success: res => {
						if (res.confirm) {
							this.showLoading()
							delApplyForm(item.expenseAccountId)
								.then(res => {
									setTimeout(() => {
										uni.showToast({
											title: '删除成功',
											icon: 'none'
										})
										this.reload()
										this.dismissLoading()
									}, REFRESH_DELAYED)

								})
								.catch(err => {
									this.dismissLoading()
									console.log(err)
									uni.showToast({
										icon: 'none',
										title: "删除失败"
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
					expenseAccountStatus: this.tab.expenseAccountStatus
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
				getBuyeApplyrForm(this.getApplyFormData(page))
					.then(res => {
						console.log(res.data)
						this.mescroll.endSuccess(res.data.expenseAccounts.length);
						if (page.num == 1) {
							this.dataList = []
						}
						this.dataList = this.dataList.concat(res.data.expenseAccounts)
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
				if (item.expenseAccountStatus == 3 || item.expenseAccountStatus == 1) {
					uni.navigateTo({
						url: '../../applyForm/applyForm?id=' + item.expenseAccountId
					})
				} else {
					uni.navigateTo({
						url: '../applyDetail/applyDetail?id=' + item.expenseAccountId
					})
				}
			}
		}
	};
</script>
