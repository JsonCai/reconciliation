<template>
	<view class="container bg-f5">
		<view class="content-wrap">
			<view class="title item-wrap">
				<image src="../../../static/images/apply.png" class="icon-wallet mr-20"></image>
				<text class="title-text">订单信息</text>
			</view>
			<view class="item-wrap">
				<text class="fc-6">名称:</text>
				<text class="fc-3">{{ detailForm.revenueAccountTitle}}</text>
			</view>
			<view class="item-wrap">
				<text class="fc-6">应收款:</text>
				<text class="fc-3">{{detailForm.accountReceivable}}</text>
			</view>
			<view class="item-wrap">
				<text class="fc-6">实收款:</text>
				<text class="fc-3">{{detailForm.fundsReceived}}</text>
			</view>
			<view class="item-wrap">
				<text class="fc-6">营收日期:</text>
				<view class="inner-wrap">
					<text class="fc-3">{{ detailForm.revenueTime|fmtDate}}</text>
				</view>
			</view>
			<view class="img-wrap fc-6 mt-20" v-if="detailForm.revenueVoucherUrls && detailForm.revenueVoucherUrls.length">
				<text class="fc-6">凭据：</text>
				<imgList :list="detailForm.revenueVoucherUrls" :isDisabled="true" />
			</view>
			<view class="item-wrap">
				<text class="fc-6">描述</text>
				<text class="fc-3 ml-20">{{detailForm.revenueAccountDescription}}</text>
			</view>
			<view class="item-wrap mt-20" v-if="detailForm.submitTime">
				<text class="fc-6">提交日期:</text>
				<text class="fc-3">{{detailForm.submitTime|fmtDate}}</text>
			</view>
			<view class="item-wrap" v-if="detailForm.endTime">
				<text class="fc-6">结束日期:</text>
				<text class="fc-3">{{detailForm.endTime}}</text>
			</view>
			<view class="item-wrap" v-if="detailForm.revenuePerson">
				<text class="fc-6">营业员:</text>
				<text class="fc-3">{{detailForm.revenuePerson.employeeName}}</text>
			</view>
			<view class="item-wrap" v-if="detailForm.revenueAccountStatus">
				<text class="fc-6">状态:</text>
				<text class="fc-3">{{detailForm.revenueAccountStatus.value|revenueState}}</text>
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
	import {
		fmtMoney2
	} from '@/libs/utils'
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
			revenueState(stateCode) {
				if (stateCode == 1) {
					return "未提交"
				} else if (stateCode == 2) {
					return "已提交"
				} else if (stateCode == 3) {
					return "被拒收"
				} else if (stateCode == 4) {
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
					this.detailForm.fundsReceived = fmtMoney2(this.detailForm.fundsReceived)
					this.detailForm.accountReceivable = fmtMoney2(this.detailForm.accountReceivable)
				})
				.catch(err => {
					this.dismissLoading()
					console.log(err)
					uni.showToast({
						icon: 'none',
						title: "获取详情失败"
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 500)
				})
		}
	}
</script>

<style lang="less" scoped>
	@import url('@/common/detailForm.less');
</style>
