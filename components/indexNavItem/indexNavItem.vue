<template>
	<view class="index-item" @click="handleClick">
		<image :src="iconSrc" class="icon"></image>
		<text>{{text}}</text>
		<view class="role-wrap"><text class="text">{{roleName}}</text></view>
	</view>
</template>
<script>
	export default {
		props:{
			text:String,
			roleName:String
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
				if(this.text == '报销'){
					return this.applySrc
				}else if(this.text == '财务'){
					return this.financeSrc
				}else if(this.text == '营收'){
					return this.revenueSrc
				}else if(this.text == '营收'){
					return this.revenueSrc
				}else if(this.text == '报表'){
					return this.statementSrc
				}
			}
		},
		methods:{
			handleClick(){
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
