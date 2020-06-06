<template>
	<view class="container bg-f5">
		<view class="content-wrap">
			<view class="title item-wrap">
				<image src="../../static/images/apply.png" class="icon-wallet mr-20"></image>
				<text class="title-text">订单信息</text>
			</view>
			<view class="item-wrap">
				<text class="fc-6">名称:</text>
				<input class="input-text fc-3" placeholder="请输入名称" placeholder-class="place" v-model="detailForm.revenueAccountTitle" />
			</view>
			<view class="item-wrap">
				<text class="fc-6">应收款:</text>
				<input class="input-text fc-3" placeholder="请输入应收款" placeholder-class="place" v-model="detailForm.accountReceivable"
				 type="digit" @blur="changeReceivable" />
			</view>
			<view class="item-wrap">
				<text class="fc-6">实收款:</text>
				<input class="input-text fc-3" placeholder="请输入实收款" placeholder-class="place" v-model="detailForm.fundsReceived"
				 type="digit" @blur="changeReceived" />
			</view>
			<view class="item-wrap">
				<text class="fc-6">营收日期:</text>
				<view class="inner-wrap" @tap="onStartTimeTap(1)">
					<text v-if="!detailForm.revenueTime" class="fc-9">请选择营收日期</text>
					<text v-else class="fc-3">{{ detailForm.revenueTime}}</text>
				</view>
			</view>
			<view class="img-wrap fc-6 mt-20">
				<text class="fc-6">凭据：</text>
				<imgList :list="detailForm.revenueVoucherUrls" :isDisabled="isDisabled" @changeImgList="changeImgList" />
			</view>
			<view class="textarea-wrap">
				<text class="fc-6">描述:</text>
				<textarea placeholder="请输入描述" 　v-model.trim="detailForm.revenueAccountDescription" class="fc-3 ml-20" />
				</view>
			<view class="item-wrap" @tap="showHistory" v-if="isReject">
				<text>审批意见</text>
				<text>查看历史</text>
			</view>
			<view class="big-btn-wrap" v-if="isReject">
				<view class='btn confirm-btn' @tap="onResubmitTap">重新提交</view>
			</view>
			<view class="btn-wrap" v-else>
				<view class='btn save-btn' @tap="onSuspendTap">暂存</view>
				<view class='btn confirm-btn' @tap="onSubmitTap">提交</view>
			</view>
		</view>
		<timePicker :requestCode="timeCode" :show="showTimePicker" @onConfirm="timePickConfirm" @onCancel="showTimePicker = false"></timePicker>
		<loading :isShow='isShowLoading'></loading>
	</view>
</template>

<script>
	import {
		uploadImage
	} from '@/libs/getCos'
	import {
		categoryList
	} from '@/libs/testDates';
	import timePicker from '@/components/timePicker/timePicker';
	import imgList from '@/components/imgList/imgList.vue'
	import {
		createRevenueAccounts,
		applyRevenue,
		updateRevenueForm,
		revenueDetail
	} from '../../api/revenue/revenue.js'
	import {
		deepClone,
		resetDateFormat,
		fmtMoney2,
		accMul
	} from '@/libs/utils.js'
	import {
		REFRESH_DELAYED
	} from '@/config/config.js'
	export default {
		components: {
			timePicker,
			imgList
		},
		data() {
			return {
				showTimePicker: false,
				timeCode: 0,
				isDisabled: false,
				detailForm: {
					revenueVoucherUrls: []
				},
				categoryList,
				categoryIndex: 0,
				category: "",
				isReject: false,
				approvals: []
			};
		},
		methods: {
			showHistory() {
				uni.navigateTo({
					url: '../reasonList/reasonList'
				})
				uni.$emit('showHistory', this.approvals)
			},
			changeImgList(list) {
				this.detailForm.revenueVoucherUrls = list
			},
			onStartTimeTap(code) {
				this.timeCode = code;
				this.showTimePicker = true;
			},
			timePickConfirm(time) {
				this.showTimePicker = false;
				if (time.code == 1) {
					this.$set(this.detailForm, 'revenueTime', time.date);
				}
			},
			onCatagory(value) {
				const category = this.categoryList[this.categoryIndex]
				this.category = category.label
				console.log(this.category)
				this.detailForm.costCategoryId = category.value.toString()
			},
			onSuspendTap() {
				if (this.isFormFill()) {
					this.showLoading()
					this.submitRevenueForm()
						.then(res => {
							console.log(res)
							uni.showToast({
								icon: 'none',
								title: "暂存成功"
							})
							setTimeout(() => {
								uni.$emit('reload')
								uni.navigateBack()
								this.dismissLoading()
							}, REFRESH_DELAYED)
						})
						.catch(err => {
							this.dismissLoading()
							console.log(err)
							uni.showToast({
								icon: 'none',
								title: "请求失败"
							})
						})
				}
			},
			onSubmitTap() {
				if (this.isFormFill()) {
					uni.showModal({
						title: '提示',
						content: '是否确认提交?',
						success: res => {
							if (res.confirm) {
								this.showLoading()
								this.submitRevenueForm()
									.then(res => {
										console.log(res)
										this.detailForm.revenueAccountId = res.data.revenueAccount.revenueAccountId
										return applyRevenue({
											revenueAccountId: this.detailForm.revenueAccountId
										})
									})
									.then(res => {
										console.log(res)
										uni.showToast({
											icon: 'none',
											title: "提交成功"
										})
										setTimeout(() => {
											uni.$emit('reload')
											uni.navigateBack()
											this.dismissLoading()
										}, REFRESH_DELAYED)
									})
									.catch(err => {
										this.dismissLoading()
										console.log(err)
										uni.showToast({
											icon: 'none',
											title: "请求失败"
										})
									})
							}
						}
					});
				}
			},
			onResubmitTap() {
				if (this.isFormFill()) {
					uni.showModal({
						title: '提示',
						content: '是否确认重新提交?',
						success: res => {
							if (res.confirm) {
								this.showLoading()
								this.submitRevenueForm()
									.then(res => {
										console.log(res)
										uni.showToast({
											icon: 'none',
											title: "重新提交成功"
										})
										setTimeout(() => {
											uni.$emit('reload')
											uni.navigateBack()
											this.dismissLoading()
										}, REFRESH_DELAYED)
									})
									.catch(err => {
										this.dismissLoading()
										console.log(err)
										uni.showToast({
											icon: 'none',
											title: "请求失败"
										})
									})
							}
						}
					});
				}
			},
			submitRevenueForm() {
				let form = deepClone(this.detailForm)
				form.accountReceivable = accMul(Number(this.detailForm.accountReceivable), 100)
				form.fundsReceived = accMul(Number(this.detailForm.fundsReceived), 100)
				form.revenueTime = resetDateFormat(form.revenueTime)
				console.log(this.detailForm.revenueVoucherUrls)
				return uploadImage(this.detailForm.revenueVoucherUrls,this.$store.state.cid)
				.then(res=>{
					form.revenueVoucherUrls = res
					if (this.detailForm.revenueAccountId) {
						return updateRevenueForm(form.revenueAccountId, form)
					} else {
						return createRevenueAccounts(form)
					}
				})
			},
			isFormFill() {
				if (!this.detailForm.revenueAccountTitle) {
					uni.showToast({
						icon: 'none',
						title: "请输入名称"
					})
					return
				}
				if (!this.detailForm.accountReceivable) {
					uni.showToast({
						icon: 'none',
						title: "请输入应收款"
					})
					return
				}
				if (!this.detailForm.fundsReceived) {
					uni.showToast({
						icon: 'none',
						title: "请输入实收收款"
					})
					return
				}
				if (!this.detailForm.revenueTime) {
					uni.showToast({
						icon: 'none',
						title: "请选择营收日期"
					})
					return
				}
				return true
			},
			changeReceivable(e) {
				const v = Number(e.detail.value)
				this.$set(this.detailForm, 'accountReceivable', v.toFixed(2))
			},
			changeReceived(e) {
				const v = Number(e.detail.value)
				this.$set(this.detailForm, 'fundsReceived', v.toFixed(2))
			}

		},
		onLoad(option) {
			if (option.id) {
				this.showLoading()
				revenueDetail(option.id)
					.then(res => {
						this.dismissLoading()
						console.log(res)
						// this.detailForm = res.data.revenueAccount
						if (res.data.revenueAccount.receiptActions && res.data.revenueAccount.receiptActions.length) {
							this.approvals = res.data.revenueAccount.receiptActions.map(item => {
								let result = {
									"approvalOpinion": item.receiptOpinion,
									"approvalPerson": item.receiptPerson,
									"approvalType": item.receiptActionType.value,
									"createTime": item.createTime
								}
								return result
							})
						}
						this.detailForm.revenueAccountId = res.data.revenueAccount.revenueAccountId
						this.detailForm.fundsReceived = fmtMoney2(res.data.revenueAccount.fundsReceived)
						this.detailForm.accountReceivable = fmtMoney2(res.data.revenueAccount.accountReceivable)
						this.detailForm.revenueAccountTitle = res.data.revenueAccount.revenueAccountTitle
						this.detailForm.revenueAccountDescription = res.data.revenueAccount.revenueAccountDescription
						this.detailForm.revenueVoucherUrls = res.data.revenueAccount.revenueVoucherUrls
						if (res.data.revenueAccount.revenueTime) {
							this.detailForm.revenueTime = res.data.revenueAccount.revenueTime.split(' ')[0]
						}
						if (res.data.revenueAccount.revenueAccountStatus) {
							this.isReject = res.data.revenueAccount.revenueAccountStatus.value == 3
						}
					})
					.catch(err => {
						this.dismissLoading()
						uni.navigateBack()
					})
			}
		}
	};
</script>

<style lang="less" scoped>
	@import url('../../common/detailForm.less');
</style>
