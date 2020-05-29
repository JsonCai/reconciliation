<template>
	<view class="list-item">
			<view class="tag">
				<text>{{revenueObj.revenueAccountStatus | formatState(fromType)}}</text>
			</view>
			<view class="main-wrap">
				<view class="item-wrap ">
					<text>名称：</text>
					<text>{{revenueObj.revenueAccountTitle}}</text>
				</view>
				<view class="item-wrap price-wrap">
					<view>
						<text>应收金额：</text>
						<text class="fc-r">￥{{revenueObj.accountReceivable | formatMoney}}</text>
					</view>
				</view>
				<view class="item-wrap price-wrap">
					<view>
						<text>实收金额：</text>
						<text class="fc-r">￥{{revenueObj.fundsReceived | formatMoney}}</text>
					</view>
					<text class="apply-time fc-6">{{revenueObj.createTime | fmtTime}}</text>
				</view>
			</view>
			<image src="../../static/images/del.png" class="del" @tap.stop="onDel" v-if="revenueObj.revenueAccountStatus==1"></image>
	</view>
</template>

<script>
	import mixin from '../../libs/mixin/listItemMixin.js'
	import {
		dateFtt
	} from '../../libs/utils'
	import {
		fmtMoney2
	} from '@/libs/utils.js'
	export default {
		mixins: [mixin],
		props: {
			revenueItem: Object,
			fromType: String
		},
		data(){
			return{
				revenueObj:{}
			}
		},
		filters: {
			formatState(val, type) {
				if (type == 'revenue') {
					if (val == '1') {
						return '未提交'
					} else if (val == '2') {
						return '已提交'
					} else if (val == '3') {
						return '被拒收'
					} else if (val == '4') {
						return '被收款'
					}
				}else if (type == 'teller') {
					if (val == '1') {
						return '未提交'
					} else if (val == '2') {
						return '待收款'
					} else if (val == '3') {
						return '已拒收'
					} else if (val == '4') {
						return '已收款'
					}
				}
			},
			fmtTime(val) {
				return dateFtt('yyyy-MM-dd hh:mm:ss', new Date(val))
			},
			formatMoney(val){
				return fmtMoney2(val)
			}
		},
		methods: {
			onLongpress() {
				uni.showModal({
					title: '提示',
					content: '确定要删除？',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			onDel() {
				this.$emit('onDel')
			}
		},
		watch:{
			revenueItem:{
				handler(val) {
					if (val) {
						this.$set(this.revenueObj, 'revenueAccountStatus', val.revenueAccountStatus)
						this.$set(this.revenueObj, 'revenueAccountTitle', val.revenueAccountTitle)
						this.$set(this.revenueObj, 'accountReceivable', val.accountReceivable)
						this.$set(this.revenueObj, 'fundsReceived', val.fundsReceived)
						this.$set(this.revenueObj, 'createTime', val.createTime)
					}
				},
				immediate: true
			}
		}
	}
</script>

<style lang="less">
	@import url('../../common/list-item.less');
	.main-wrap,.price-wrap{
		width: 100%;;
	}
	.main-wrap{
		margin-top: 20rpx;
	}
</style>
