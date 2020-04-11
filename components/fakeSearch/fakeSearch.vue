<template>
	<view class="external-class fakeSearch"  @tap="onSearch">
		<view class="search-wrap big" >
			<text class="test">&#xe614;</text>
			<text class="search-text">输入关键字搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			btnText: String,
			showBtn: Boolean
		},
		methods: {
			onSearch(){
				this.$emit('onSearch')
			}
		}
	}
</script>

<style lang="less">
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

	.fakeSearch {
		position: fixed;
		left: 0;
		top: --window-top;
		width: 710rpx;
		height: 120rpx;
		background-color: #FFFFFF;
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif*/
		align-items: center;
		justify-content: center;
		padding: 0 20rpx;
		z-index: 999;

	}

	.new-btn {
		background-color: #f7d01c;
		color: #fff;
		font-size: 28rpx;
		width: 140rpx;
		height: 64rpx;
		text-align: center;
		line-height: 64rpx;
		border-radius: 6rpx;
	}

	.search-wrap {
		width: 540rpx;
		height: 60rpx;
		border-width: 2rpx;
		border-style: solid;
		border-color: #e5e5e5;
		border-radius: 10rpx;
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif*/
		justify-content: center;
		align-items: center;
	}

	.glass-img {
		width: 40rpx;
		height: 40rpx;
	}

	.search-text {
		color: #999;
		margin-left: 10rpx;
		font-size: 30rpx;
	}

	.big {
		width: 600rpx;
	}
</style>
