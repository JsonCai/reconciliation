<template>
	<mescroll-body ref="mescrollRef"
	 @init="mescrollInit" top="240" 
	 bottom="10" @down="downCallback"
	 :up="upOption"
	  @up="upCallback">
		<view class="list" v-for="listItem in dataList">
			<applyItem :applyItem="listItem" @tap="itemClick(item)" fromType='boss'></applyItem>
		</view>
	</mescroll-body>
</template>

<script>
	import MescrollBody from "@/components/mescroll-diy/beibei/mescroll-body.vue";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import applyItem from '@/components/applyItem/applyItem.vue';
	import {
		getApplyForm,
		searchApplyFormList
	} from '../../../api/apply/apply.js'

	export default {
		mixins: [MescrollMixin],
		components: {
			MescrollBody
		},
		data() {
			return {
				dataList: [],
				upOption:{
					page: {
												num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
												size: 5 // 每页数据的数量,默认10
											},
				}

			};
		},
		props: {
			tab: Object // tab菜单,此处用于取关键词
		},
		methods: {
			loadMore(){
				 this.mescroll && this.mescroll.onReachBottom()
			},
			getApplyFormData(page) {
				let offset = page.size * (page.num - 1)
				const params = {
					offset,
					limit: page.size
					// expenseAccountStatus:this.tabs[this.tabIndex].expenseAccountStatus
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
				searchApplyFormList(this.getApplyFormData(page))
					.then(res => {
						console.log(page)
						console.log(res.data.expenseAccounts.length)
						console.log(page.size)
						this.mescroll.endSuccess(res.data.expenseAccounts.length,true);
						if (page.num == 1) {
							this.dataList = []
						}
						this.dataList = this.dataList.concat(res.data.expenseAccounts)
					})
					.catch(err => {
						console.log(err)
					})
			},
			itemClick(item) {
				uni.navigateTo({
					url: '../applyDetail/applyDetail'
				})
			}
		},
		mounted() {

		}
	};
</script>
