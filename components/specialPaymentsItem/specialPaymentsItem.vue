<template>
	<view class="list-item">
			<view class="main-wrap">
				<view class="item-wrap ">
					<text>名称：</text>
					<text>{{specialObj.specialAccountTitle}}</text>
				</view>
				<view class="item-wrap ">
					<text>分类：</text>
					<text>{{specialObj.specialAccountType | formatState}}</text>
				</view>
				<view class="item-wrap price-wrap">
					<view>
						<text>金额：</text>
						<text class="fc-r">￥{{specialObj.amount | formatMoney}}</text>
					</view>
					<text class="apply-time fc-6">{{specialObj.createTime | fmtTime}}</text>
				</view>
			</view>
			<image src="../../static/images/del.png" class="del" @tap.stop="onDel"></image>
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
		data(){
			return{
				specialObj:{}
			}
		},
		filters: {
			formatState(val) {
				if (val == 1) {
					return '其他收入'
				}
				return '其他支出'
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
			specialPayment:{
				handler(val) {
					if (val) {
						this.$set(this.specialObj, 'specialAccountTitle', val.specialAccountTitle)
						this.$set(this.specialObj, 'specialAccountType', val.specialAccountType)
						this.$set(this.specialObj, 'amount', val.amount)
						this.$set(this.specialObj, 'createTime', val.createTime)
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
