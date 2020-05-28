<template>
	<view class="container bg-f5">
		<view class="content-wrap">
			<view class="title item-wrap">
				<image src="../../../static/images/apply.png" class="icon-wallet mr-20"></image>
				<text class="title-text">订单信息</text>
			</view>
			<view class="item-wrap">
				<text>名称:</text>
				<text>{{detailForm.expenseAccountTitle}}</text>
			</view>
			<view class="item-wrap" v-if="detailForm.costCategory">
				<text>分类:</text>
				<text>{{detailForm.costCategory.costCategoryName}}</text>
			</view>
			<view class="item-wrap">
				<text>金额:</text>
				<text>{{detailForm.amount}}元</text>
			</view>
			<view class="item-wrap">
				<text>报销日期:</text>
				<text>{{detailForm.expenseTime | fmtDate}}</text>
			</view>
			<view class="img-wrap fc-6" v-if="detailForm.expenseVoucherUrls&&detailForm.expenseVoucherUrls.length">
				<text class="fc-30 fc-6">凭据：</text>
				<imgList :list="detailForm.imgList" :isDisabled="true" />
			</view>
			<view class="item-wrap">
				<text>申请日期:</text>
				<text>{{detailForm.applyTime}}</text>
			</view>
			<view class="item-wrap" v-if="detailForm.endTime">
				<text>结束日期:</text>
				<text>{{detailForm.endTime}}</text>
			</view>
			<view class="item-wrap">
				<text>状态:</text>
				<text>{{detailForm.expenseAccountStatus.value | fmtState}}</text>
			</view>
			<view class="item-wrap" v-if="detailForm.applyPerson">
				<text>申请人:</text>
				<text>{{detailForm.applyPerson.employeeName}}</text>
			</view>
			<view class="item-wrap" @tap="showHistory" v-if="detailForm.approvals && detailForm.approvals.length">
				<text>审批意见:</text>
				<text>查看历史</text>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import imgList from '@/components/imgList/imgList.vue'
	import {
		dateFtt,
		fmtMoney2
	} from '@/libs/utils'
	import {
		applyDetail
	} from '@/api/apply/apply.js'
	export default {
		components: {
			imgList
		},
		data() {
			return {
				detailForm: {
					expenseAccountStatus: {}
				},
				applyParams: {}
			}
		},
		methods: {
			showHistory() {
				// this.$refs.popup.open()
				uni.navigateTo({
					url: '/pages/reasonList/reasonList'
				})
				uni.$emit('showHistory', this.detailForm.approvals)
			},
		},
		filters: {
			fmtDate(val) {
				if (val) {
					return val.split(' ')[0]
				}
				return ''
			},
			fmtState(val) {
				console.log(val)
				if (val == 1) {
					return '未提交'
				} else if (val == 2) {
					return '已提交'
				} else if (val == 3) {
					return '未通过'
				} else if (val == 4) {
					return '已通过'
				} else {
					return '已打款'
				}
			}
		},
		onLoad(option) {
			console.log(option)
			applyDetail(option.id)
				.then(res => {
					console.log(res)
					this.$set(this, "detailForm", res.data.expenseAccount)
					this.detailForm.amount = fmtMoney2(this.detailForm.amount)
				})
				.catch(err => {
					console.log(err)
				})
		}
	}
</script>

<style lang="less" scoped>
	@import url('../../../common/detailForm.less');
</style>
