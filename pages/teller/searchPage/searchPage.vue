<template>
	<view>
		<realSearch @cancelKeyword="cancelKeyword" @onCancel="onCancel" @onConfirm="onConfirm"></realSearch>
		<view class="list-wrap" v-if="isShow">
			<mescroll-body ref="mescrollRef" @init="mescrollInit" top="120" bottom="10" @down="downCallback" @up="upCallback">
				<view class="list" v-for="listItem in dataList" :key="listItem.expenseAccountId">
					<view @tap="clickItem(listItem)">
						<applyItem :applyItem="listItem" fromType='teller'></applyItem>
					</view>
				</view>
			</mescroll-body>
		</view>
	</view>
</template>

<script>
	import realSearch from '@/components/realSearch/realSearch.vue'
	import MescrollBody from "@/components/mescroll-diy/beibei/mescroll-body.vue";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import applyItem from '@/components/applyItem/applyItem.vue';
	import {
		getApplyForm,
		getPaymentApplyrForm
	} from '../../../api/apply/apply.js'
	export default {
		mixins: [MescrollMixin],
		components: {
			realSearch,
			MescrollBody,
			applyItem
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
			loadMore() {
				this.mescroll && this.mescroll.onReachBottom()
			},
			reload() {
				this.mescroll && this.mescroll.resetUpScroll()
			},
			getApplyFormData(page) {
				let offset = page.size * (page.num - 1)
				const params = {
					expenseAccountTitleMatch: this.searchKey,
					offset,
					limit: page.size,
				}
				return params
			},
			/*下拉刷新的回调 */
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				getPaymentApplyrForm(this.getApplyFormData(page))
					.then(res => {
						this.mescroll.endSuccess(res.data.expenseAccounts.length);
						if (page.num == 1) {
							this.dataList = []
						}
						this.dataList = this.dataList.concat(res.data.expenseAccounts)
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
					url: '../applyDetail/applyDetail?id=' + item.expenseAccountId
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
				this.reload()
			})
		}
	}
</script>

<style>

</style>
