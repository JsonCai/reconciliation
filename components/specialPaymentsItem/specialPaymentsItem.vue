<template>
	<view class="list-item" @tap="clickitem(specialPayment)">
		<view class="main_item_content ">
			<view class="main-wrap">
				<view class="item-wrap ">
					<text>名称：</text>
					<text>{{specialPayment.specialAccountTitle}}</text>
				</view>
				<view class="item-wrap ">
					<text>分类：</text>
					<text>{{specialPayment.specialAccountType | formatState}}</text>
				</view>
				<view class="item-wrap price-wrap">
					<view>
						<text>金额：</text>
						<text class="fc-r">￥{{specialPayment.amount | formatMoney}}</text>
					</view>
					<text class="apply-time fc-6">{{specialPayment.accountTime | fmtTime}}</text>
				</view>
			</view>
			<image class="arrow" :src="arrowSrc"></image>
			<image src="../../static/images/del.png" class="del" @tap.stop="onDel(specialPayment)"></image>
		</view>
	</view>
</template>

<script>
	import mixin from '../../libs/mixin/listItemMixin.js'
	import {
		dateFtt,fmtMoney2
	} from '../../libs/utils'
	export default {
		mixins: [mixin],
		props: {
			specialPayment: Object,
			fromType: String
		},
		filters: {
			formatState(val, type) {
				if (type == 1) {
					return '其他收入'
				}
				return '其他支出'
			},
			fmtTime(val) {
				console.log(val)
				if (val) {
					return dateFtt('yyyy-MM-dd hh:mm:ss', new Date(val))
				}
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
			onDel(item) {
				this.$emit('onDel', item)
			},
			clickitem(item) {
				this.$emit('clickItem', item)
			}
		}
	}
</script>

<style lang="less">
	@import url('../../common/list-item.less');

	.main_item_content {
		padding-top: 20rpx;
	}
</style>
