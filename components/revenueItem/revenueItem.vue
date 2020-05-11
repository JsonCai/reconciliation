<template>
	<view class="list-item" @tap="clickitem(applyItem)">
		<view class="main_item_content ">
			<view class="tag">
				<text>{{revenueItem.expenseAccountStatus | formatState(fromType)}}</text>
			</view>
			<view class="main-wrap">
				<view class="item-wrap ">
					<text>名称：</text>
					<text>{{revenueItem.expenseAccountTitle}}</text>
				</view>
				<view class="item-wrap price-wrap">
					<view>
						<text>应收金额：</text>
						<text class="fc-r">￥{{revenueItem.accountReceivable}}</text>
					</view>
				</view>
				<view class="item-wrap price-wrap">
					<view>
						<text>实收金额：</text>
						<text class="fc-r">￥{{revenueItem.fundsReceived}}</text>
					</view>
					<text class="apply-time fc-6">{{revenueItem.createTime | fmtTime}}</text>
				</view>
			</view>
			<image class="arrow" :src="arrowSrc"></image>
		</view>
	</view>
</template>

<script>
	import mixin from '../../libs/mixin/listItemMixin.js'
	import {
		dateFtt
	} from '../../libs/utils'
	export default {
		mixins: [mixin],
		props: {
			revenueItem: Object,
			fromType: String
		},
		filters: {
			formatState(val, type) {
				if (type == 'boss') {
					if (val == '2') {
						return '待审批'
					} else if (val == '2') {
						return '已提交'
					} else if (val == '3') {
						return '已拒绝'
					} else if (val == '4') {
						return '已通过'
					}
				}

			},
			fmtTime(val) {
				return dateFtt('yyyy-MM-dd hh:mm:ss', new Date(val))
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
			}
		}
	}
</script>

<style lang="less">
	@import url('../../common/list-item.less');
</style>
