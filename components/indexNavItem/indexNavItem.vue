<template>
	<view class="index-item" @tap="onClick">
		<image :src="iconSrc" class="icon" @tap.stop="onClick"></image>
		<text>{{text}}</text>
	</view>
</template>
<script>
	export default {
		props:{
			text:String
		},
		data(){
			return {
				applySrc:'../../static/images/index-rec-icon.png',
				financeSrc:'../../static/images/index-finance-icon.png',
				revenueSrc:'../../static/images/index-revenue-icon.png',
				statementSrc:'../../static/images/index-statement-icon.png'
			}
		},
		computed:{
			iconSrc(){
				if(this.text == '审核采购单据' || this.text == '提交采购单据'){
					return this.applySrc
				}else if(this.text == '查看财务报表' || this.text == '查看财务情况'){
					return this.financeSrc
				}else if(this.text == '提交营收单据' || this.text == '接收营收单据'){
					return this.revenueSrc
				}else if(this.text == '特殊收支'){
					return this.revenueSrc
				}else if(this.text == '报表'){
					return this.statementSrc
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
	justify-content: center;
	background: #fff;
	margin-bottom: 20rpx;
	position: relative;
	width: 100%;
	.icon {
		width: 100rpx;
		height: 100rpx;
		margin-right: 40rpx;
	}
	.role-wrap {
		position: absolute;
		top: 0;
		right: 0;
		width: 100rpx;
		height: 40rpx;
		background: #f7d01c;
		color: #fff;
		text-align: center;
		font-size: 26rpx;
	}
}
</style>
