<template>
	<view class="list-item" @tap="clickitem(applyItem)">
			<view class="tag">
				<text>{{applyItem.expenseAccountStatus | formatState(fromType)}}</text>
			</view>
			<view class="main-wrap">
				<view class="item-wrap ">
					<text>名称：</text>
					<text>{{applyItem.expenseAccountTitle}}</text>
				</view>
				<view class="item-wrap ">
					<text>分类：</text>
					<text>{{applyItem.costCategoryName}}</text>
				</view>
				<view class="item-wrap price-wrap">
					<view>
						<text>报销金额：</text>
						<text class="fc-r">￥{{applyItem.amount | formatMoney}}</text>
					</view>
					<text class="apply-time fc-6">{{applyItem.createTime | fmtTime}}</text>
				</view>
			</view>
		<image src="../../static/images/del.png" class="del" @tap.stop="onDel(applyItem)" v-if="applyItem.expenseAccountStatus==1"></image>
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
			applyItem: Object,
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
					} else if (val == '1') {
						return '未提交'
					}
				} else if (type == 'buyer') {
					if (val == '1') {
						return '未提交'
					} else if (val == '2') {
						return '已提交'
					} else if (val == '3') {
						return '未通过'
					} else if (val == '4') {
						return '已通过'
					} else if (val == '5') {
						return '已打款'
					}
				} else if (type == 'teller') {
					if (val == '1') {
						return '未提交'
					} else if (val == '2') {
						return '已提交'
					} else if (val == '3') {
						return '已拒绝'
					} else if (val == '4') {
						return '待打款'
					} else if (val == '5') {
						return '已打款'
					}
				}else if (type == 'accountant') {
					return '已通过'
				}
			},
			fmtTime(val) {
				if (val) {
					return dateFtt('yyyy-MM-dd hh:mm:ss', new Date(val))
				}
			},
			formatMoney(val){
				return fmtMoney2(val)
			}
		},
		methods: {
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
	.main-wrap,.price-wrap{
		width: 100%;;
	}
	.main-wrap{
		margin-top: 20rpx;
	}
</style>
