<template>
	<view class="list-item" @tap="clickitem(statement)">
			<view class="inner-wrap">
				<image src="../../static/images/listItem.png" class="list-image"></image>
				<view class="ml-10 text-wrap">
					<text>{{getLineOneTitle(fromType)}}:{{statement.statementItemTitle}}</text>
					<view class="inner-wrap1">
						<text>{{getLineThreeTitle(fromType)}}:￥{{getLineThreeValue(fromType)}}</text>
						<text class="apply-time fc-9 ml-10">{{statement.createTime | fmtTime}}</text>
					</view>
				</view>
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
					return dateFtt('yyyy-MM-dd hh:mm:ss', val)
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
					return fmtMoney2(this.statement.fundsReceived)
				} else if (type == StatementTypes.mainBusinessExpenses) {
					return fmtMoney2(this.statement.amount)
				} else if (type == StatementTypes.otherExpenses) {
					return fmtMoney2(this.statement.amount)
				} else if (type == StatementTypes.otherIncome) {
					return fmtMoney2(this.statement.amount)
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

	.list-image {
		display: block;
		width: 60rpx;
		height: 60rpx;
	}
	.inner-wrap{
		width: 100%;
		display: flex;
		align-items: center;
	}
	.inner-wrap1{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.text-wrap{
		flex:1;
		text{
			display: block;
		}
	}
</style>
