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
				<text>{{detailForm.expenseTime}}</text>
			</view>
			<view class="img-wrap fc-6" v-if="detailForm.expenseVoucherUrls&&detailForm.expenseVoucherUrls.length">
				<text class="fc-30 fc-6">凭据：</text>
				<imgList :list="detailForm.imgList" :isDisabled="true" />
			</view>
			<view class="item-wrap">
				<text>申请日期:</text>
				<text>{{detailForm.applyTime | fmtDate}}</text>
			</view>
			<view class="item-wrap" v-if="detailForm.applyPerson">
				<text>申请人:</text>
				<text>{{detailForm.applyPerson.employeeName}}</text>
			</view>
			<view class="title item-wrap" v-if="detailForm.approvals">
				<image src="../../../static/images/progress.png" class="icon-wallet mr-20"></image>
				<text class="title-text">审批信息</text>
			</view>
			<view class="item-wrap" v-if="detailForm.approvals&&detailForm.approvals.length">
				<text>审批意见</text>
				<text>{{detailForm.approvals[0].approvalOpinion}}</text>
			</view>
			<view class="item-wrap" v-if="detailForm.approvals">
				<text>审批时间</text>
				<text>{{detailForm.approvals[0].createTime}}</text>
			</view>
			<view class="item-wrap" v-if="detailForm.approvals && detailForm.approvals.approvalPerson">
				<text>审批人</text>
				<text>{{detailForm.approvals.approvalPerson[0].employeeName}}</text>
			</view>
			<view class="title item-wrap" v-if="detailForm.approvals">
				<image src="../../../static/images/remit.png" class="icon-wallet mr-20"></image>
				<text class="title-text">操作</text>
			</view>
			<view class="img-wrap fc-6 mt-20">
				<text class="fc-30 fc-6">凭据：</text>
				<imgList :list="detailForm.paymentVoucherUrls" :isDisabled="detailForm.expenseAccountStatus&&detailForm.expenseAccountStatus.value == 5" />
			</view>
			<view class="item-wrap">
				<text>打款日期:</text>
				<view class="inner-wrap" @tap="onStartTimeTap(1)">
					<text v-if="!detailForm.paymentTime" class="fc-9">请选择打款日期</text>
					<text v-else>{{ detailForm.paymentTime}}</text>
				</view>
			</view>
			<view class="big-btn-wrap" v-if="detailForm.expenseAccountStatus&&detailForm.expenseAccountStatus.value == 4">
				<view class='btn confirm-btn' @tap="onPassTap">保存</view>
			</view>
		</view>
		<timePicker :requestCode="timeCode" :show="showTimePicker" @onConfirm="timePickConfirm" @onCancel="showTimePicker = false"></timePicker>
		<loading :isShow='isShowLoading'></loading>
	</view>
</template>

<script>
	import timePicker from '@/components/timePicker/timePicker';
	import imgList from '@/components/imgList/imgList.vue'

	import {
		applyDetail,
		paymentExpence
	} from '@/api/apply/apply.js'
	import {
		REFRESH_DELAYED
	} from '@/config/config.js'
	export default {
		components: {
			imgList,
			timePicker
		},
		data() {
			return {
				detailForm: {},
				showTimePicker: false,
				timeCode: 0,

			}
		},
		filters: {
			fmtDate(val) {
				if (val) {
					return val.split(' ')[0]
				}
				return ''
			},
		},
		methods: {
			onPassTap() {
				if (!this.detailForm.paymentTime) {
					uni.showToast({
						title: '请选择打款时间',
						icon: 'none'
					})
					return
				}
				uni.showModal({
					title: '提示',
					content: '是否确认打款?',
					success: res => {
						if (res.confirm) {
							this.showLoading()
							paymentExpence({
									expenseAccountId: this.detailForm.expenseAccountId,
									paymentTime: this.detailForm.paymentTime + " 00:00:00",
									paymentVoucherUrls: this.detailForm.paymentVoucherUrls = ['aaa']
								})
								.then(res => {
									if (res.code == '0') {
										uni.showToast({
											icon: 'none',
											title: "打款成功"
										})
										setTimeout(() => {
											this.dismissLoading()
											uni.$emit('reload')
											uni.navigateBack()
										}, REFRESH_DELAYED)
									}
								})
								.catch(err => {
									this.dismissLoading()
									uni.showToast({
										icon: 'none',
										title: "操作失败"
									})
								})
						}
					}
				});
			},
			changeImgList(list) {
				console.log(list)
				this.detailForm.paymentVoucherUrls = list
			},
			onStartTimeTap(code) {
				if (this.detailForm.expenseAccountStatus.value == 5) {
					return
				}
				this.timeCode = code;
				this.showTimePicker = true;
			},
			timePickConfirm(time) {
				this.showTimePicker = false;
				if (time.code == 1) {
					this.$set(this.detailForm, 'paymentTime', time.date);
				}
			}
		},
		onLoad(option) {
			applyDetail(option.id)
				.then(res => {
					console.log(res)
					this.$set(this, "detailForm", res.data.expenseAccount)
					this.$set(this.detailForm, 'amount', this.detailForm.amount / 100)
				})
				.catch(err => {
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
	@import url('../../../common/detailForm.less');

	.btn-wrap {
		justify-content: center;

		.btn {
			width: 60%;
		}

		margin-top: 100rpx;
		margin-bottom: 50rpx;
	}
</style>
