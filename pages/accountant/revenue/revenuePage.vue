<template>
	<view>
		<fakeSearch  @onSearch="searchClick"></fakeSearch>
		<view class="list-wrap" >
			<mescroll-body ref="mescrollRef" @init="mescrollInit" top="120" bottom="10" @down="downCallback" @up="upCallback">
				<view class="list" v-for="listItem in dataList" :key="listItem.revenueAccountId">
					<revenueItem :revenueItem="listItem" @clickItem="itemClick" fromType='revenue'></revenueItem>
				</view>
			</mescroll-body>
		</view>
	</view>
</template>

<script>
	import fakeSearch from '@/components/fakeSearch/fakeSearch.vue';
	import MescrollBody from "@/components/mescroll-diy/beibei/mescroll-body.vue";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import revenueItem from '@/components/revenueItem/revenueItem.vue';
	import {
		confirmSearchRevenueList
	} from '../../../api/revenue/revenue.js'
	export default {
		mixins: [MescrollMixin],
		components: {
			fakeSearch,
			MescrollBody,
			revenueItem
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
				confirmSearchRevenueList(this.getApplyFormData(page))
					.then(res => {
						console.log(res)
						this.mescroll.endSuccess(res.data.revenueAccounts.length);
						if (page.num == 1) {
							this.dataList = []
						}
						this.dataList = this.dataList.concat(res.data.revenueAccounts)
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
					url: '../../revenueDetail/revenueDetail?id=' + item.revenueAccountId
				})
			},
			searchClick(){
				uni.navigateTo({
					url:'../revenueSearchPage/revenueSearchPage'
				})
			}
		}
	}
</script>

<style>

</style>
