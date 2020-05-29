<template>
	<view class="container bg-f5">
		<view class="content-wrap">
			<view class="title item-wrap">
				<image src="../../static/images/apply.png" class="icon-wallet mr-20"></image>
				<text class="title-text">订单信息</text>
			</view>
			<view class="item-wrap require1">
				<text class="item-label">名称:</text>
				<input class="input-text" placeholder="请输入名称" placeholder-class="place" v-model.trim="detailForm.expenseAccountTitle" />
			</view>
			<view class="item-wrap require1">
				<text>分类:</text>
				<picker :value="categoryIndex" :disabled="isDisabled" mode='selector' range-key="costCategoryName" :range="categoryList"
				 @change="onCatagory">
					<view class="picker">
						<text v-if="category">{{category}}</text>
						<text class="fc-9" v-else>请选择分类</text>
					</view>
				</picker>
			</view>
			<view class="item-wrap require1">
				<text>申报金额:</text>
				<input class="input-text" placeholder="请输入申报金额" type="digit" placeholder-class="place" v-model="tempamount" />
			</view>
			<view class="item-wrap require1">
				<text>申报日期:</text>
				<view class="inner-wrap" @tap="onStartTimeTap(1)">
					<text v-if="!detailForm.expenseTime" class="fc-9">请选择申报日期</text>
					<text v-else>{{ detailForm.expenseTime}}</text>
				</view>
			</view>
			<view class="img-wrap fc-6 mt-20">
				<text class="fc-6">凭据：</text>
				<imgList :list="detailForm.imgList" :isDisabled="isDisabled" @changeImgList="changeImgList" />
			</view>
			<view class="item-wrap" @tap="showHistory" v-if="approvals && approvals.length">
				<text>审批意见</text>
				<text>查看历史</text>
			</view>

			<view class="big-btn-wrap" v-if="approvals && approvals.length">
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
	import timePicker from '@/components/timePicker/timePicker';
	import imgList from '@/components/imgList/imgList.vue'
	import {
		createApplyForm,
		applyExpense,
		updateApplyForm,
		applyDetail
	} from '../../api/apply/apply.js'
	import {
		getCategoryList
	} from '../../api/category/category.js'
	import {
		deepClone,
		resetDateFormat,
		dateFtt,
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
				tempamount: '',
				showTimePicker: false,
				timeCode: 0,
				isDisabled: false,
				detailForm: {
					imgList: []
				},
				categoryList: [],
				categoryIndex: 0,
				category: "",
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
				this.detailForm.imgList = list
			},
			onStartTimeTap(code) {
				this.timeCode = code;
				this.showTimePicker = true;
			},
			changeName(val) {},
			timePickConfirm(time) {
				this.showTimePicker = false;
				if (time.code == 1) {
					this.$set(this.detailForm, 'expenseTime', time.date);
				}
			},
			onCatagory(value) {
				const idex = value.detail.value
				const category = this.categoryList[idex]
				this.category = category.costCategoryName
				this.detailForm.costCategoryId = category.costCategoryId
			},
			onResubmitTap() {
				if (this.onValidate()) {
					uni.showModal({
						title: '提示',
						content: '是否确认重新提交?',
						success: res => {
							if (res.confirm) {
								this.showLoading()
								this.submitApplyForm()
									.then(res => {
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
			onSuspendTap() {
				if (this.onValidate()) {
					this.showLoading()
					this.submitApplyForm()
						.then(res => {
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
							uni.showToast({
								icon: 'none',
								title: "请求失败"
							})
						})
				}
			},
			onSubmitTap() {
				if (this.onValidate()) {
					uni.showModal({
						title: '提示',
						content: '是否确认提交?',
						success: res => {
							if (res.confirm) {
								this.showLoading()
								this.submitApplyForm()
									.then(res => {
										this.detailForm.expenseAccountId = res.data.expenseAccount.expenseAccountId
										return applyExpense({
											expenseAccountId: this.detailForm.expenseAccountId
										})
									})
									.then(res => {

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
										console.log(err)
										this.dismissLoading()
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
			// 返回报销单id（提交->申请报销）
			submitApplyForm() {
				let form = deepClone(this.detailForm)
				form.amount = accMul(Number(this.tempamount), 100)
				form.expenseTime = resetDateFormat(form.expenseTime)
				console.log(form)
				if (this.detailForm.expenseAccountId) {
					return updateApplyForm(this.detailForm.expenseAccountId, form)
				} else {
					console.log(form)
					return createApplyForm(form)
				}
			},
			onValidate() {
				if (!this.detailForm.expenseAccountTitle) {
					uni.showToast({
						title: '请输入报销单名称',
						icon: 'none'
					})
					return false
				}
				if (!this.detailForm.costCategoryId) {
					uni.showToast({
						title: '请填选择分类',
						icon: 'none'
					})
					return false
				}
				if (!this.tempamount) {
					uni.showToast({
						title: '请填写申报金额',
						icon: 'none'
					})
					return false
				}
				if (!this.detailForm.expenseTime) {
					uni.showToast({
						title: '请填选报销时间',
						icon: 'none'
					})
					return false
				}
				return true
			},
		},
		onLoad(options) {
			//因为修改的是data里面的绑定数据，所以返回后页面数据会直接显示修改后的
			if (options.id) {
				this.showLoading()
				applyDetail(options.id).then(res => {
					this.dismissLoading()
					// this.detailForm = res.data.expenseAccount
					this.approvals = res.data.expenseAccount.approvals
					this.detailForm.expenseAccountId = res.data.expenseAccount.expenseAccountId
					this.detailForm.expenseAccountTitle = res.data.expenseAccount.expenseAccountTitle
					this.tempamount = fmtMoney2(res.data.expenseAccount.amount)
					if (res.data.expenseAccount.costCategory) {
						this.category = res.data.expenseAccount.costCategory.costCategoryName
						this.detailForm.costCategoryId = res.data.expenseAccount.costCategory.costCategoryId
					}
					this.detailForm.amount = res.data.expenseAccount.amount
					if (res.data.expenseAccount.expenseTime) {
						this.detailForm.expenseTime = res.data.expenseAccount.expenseTime.split(' ')[0]
					}
				}).catch(err => {
					this.dismissLoading()
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 500)
				})
			}
			getCategoryList()
				.then(res => {
					this.categoryList = res.data.costCategories
				})
				.catch(err => {

				})
		}
	};
</script>

<style lang="less" scoped>
	@import url('../../common/detailForm.less');
</style>
