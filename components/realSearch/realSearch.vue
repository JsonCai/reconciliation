<template>
	<view class="container">
	    <view class="header">
	        <view class="search-container">
				<text class="test">&#xe614;</text>
	            <input v-model.trim="keyword" 
				@confirm="onConfirm" placeholder-class='in-bar'
				confirm-type="search"
				 placeholder='输入关键字搜索' class='bar' />
	            <text class="inner-canel" @tap="cancelKeyword">&#xe635;</text>
	        </view>
	        <view @tap="onCancel" class='cancel'>取消</view>
	    </view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				keyword:'',
				searching:false,
				height:'400px'
			}
		},
		methods:{
			cancelKeyword(){
				this.keyword = ''
				this.$emit('cancelKeyword')
			},
			onCancel(){
				this.$emit('onCancel')
			},
			onConfirm(){
				this.$emit('onConfirm',keyword)
			},
		},
		mounted(){
			
		}
	}
</script>

<style>
	@font-face {
		font-family: 'iconfont';
		src: url('@/static/icon_font/iconfont.ttf') format('truetype');
	}
	
	.test {
		font-family: iconfont;
		margin-left: 20rpx;
		font-size: 40rpx;
		color: #999;
	}
	.inner-canel{
		font-family: iconfont;
		margin-right: 20rpx;
		font-size: 40rpx;
		color: #999999;
	}
	.container {
	    display: flex;
	    flex-direction: column;
	    align-items: center;
	    width: 100%;
	}
	
	.header {
	    background-color: #ffffff;
	    position: fixed;
	    height: 100rpx;
	    border-top: 1px solid #f5f5f5;
	    border-bottom: 1px solid #f5f5f5;
	    display: flex;
	    flex-direction: row;
	    width: 750rpx;
	    align-items: center;
	    z-index: 99;
	}
	
	.search-container {
	    display: inline-flex;
	    flex-direction: row;
	    align-items: center;
	    background-color: #f5f5f5;
	    border-radius: 50px;
	    margin-left: 20rpx;
	}
	
	.in-bar {
	    color: #999;
	}
	
	.bar {
	    border-top-right-radius: 15px;
	    border-bottom-right-radius: 15px;
	    display: inline-block;
	    height: 68rpx;
	    width: 500rpx;
	    font-size: 28rpx;
	}
	
	.icon {
	    width: 28rpx;
	    height: 28rpx;
	    margin-left: 24rpx;
	    margin-right: 16rpx;
	}
	
	.cancel {
	    line-height: 68rpx;
	    width: 120rpx;
	    text-align: center;
	    display: inline-block;
	    border: none;
	}
	
	

	
</style>
