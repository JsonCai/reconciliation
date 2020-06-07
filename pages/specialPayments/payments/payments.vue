<template>
	<view class="container bg-f5">
		<view class="content-wrap">
			<view class="title item-wrap">
				<image src="../../../static/images/apply.png" class="icon-wallet mr-20"></image>
				<text class="title-text">订单信息</text>
			</view>
			<view class="item-wrap">
				<text class="fc-6">名称:</text>
				<input :disabled="detailForm.specialAccountId" class="input-text fc-3" placeholder="请输入名称" placeholder-class="place"
				 v-model="detailForm.specialAccountTitle" />
			</view>
			<view class="item-wrap">
				<text class="fc-6">分类:</text>
				<picker :value="specialTypeIndex" :disabled="isDisabled" range-key="name" :range="specialType" @change="onCatagory">
					<view class="picker">
						<text v-if="specialTypeName" class="fc-3">{{specialTypeName}}</text>
						<text v-else class="fc-9">请选择分类</text>
					</view>
				</picker>
			</view>
			<view class="item-wrap">
				<text class="fc-6">金额:</text>
				<input :disabled="detailForm.specialAccountId" class="input-text fc-3" placeholder="请输入金额" placeholder-class="place"
				 v-model="detailForm.amount" type="digit" @blur="changeAmount" />
			</view>
			<view class="item-wrap">
				<text class="fc-6">日期:</text>
				<view class="inner-wrap" @tap="onStartTimeTap(1)">
					<text v-if="!detailForm.accountTime" class="fc-9">请选择申报日期</text>
					<text v-else class="fc-3">{{ detailForm.accountTime}}</text>
				</view>
			</view>
			<view class="img-wrap fc-6 mt-20" v-if="(detailForm.specialAccountId&&detailForm.voucherUrls&&detailForm.voucherUrls.length)||!detailForm.specialAccountId">
				<text class="fc-6">凭据：</text>
				<imgList :list="detailForm.voucherUrls" :isDisabled="detailForm.specialAccountId" @changeImgList="changeImgList" />
			</view>
			<view class="textarea-wrap">
				<text class="fc-6">描述:</text>
				<textarea placeholder="请输入描述" 　v-model.trim="detailForm.specialAccountDescription" class="fc-3 ml-20" />
				</view>
			<view class="btn-wrap" v-if="!detailForm.specialAccountId">
				<view class='btn confirm-btn' @tap="onPassTap">保存</view>
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
		specialType
	} from '../../../config/config.js'

	import timePicker from '@/components/timePicker/timePicker';
	import imgList from '@/components/imgList/imgList.vue'
	import {
		createSpecialAccounts,
		updateSpecialForm,
		getSpecialPaymentsDetail
	} from '../../../api/specailPayments/specialPayments.js'
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
					voucherUrls: []
				},
				specialType,
				specialTypeIndex: 0,
				specialTypeName: ""
			};
		},
		methods: {
			changeImgList(list) {
				this.detailForm.voucherUrls = list
			},
			onStartTimeTap(code) {
				this.timeCode = code;
				this.showTimePicker = true;
			},
			changeName(val) {},
			timePickConfirm(time) {
				this.showTimePicker = false;
				if (time.code == 1) {
					this.$set(this.detailForm, 'accountTime', time.date);
				}
			},
			onCatagory(value) {
				const specialType = this.specialType[value.detail.value]
				this.specialTypeName = specialType.name
				this.detailForm.specialAccountType = specialType.type
			},
			onPassTap() {
				if (this.isFormFill()) {
					uni.showModal({
						title: '提示',
						content: '是否确认提交?',
						success: res => {
							if (res.confirm) {
								this.showLoading()
								this.submitApplyForm()
									.then(res => {
										console.log(res)
										uni.showToast({
												icon: 'none',
												title: "创建成功"
										})
										setTimeout(() => {
											uni.$emit("reload")
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
			// 返回报销单id（提交->申请报销）
			submitApplyForm() {
				let form = deepClone(this.detailForm)
				form.amount = accMul(Number(this.detailForm.amount), 100)
				form.accountTime = resetDateFormat(form.accountTime)
				return uploadImage(this.detailForm.voucherUrls,this.$store.state.cid)
				.then(res=>{
					form.voucherUrls = res
					if (this.detailForm.expenseAccountId) {
						return updateSpecialForm(form.expenseAccountId, form)
					} else {
						return createSpecialAccounts(form)
					}
				})
			},
			isFormFill() {
				if (!this.detailForm.specialAccountTitle) {
					uni.showToast({
						title: '请输入名称',
						icon: 'none'
					})
					return false
				}
				if (!this.detailForm.specialTypeName) {
					uni.showToast({
						title: '请选择分类',
						icon: 'none'
					})
					return false
				}
				if (!this.detailForm.amount) {
					uni.showToast({
						title: '请输入金额',
						icon: 'none'
					})
					return false
				}
				if (!this.detailForm.accountTime) {
					uni.showToast({
						title: '请选择申报日期',
						icon: 'none'
					})
					return false
				}
				if (!(this.detailForm.voucherUrls&&this.detailForm.voucherUrls.length)) {
					uni.showToast({
						title: '请添加凭证',
						icon: 'none'
					})
					return false
				}
				return true
			},
			changeAmount(e) {
				const v = Number(e.detail.value)
				this.$set(this.detailForm, 'amount', v.toFixed(2))
			}
		},
		onLoad(option) {
			if (option.id) {
				this.showLoading()
				getSpecialPaymentsDetail(option.id)
					.then(res => {
						this.dismissLoading()
						console.log(res)
						this.detailForm = res.data.specialAccount
						if (this.detailForm.amount) {
							this.detailForm.amount = fmtMoney2(this.detailForm.amount)
						}
						if (this.detailForm.accountTime) {
							this.detailForm.accountTime = this.detailForm.accountTime.split(' ')[0]
						}
						if (this.detailForm.specialAccountType) {
							if (this.detailForm.specialAccountType.value == 1) {
								this.specialTypeName = "其他收入"
							} else {
								this.specialTypeName = "其他支出"
							}
						}
					})
					.catch(err => {
						this.dismissLoading()
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
	};
</script>

<style lang="less" scoped>
	@import url('@/common/detailForm.less');
	.btn-wrap {
		justify-content: center;
		.btn {
			width: 60%;
		}
		margin-top: 100rpx;
		margin-bottom: 50rpx;
	}
</style>
