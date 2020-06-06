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
				<text>￥{{detailForm.amount | formatMoney}}</text>
			</view>
			<view class="item-wrap">
				<text>报销日期:</text>
				<text>{{detailForm.expenseTime | fmtDate}}</text>
			</view>
			<view class="img-wrap fc-6 mt-20" v-if="detailForm.expenseVoucherUrls&&detailForm.expenseVoucherUrls.length">
				<text class="fc-30 fc-6">凭据：</text>
				<imgList :list="detailForm.expenseVoucherUrls" :isDisabled="true" />
			</view>
			<view class="item-wrap">
				<text>申请日期:</text>
				<text>{{detailForm.applyTime}}</text>
			</view>
			<view class="item-wrap" v-if="detailForm.applyPerson">
				<text>申请人:</text>
				<text>{{detailForm.applyPerson.employeeName}}</text>
			</view>
			<view class="item-wrap" v-if="detailForm.expenseAccountStatus.value == 2 ">
				<text>是否通过:</text>
				<radio-group @change="radioChange">
					<view>
						<label class="radio">
							<radio color="#06bebe" value="2" />
							<text class="r-text" style="margin-right: 10rpx;">通过</text>
						</label>
						<label class="radio">
							<radio color="#06bebe" value="1" />
							<text class="r-text">拒绝</text>
						</label>
					</view>
				</radio-group>
			</view>
			<view class="item-wrap" v-if="detailForm.expenseAccountStatus.value == 2">
				<text>审批意见</text>
				<input placeholder="审批意见" class="input-text" @input="changeReason" v-model="applyParams.approvalOpinion" />
			</view>
			<view class="item-wrap" @tap="showHistory" v-if="detailForm.approvals && detailForm.approvals.length">
				<text>审批意见</text>
				<text>查看历史</text>
			</view>
			<view class="big-btn-wrap" v-if="detailForm.expenseAccountStatus.value == 2">
				<view class='btn confirm-btn' @tap="onPassTap">保存</view>
			</view>
		</view>
		<loading :isShow='isShowLoading'></loading>
		<uni-popup ref="popup" type="center">
			<reasonList :approvals="approvals" />
		</uni-popup>
	</view>
</template>

<script>
	import imgList from '@/components/imgList/imgList.vue'
	import {
		dateFtt
	} from '@/libs/utils'
	import {
		applyDetail,
		approveExpense
	} from '@/api/apply/apply.js'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import {
		fmtMoney2
	} from '@/libs/utils'
	import {
		REFRESH_DELAYED
	} from '@/config/config.js'
	export default {
		components: {
			imgList,
			uniPopup,
		},
		data() {
			return {
				approvals: [],
				detailForm: {
					expenseAccountStatus: {}
				},
				applyParams: {}
			}
		},
		methods: {
			showHistory() {
				uni.navigateTo({
					url: '/pages/reasonList/reasonList'
				})
				uni.$emit('showHistory', this.detailForm.approvals)
			},
			onValidate() {
				if (!this.applyParams.approvalType) {
					uni.showToast({
						title: '请选择是否通过',
						icon: 'none'
					})
					return false
				}
				if (!this.applyParams.approvalOpinion) {
					uni.showToast({
						title: '请填写审批意见',
						icon: 'none'
					})
					return false
				}
				return true
			},
			onPassTap() {
				if (this.onValidate()) {
					uni.showModal({
						title: '提示',
						content: '是否确认审核?',
						success: res => {
							if (res.confirm) {
								this.showLoading()
								approveExpense(this.applyParams).then(res => {
									uni.showToast({
										title: '审批成功',
										icon: 'none'
									})
									setTimeout(() => {
										this.dismissLoading()
										uni.$emit('reload')
										uni.navigateBack()
									}, REFRESH_DELAYED)

								}).catch(err => {
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
			changeReason(ev) {
				this.$set(this.applyParams, 'approvalOpinion', ev.target.value)
			},
			radioChange(ev) {
				console.log(ev.target.value)
				let value =  Number(ev.target.value)
				this.$set(this.applyParams, 'approvalType', value)
				if(value == 2){
					this.$set(this.applyParams, 'approvalOpinion', "同意")
				}else{
					this.$set(this.applyParams, 'approvalOpinion', "不同意")
				}
			}
		},
		filters: {
			fmtDate(val) {
				if (val) {
					return val.split(' ')[0]
				}
			},
			formatMoney(val) {
				return fmtMoney2(val)
			}
		},
		onLoad(option) {
			if (option.id) {
				this.applyParams.expenseAccountId = option.id
			}
			this.showLoading()
			applyDetail(option.id)
				.then(res => {
					this.dismissLoading()
					if (res.code == '0') {
						this.detailForm = res.data.expenseAccount
						console.log(this.detailForm)
						this.approvals = this.detailForm.approvals
					}

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
	@import url('../../../common/detailForm.less');

	radio-group {
		display: flex;
		align-items: center;
	}

	.r-text {
		position: relative;
		top: 4rpx;
	}

	.reasonInput {
		text-align: right;
	}
</style>
