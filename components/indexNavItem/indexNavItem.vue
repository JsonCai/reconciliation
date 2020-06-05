<template>
	<view class="index-item" @tap="onClick">
		<view class="nav-inner-wrap">
			<view class="img-wrap">
				<image :src="iconSrc" class="icon" @tap.stop="onClick"></image>
			</view>
			<text>{{text}}</text>
		</view>
		<view class="role-wrap">{{role}}</view>
	</view>
</template>
<script>
	export default {
		props:{
			text:String,
			role:String
		},
		data(){
			return {
				arrowSrc:'../../static/images/arrow.png',
				applySrc:'../../static/images/index-rec-icon.png',
				financeSrc:'../../static/images/index-finance-icon.png',
				revenueSrc:'../../static/images/index-revenue-icon.png',
				statementSrc:'../../static/images/index-statement-icon.png',
				tsSrc:'../../static/images/ts.png'
			}
		},
		computed:{
			iconSrc(){
				if(this.text == '审核报销单据' || this.text == '提交报销单据' || this.text == '确认查看报销单据' || this.text == '打款报销单据'){
					return this.applySrc
				}else if(this.text == '查看财务报表' || this.text == '查看财务情况' || this.text == '查看财务'){
					return this.financeSrc
				}else if(this.text == '提交营收单据' || this.text == '接收营收单据' || this.text == '确认查看营收单据'){
					return this.revenueSrc
				}else if(this.text == '操作特殊单据'){
					return this.tsSrc
				}
			}
		},
		methods:{
			onClick(){
				this.$emit('handleClick')
			}
		}
	}
</script>
<style lang="less">
.index-item {
	height: 200rpx;
	display: flex;
	align-items: center;
	background: #fff;
	margin-bottom: 20rpx;
	position: relative;
	.nav-inner-wrap{
		display: flex;
		align-items: center;
		margin-left: 200rpx;
	}
	.img-wrap{
		width:150rpx;
	}
	.icon {
		width: 100rpx;
		height: 100rpx;
		margin-right: 40rpx;
	}
	.role-wrap {
		position: absolute;
		top: 0;
		left: 0;
		height: 40rpx;
		background: #f7d01c;
		color: #fff;
		text-align: center;
		font-size: 26rpx;
		padding: 0 10rpx;
	}

}
</style>
