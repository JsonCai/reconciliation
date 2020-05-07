<template>
	<view class="container bg-f5">
		<view class="content-wrap">
			<view class="title item-wrap">
				<image src="../../static/images/apply.png" class="icon-wallet mr-20"></image>
				<text class="title-text">订单信息</text>
			</view>
			<view class="item-wrap">
				<text>名称:</text>
				<input class="input-text" placeholder="请输入名称" placeholder-class="place" v-model="detailForm.revenueAccountTitle" />
			</view>
			<view class="item-wrap">
				<text>应收款:</text>
				<input class="input-text" placeholder="请输入申报金额" placeholder-class="place" v-model="detailForm.accountReceivable" />
			</view>
			<view class="item-wrap">
				<text>实收款:</text>
				<input class="input-text" placeholder="请输入申报金额" placeholder-class="place" v-model="detailForm.fundsReceived" />
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
			<view class="title item-wrap" v-if="detailForm.approvals">
				<image src="../../static/images/progress.png" class="icon-wallet mr-20"></image>
				<text class="title-text">收款历史</text>
			</view>
			<view class="item-cross-line" v-if="detailForm.receiptActions&&detailForm.receiptActions.length" v-for="(item,index) in detailForm.receiptActions"
			 :key="item.createTime">
				<view class="item-nowrap">
					<text>收款意见</text>
					<text>{{item.receiptOpinion}}</text>
				</view>
				<view class="item-nowrap">
					<text>操作时间</text>
					<text>{{item.createTime}}</text>
				</view>
				<view class="item-nowrap">
					<text>收款人</text>
					<text>{{item.receiptPerson.employeeName}}</text>
				</view>
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
		filters: {},
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
