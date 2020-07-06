<template>
	<view class="selectCompany">
		<text class="title fc-3">请选择企业</text>
		<text class="c-item fc-6" v-for="item in tenants" :key="item.tenantId" @click="selCompany(item.tenantId)">{{item.enterpriseName}}</text>
	</view>
</template>
<script>
	export default {
		props:{
			tenants:Array
		},
		methods:{
			selCompany(id){
				this.$emit('selCompany',id)
			}
		}
	}
</script>

<style lang="less" scoped>
	.selectCompany{
		width: 600rpx;
		min-height: 300rpx;
		background: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 10rpx;
		padding-bottom: 20rpx;
		text{
			display: block;
			font-size: 30rpx;
		}
		.title{
			height:100rpx;
			line-height: 100rpx;
			font-size: 32rpx;
		}
		.c-item{
			height:100rpx;
			line-height: 100rpx;
			border-bottom: 1rpx solid #e5e5e5;
			font-size: 32rpx;
			width: 98%;
			text-align: center;
			&:last-child{
				border:none
			}
		}
	}
</style>
