<template>
	<view class="container bg-f5">
		<view class="content-wrap">
			<view class="title item-wrap">
				<image src="../../static/images/apply.png" class="icon-wallet mr-20"></image>
				<text class="title-text">订单信息</text>
			</view>
			<view class="item-wrap">
				<text>名称:</text>
				<text>{{ detailForm.revenueAccountTitle}}</text>
			</view>
			<view class="item-wrap">
				<text>应收款:</text>
				<text>{{detailForm.accountReceivable}}</text>
			</view>
			<view class="item-wrap">
				<text>实收款:</text>
				<text>{{detailForm.fundsReceived}}</text>
			</view>
			<view class="item-wrap">
				<text>营收日期:</text>
				<text>{{ detailForm.revenueTime|fmtDate}}</text>
			</view>
			<view class="img-wrap fc-6" v-if="detailForm.revenueVoucherUrls">
				<text class="fc-6">凭据：</text>
				<imgList :list="detailForm.revenueVoucherUrls" :isDisabled="true" />
			</view>
			<view class="item-wrap" v-if="detailForm.revenuePerson">
				<text>营业员:</text>
				<text>{{detailForm.revenuePerson.employeeName}}</text>
			</view>
			<view class="item-wrap">
				<text>提交日期:</text>
				<text>{{ detailForm.createTime}}</text>
			</view>
			<view class="item-wrap" v-if="detailForm.revenueAccountStatus&&detailForm.revenueAccountStatus.value == 2 ">
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
			<view class="item-wrap" v-if="detailForm.revenueAccountStatus&&detailForm.revenueAccountStatus.value == 2">
				<text>收款意见</text>
				<input placeholder="收款意见" class="input-text" @input="changeReason" v-model="revenueParams.receiptOpinion" />
			</view>
			<view class="big-btn-wrap" v-if="detailForm.revenueAccountStatus&&detailForm.revenueAccountStatus.value == 2">
				<view class='btn confirm-btn' @tap="onPassTap">保存</view>
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
					<text>{{item.createTime|fmtDate}}</text>
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
		revenueDetail,
		receiveRevenueAccounts
	} from '@/api/revenue/revenue.js'
	import getRevenueStateStr from '@/config/config.js'
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
				revenueParams:{}
			}
		},
		methods: {
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
					console.log(this.revenueParams)
					receiveRevenueAccounts(this.revenueParams)
					.then(res => {
						console.log(res)
						uni.navigateBack()
						uni.$emit('reload')
					}).catch(err => console.log(err))
				}
			},
			changeReason(ev) {
				this.$set(this.revenueParams, 'receiptOpinion', ev.target.value)
			},
			radioChange(ev) {
				console.log(ev.target.value)
				this.$set(this.revenueParams, 'receiptActionType', Number(ev.target.value))
			}
		},
		onLoad(option) {
			console.log(option)
			this.revenueParams.revenueAccountId = option.id
			revenueDetail(option.id)
				.then(res => {
					console.log(res)
					this.$set(this, "detailForm", res.data.revenueAccount)
				})
				.catch(err => {
					console.log(err)
					uni.navigateBack()
				})
		}
	}
</script>

<style lang="less" scoped>
	@import url('../../common/detailForm.less');
</style>
