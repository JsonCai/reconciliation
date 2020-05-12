<template>
	<view class="container bg-f5">
		<view class="content-wrap">
			<view class="title item-wrap">
				<image src="../../../static/images/apply.png" class="icon-wallet mr-20"></image>
				<text class="title-text">订单信息</text>
			</view>
			<view class="item-wrap">
				<text>名称:</text>
				<text>{{ detailForm.revenueAccountTitle}}</text>
				</view>
			<view class="item-wrap">
				<text>应收款:</text>
				<text>{{detailForm.accountReceivable}}</text>
			</view>
			<view class="item-wrap">
				<text>实收款:</text>
				<text>{{detailForm.fundsReceived}}</text>
			</view>
			<view class="item-wrap">
				<text>营收日期:</text>
				<view class="inner-wrap">
					<text>{{ detailForm.revenueTime|fmtDate}}</text>
				</view>
			</view>
			<view class="img-wrap fc-6" v-if="detailForm.revenueVoucherUrls">
				<text class="fc-6">凭据：</text>
				<imgList :list="detailForm.revenueVoucherUrls" :isDisabled="true" />
			</view>
			
			<view class="item-wrap" v-if="detailForm.submitTime">
				<text>提交日期:</text>
				<text>{{detailForm.submitTime|fmtDate}}</text>
			</view>
			<view class="item-wrap" v-if="detailForm.endTime">
				<text>结束日期:</text>
				<text>{{detailForm.endTime}}</text>
			</view>
			<view class="item-wrap" v-if="detailForm.revenuePerson">
				<text>营业员:</text>
				<text>{{detailForm.revenuePerson.employeeName}}</text>
			</view>
			<view class="item-wrap" v-if="detailForm.revenueAccountStatus">
				<text>状态:</text>
				<text>{{detailForm.revenueAccountStatus.value|revenueState}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import imgList from '@/components/imgList/imgList.vue'
	import {
		revenueDetail
	} from '@/api/revenue/revenue.js'
	import getRevenueStateStr from '@/config/config.js'
	export default {
		components: {
			imgList
		},
		filters: {
			fmtDate(val) {
				if (val) {
					return val.split(' ')[0]
				}
				return ''
			},
			revenueState(stateCode){
				if(stateCode == 1){
					return "未提交"
				}else if(stateCode == 2){
					return "已提交"
				}else if(stateCode == 3){
					return "被拒收"
				}else if(stateCode == 4){
					return "被收款"
				}
			}
		},
		data() {
			return {
				detailForm: {}
			}
		},
		methods: {

		},
		onLoad(option) {
			console.log(option)
			revenueDetail(option.id)
				.then(res => {
					console.log(res)
					this.$set(this, "detailForm", res.data.revenueAccount)
				})
				.catch(err => {
					console.log(err)
				})
		}
	}
</script>

<style lang="less" scoped>
	@import url('@/common/detailForm.less');
</style>
