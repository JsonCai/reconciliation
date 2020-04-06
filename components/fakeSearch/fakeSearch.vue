<template>
	<view class="external-class fakeSearch">
	  <view class="search-wrap big" @tap="onSearch" v-if="!showBtn">
	    <text class="search-text iconfont">&#xe614; 输入关键字搜索</text>
	  </view>
	   <view class="search-wrap" @tap="onSearch" v-else>
	    <text class="search-text iconfont">&#xe614;输入关键字搜索</text>
	  </view>
	  <text class="new-btn" @tap="clickBtn" v-if="showBtn">{{btnText}}</text>
	</view>
</template>

<script>
	
	export default {
		props:{
			 btnText:String,
			 showBtn:Boolean
		},
		methods:{
			 clickBtn(){
			      this.$emit('clickBtn',{})
			    },
			    onSearch(){
			      this.$emit('onSearch', {})
			    }
		}
	}
	
	
</script>

<style lang="less">
	.fakeSearch{
	  width:750rpx;
	  height:120rpx;
	  background-color: red;
	  display: flex;
	  align-items: center;
	  justify-content: space-between;
	  box-sizing: border-box;
	  padding: 0 20rpx;
	}
	.new-btn{
	  background-color: #f7d01c;
	  color:#fff;
	  font-size: 28rpx;
	  width: 140rpx;
	  height:64rpx;
	  text-align: center;
	  line-height: 64rpx;
	  border-radius: 6rpx;
	}
	.search-wrap{
	  width: 540rpx;
	  height:60rpx;
	  border:2rpx solid #e5e5e5;
	  border-radius: 10rpx;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}
	.glass-img{
	  width: 40rpx;
	  height:40rpx;
	}
	.search-text{
	  color: #999;
	  margin-left:20rpx;
	  font-size: 30rpx;
	}
	.big{
	  width: 600rpx;
	}
	.iconfont {
	  font-family: "iconfont" !important;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}	
	@font-face {
		font-family:iconfont                                                                                                                                                                        ;
		src: url("/static/icon_font/iconfont.ttf");
	}
	
</style>
