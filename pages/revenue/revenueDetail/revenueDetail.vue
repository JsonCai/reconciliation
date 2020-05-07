<template>
	<view class="container bg-f5">
		<view class="content-wrap">
			<view class="title item-wrap">
				<image src="../../static/images/apply.png" class="icon-wallet mr-20"></image>
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
				<view class="inner-wrap" @tap="onStartTimeTap(1)">
					<text v-if="!detailForm.revenueTime" class="fc-9">请选择营收日期</text>
					<text v-else>{{ detailForm.revenueTime}}</text>
					<text class="font-icon">&#xe662;</text>
				</view>
			</view>
			<view class="img-wrap fc-6" v-if="detailForm.revenueVoucherUrls">
				<text class="fc-6">凭据：</text>
				<imgList :list="detailForm.revenueVoucherUrls" :isDisabled="true" />
			</view>
			
			<view class="item-wrap">
				<text>提交日期:</text>
				<text>{{detailForm.submitTime}}</text>
			</view>
			<view class="item-wrap">
				<text>结束日期:</text>
				<text>{{detailForm.endTime}}</text>
			</view>
			<view class="item-wrap">
				<text>营业员:</text>
				<text>{{detailForm.receiptPerson.employeeName}}</text>
			</view>
			<view class="item-wrap">
				<text>状态:</text>
				<text>{{detailForm.revenueAccountStatus|revenueState}}</text>
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
			revenueState(state){
				return getRevenueStateStr(state)
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
					this.$set(this, "detailForm", res.data.data.revenueAccount)
				})
				.catch(err => {
					console.log(err)
				})
		}
	}
</script>

<style lang="less" scoped>
	@import url('../../common/detailForm.less');
</style>
