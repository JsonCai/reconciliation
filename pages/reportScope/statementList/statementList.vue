<template>
	<view class="list-wrap">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<view v-for="(item,index) in dataList" :key="item.messageId" @tap="onClick(item)">
				<statementItem :statement="item" @clickItem="clickItem" :fromType='type'></statementItem>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollBody from "@/components/mescroll-diy/beibei/mescroll-body.vue";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import {
		getSectionStatementList
	} from '@/api/statement/statement.js'
	import statementItem from '@/components/statementItem/statementItem.vue'
	export default {
		mixins: [MescrollMixin],
		components: {
			MescrollBody,
			statementItem
		},
		data() {
			return {
				dataList: [],
				type: 1
			};
		},
		filters: {
			unreadNum(num) {
				return num > 99 ? "99+" : num
			}
		},
		methods: {
			onClick(code) {
				uni.navigateTo({
					url: '../msgList/msgList?channelSerialNumber' + item.code
				})
			},
			/*下拉刷新的回调 */
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				getSectionStatementList({
					
				})
					.then(res => {
						this.mescroll.endSuccess(res.data.statementItems.length);
						if (page.num == 1) {
							this.dataList = []
						}
						this.dataList = res.data.statementItems
					})
					.catch(err => {
						console.log(err)
						this.mescroll.endErr()
					})
			}
		},
		onLoad(option) {
			// console.log(bossCode)
			if(option.type){
				this.type = option.type
			}
		}
	}
</script>

<style lang="less">
</style>
