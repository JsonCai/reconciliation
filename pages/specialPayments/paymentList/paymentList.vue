<template>
	<view>
		<fakeSearch @onSearch='onSearch'/>
		<view class="list-wrap">
			<mescroll-body ref="mescrollRef" @init="mescrollInit" top="120" bottom="10" @down="downCallback" @up="upCallback">
				<view class="list" v-for="listItem in dataList">
					<specialPayments :specialPayment="listItem" @clickItem="itemClick(listItem)"></specialPayments>
				</view>
			</mescroll-body>
		</view>
		<view class="btn-add" @tap="applyFrom">&#xe604;</view>
	</view>
</template>
<script>
	import fakeSearch from '@/components/fakeSearch/fakeSearch.vue';
	import MescrollBody from "@/components/mescroll-diy/beibei/mescroll-body.vue";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import specialPayments from '@/components/specialPaymentsItem/specialPaymentsItem.vue';
	
	import {
		searchSpecialList
	} from '../../../api/specailPayments/specialPayments.js'
	
	export default {
		mixins: [MescrollMixin],
		components: {
			fakeSearch,
			MescrollBody,
			specialPayments
		},
		data() {
			return {
				dataList:[]
			};
		},
		onReachBottom() {
			console.log(this.tabIndex)
			this.$refs.list.loadMore()
		},
		methods: {
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
						console.log(err)
					})
			},
			itemClick(item) {
				uni.navigateTo({
					url: '../payments/payments?id='+item.specialAccountId
				})
			},
			onSearch(){
				uni.navigateTo({
					url:'../searchPage/searchPage'
				})
			}
		}
	};
</script>

<style>
</style>
