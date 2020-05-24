<template>
	<view class="list-item" @tap="clickitem(statement)">
		<view class="main_item_content ">
			<view class="main-wrap">
				<view class="item-wrap ">
					<text>{{getLineOneTitle(fromType)}}:</text>
					<text>{{statement.statementItemTitle}}</text>
				</view>
				<view class="item-wrap " v-if="fromType == StatementTypes.mainBusinessIncome">
					<text>{{getLineTwoTitle(fromType)}}:</text>
					<text>{{getLineTwoValue(fromType)}}</text>
				</view>
				<view class="item-wrap price-wrap">
					<text>{{getLineThreeTitle(fromType)}}:{{getLineThreeValue(fromType)}}</text>
					<text class="apply-time fc-6">{{statement.createTime | fmtTime}}</text>
				</view>
			</view>
			<image class="arrow" :src="arrowSrc"></image>
		</view>
	</view>
</template>

<script>
	import mixin from '../../libs/mixin/listItemMixin.js'
	import {
		dateFtt,
		fmtMoney2
	} from '../../libs/utils'
	import {
		StatementTypes
	} from '@/config/config.js'
	export default {
		mixins: [mixin],
		props: {
			statement: Object,
			fromType: Number
		},
		data() {
			return {
				StatementTypes
			}
		},
		filters: {
			formatState(type) {
				if (tyep == StatementTypes.mainBusinessIncome) {
					return '主营收入'
				} else if (type == StatementTypes.mainBusinessExpenses) {
					return '主营支出'
				} else if (type == StatementTypes.otherExpenses) {
					return '其他支出'
				} else if (type == StatementTypes.otherIncome) {
					return '其他收入'
				}
				return ''
			},
			fmtTime(val) {
				if (val) {
					return dateFtt('yyyy-MM-dd hh:mm:ss', new Date(val))
				}
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
			getLineOneTitle(type) {
				if (type == StatementTypes.mainBusinessIncome) {
					return '款项'
				} else if (type == StatementTypes.mainBusinessExpenses) {
					return '款项'
				} else if (type == StatementTypes.otherExpenses) {
					return '款项'
				} else if (type == StatementTypes.otherIncome) {
					return '款项'
				}
				return '款项'
			},
			getLineTwoTitle(type) {
				if (type == StatementTypes.mainBusinessIncome) {
					return '应收款'
				}
				return ''
			},
			getLineTwoValue(type) {
				console.log(type)
				if (type == StatementTypes.mainBusinessIncome) {
					return this.statement.accountReceivable
				}
				return ''
			},
			getLineThreeTitle(type) {
				if (type == StatementTypes.mainBusinessIncome) {
					return '实收款'
				} else if (type == StatementTypes.mainBusinessExpenses) {
					return '支出款'
				} else if (type == StatementTypes.otherExpenses) {
					return '金额'
				} else if (type == StatementTypes.otherIncome) {
					return '金额'
				}
				return ''
			},
			getLineThreeValue(type) {
				if (type == StatementTypes.mainBusinessIncome) {
					return this.statement.fundsReceived
				} else if (type == StatementTypes.mainBusinessExpenses) {
					return this.statement.amount
				} else if (type == StatementTypes.otherExpenses) {
					return this.statement.amount
				} else if (type == StatementTypes.otherIncome) {
					return this.statement.amount
				}
				return ''
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
