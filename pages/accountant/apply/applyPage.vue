<template>
	<view>
		<fakeSearch  @onSearch="searchClick"></fakeSearch>
		<view class="list-wrap">
			<mescroll-body ref="mescrollRef" @init="mescrollInit" top="120" bottom="10" @down="downCallback" @up="upCallback">
				<view class="list" v-for="listItem in dataList" :key="listItem.expenseAccountId">
					<applyItem :applyItem="listItem" @clickItem="itemClick" fromType='boss'></applyItem>
				</view>
			</mescroll-body>
		</view>
	</view>
</template>

<script>
	import MescrollBody from "@/components/mescroll-diy/beibei/mescroll-body.vue";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import applyItem from '@/components/applyItem/applyItem.vue';
	import fakeSearch from '@/components/fakeSearch/fakeSearch.vue';

	import {
		getConfirmApplyrForm
	} from '../../../api/apply/apply.js'

	export default {
		mixins: [MescrollMixin],
		components: {
			MescrollBody,
			applyItem,
			fakeSearch,
		},
		data() {
			return {
				dataList: []
			};
		},
		onReachBottom() {
			this.loadMore()
		},
		methods: {
			loadMore() {
				this.mescroll && this.mescroll.onReachBottom()
			},
			getApplyFormData(page) {
				let offset = page.size * (page.num - 1)
				const params = {
					expenseAccountTitleMatch: this.searchKey,
					offset,
					limit: page.size
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
				getConfirmApplyrForm(this.getApplyFormData(page))
					.then(res => {
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
			searchClick() {
				uni.navigateTo({
					url:'../searchPage/searchPage'
				})
			},
			clickItem(item) {
				uni.navigateTo({
					url: '../../teller/applyDetail/applyDetail?id=' + item.expenseAccountId
				})
			}
		}

	};
</script>

<style>
</style>
