<template>
	<view class="container bg-f5">
		<view class="content-wrap">
			<view class="title item-wrap">
				<image src="../../static/images/apply.png" class="icon-wallet mr-20"></image>
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
				<text class="fc-3">{{ detailForm.revenueTime|fmtDate}}</text>
			</view>
			<view class="img-wrap fc-6 mt-20" v-if="detailForm.revenueVoucherUrls && detailForm.revenueVoucherUrls.length">
				<text class="fc-6">凭据：</text>
				<imgList :list="detailForm.revenueVoucherUrls" :isDisabled="true" />
			</view>
			<view class="item-wrap">
				<text class="fc-6">描述:</text>
				<text class="fc-3 ml-20" >
					{{detailForm.revenueAccountDescription}}
				</text>
			</view>
			<view class="item-wrap" v-if="detailForm.revenuePerson">
				<text class="fc-6">营业员:</text>
				<text class="fc-3">{{detailForm.revenuePerson.employeeName}}</text>
			</view>
			<view class="item-wrap">
				<text class="fc-6">提交日期:</text>
				<text class="fc-3">{{ detailForm.createTime}}</text>
			</view>
			<view class="item-wrap" @tap="showHistory" v-if="this.approvals && this.approvals.length">
				<text>审批意见:</text>
				<text>查看历史</text>
			</view>
			<view class="item-wrap" v-if="detailForm.revenueAccountStatus&&detailForm.revenueAccountStatus.value == 2 ">
				<text class="fc-6">是否通过:</text>
				<radio-group @change="radioChange">
					<view>
						<label class="radio">
							<radio color="#06bebe" value="2" />
							<text class="r-text fc-3" style="margin-right: 10rpx;">通过</text>
						</label>
						<label class="radio">
							<radio color="#06bebe" value="1" />
							<text class="r-text fc-3">拒绝</text>
						</label>
					</view>
				</radio-group>
			</view>
			<view class="item-wrap" v-if="detailForm.revenueAccountStatus&&detailForm.revenueAccountStatus.value == 2">
				<text class="fc-6">收款意见</text>
				<input placeholder="收款意见" class="input-text fc-3" @input="changeReason" v-model="revenueParams.receiptOpinion" />
			</view>
			<view class="big-btn-wrap" v-if="detailForm.revenueAccountStatus&&detailForm.revenueAccountStatus.value == 2">
				<view class='btn confirm-btn' @tap="onPassTap">保存</view>
			</view>
		</view>
		<loading :isShow='isShowLoading'></loading>
	</view>
</template>

<script>
	import imgList from '@/components/imgList/imgList.vue'
	import {
		revenueDetail,
		receiveRevenueAccounts
	} from '@/api/revenue/revenue.js'
	import {
		getRevenueStateStr,
		REFRESH_DELAYED
	} from '@/config/config.js'
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
			}
		},
		data() {
			return {
				detailForm: {},
				revenueParams: {},
				approvals: []
			}
		},
		methods: {
			showHistory() {
				uni.navigateTo({
					url: '../reasonList/reasonList'
				})
				uni.$emit('showHistory', this.approvals)
			},
			onValidate() {
				if (!this.revenueParams.receiptActionType) {
					uni.showToast({
						title: '请选择是否通过',
						icon: 'none'
					})
					return false
				}
				if (!this.revenueParams.receiptOpinion) {
					uni.showToast({
						title: '请填写收款意见',
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
								receiveRevenueAccounts(this.revenueParams)
									.then(res => {
										console.log(res)
										uni.showToast({
											icon: 'none',
											title: '操作成功'
										})
										setTimeout(() => {
											uni.navigateBack()
											uni.$emit('reload')
											this.dismissLoading()
										}, REFRESH_DELAYED)
									}).catch(err => {
										this.dismissLoading()
										console.log(err)
										uni.showToast({
											icon: 'none',
											title: '操作失败'
										})
									})
							}
						}
					});
				}
			},
			changeReason(ev) {
				this.$set(this.revenueParams, 'receiptOpinion', ev.target.value)
			},
			radioChange(ev) {
				console.log(ev.target.value)
				this.$set(this.revenueParams, 'receiptActionType', Number(ev.target.value))
				if(value == 2){
					this.$set(this.revenueParams, 'receiptOpinion', "同意")
				}else{
					this.$set(this.revenueParams, 'receiptOpinion', "不同意")
				}
			}
		},
		onLoad(option) {
			console.log(option)
			this.revenueParams.revenueAccountId = option.id
			this.showLoading()
			revenueDetail(option.id)
				.then(res => {
					this.dismissLoading()
					console.log(res)
					this.$set(this, "detailForm", res.data.revenueAccount)
					this.detailForm.fundsReceived = fmtMoney2(this.detailForm.fundsReceived)
					this.detailForm.accountReceivable = fmtMoney2(this.detailForm.accountReceivable)
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
	@import url('../../common/detailForm.less');
</style>
