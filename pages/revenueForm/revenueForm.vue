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
				<input class="input-text" placeholder="请输入申报金额" placeholder-class="place" v-model="detailForm.accountReceivable"
				 type="digit"  @blur="changeReceivable"/>
			</view>
			<view class="item-wrap">
				<text>实收款:</text>
				<input class="input-text" placeholder="请输入申报金额" placeholder-class="place" v-model="detailForm.fundsReceived" type="digit"
				 @blur="changeReceived"/>
			</view>
			<view class="item-wrap">
				<text>营收日期:</text>
				<view class="inner-wrap" @tap="onStartTimeTap(1)">
					<text v-if="!detailForm.revenueTime" class="fc-9">请选择营收日期</text>
					<text v-else>{{ detailForm.revenueTime}}</text>
					<text class="font-icon">&#xe662;</text>
				</view>
			</view>
			<view class="img-wrap fc-6">
				<text class="fc-6">凭据：</text>
				<imgList :list="detailForm.imgList" :isDisabled="isDisabled" @changeImgList="changeImgList" />
			</view>
			<view class="btn-wrap">
				<view class='btn save-btn' @tap="onSuspendTap">暂存</view>
				<view class='btn confirm-btn' @tap="onSubmitTap">提交</view>
			</view>
		</view>
		<timePicker :requestCode="timeCode" :show="showTimePicker" @onConfirm="timePickConfirm" @onCancel="showTimePicker = false"></timePicker>
	</view>
</template>

<script>
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
		resetDateFormat
	} from '@/libs/utils.js'
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
					imgList: []
				},
				categoryList,
				categoryIndex: 0,
				category: ""
			};
		},
		methods: {
			changeImgList(list) {
				console.log(list)
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
					uni.showLoading({
						title: '正在暂存'
					});
					this.submitApplyForm()
						.then(res => {
							console.log(res)
							uni.showToast({
								icon: 'none',
								title: "暂存成功"
							})
							uni.navigateBack()
						})
						.catch(err => {
							uni.hideLoading();
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
					uni.showLoading({
						title: '正在提交'
					});
					this.submitApplyForm()
						.then(res => {
							console.log(res)
							this.detailForm.revenueAccountId = res.data.revenueAccount.revenueAccountId
							return applyRevenue({
								revenueAccountId: this.detailForm.revenueAccountId
							})
						})
						.then(res => {
							uni.hideLoading();
							console.log(res)
							uni.showToast({
								icon: 'none',
								title: "提交成功"
							})
							uni.navigateBack()
						})
						.catch(err => {
							uni.hideLoading();
							console.log(err)
							uni.showToast({
								icon: 'none',
								title: "请求失败"
							})
						})
				}
			},
			// 返回报销单id（提交->申请报销）
			submitApplyForm() {
				let form = deepClone(this.detailForm)
				form.accountReceivable = Number(this.detailForm.accountReceivable)
				form.fundsReceived = Number(this.detailForm.fundsReceived)
				form.revenueTime = resetDateFormat(form.revenueTime)
				if (this.detailForm.revenueAccountId) {
					return updateRevenueForm(form.revenueAccountId, form)
				} else {
					return createRevenueAccounts(form)
				}
			},
			isFormFill() {
				return true
			},
			changeReceivable(e){
				const v = Number(ev.detail.value)
				this.$set(this.detailForm, 'accountReceivable', v.toFixed(2))
			},
			changeReceived(e){
				const v = Number(ev.detail.value)
				this.$set(this.detailForm, 'fundsReceived', v.toFixed(2))
			}
			
		},
		onLoad(option) {
			if (option.id) {
				revenueDetail(option.id)
					.then(res => {
						console.log(res)
						this.detailForm = res.data.revenueAccount
						if (this.detailForm.revenueTime) {
							this.detailForm.revenueTime = this.detailForm.revenueTime.split(' ')[0]
						}
					})
					.catch(err => {
						uni.navigateBack()
					})
			}
		}
	};
</script>

<style lang="less" scoped>
	@import url('../../common/detailForm.less');
</style>
