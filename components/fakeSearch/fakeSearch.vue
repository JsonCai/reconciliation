<template>
	<view class="external-class fakeSearch">
		<view class="search-wrap big" @tap="onSearch" v-if="!showBtn">
			<text class="search-text iconfont">&#xe614;</text>
		</view>
		<view class="search-wrap" @tap="onSearch" v-else>
			<text class="search-text iconfont">&#xe614;</text>
		</view>
		<text class="new-btn" @tap="clickBtn" v-if="showBtn">{{btnText}}</text>
	</view>
</template>

<script>
	export default {
		props: {
			btnText: String,
			showBtn: Boolean
		},
		created() {
			console.log("1212312312")
			let domModule = weex.requireModule('dom');
			console.log(domModule)
			domModule.addRule('fontFace', {
				'fontFamily': "iconfont",
				'src': "url(\'http://at.alicdn.com/t/font_1736036_2ume0tz9uwu.ttf\')"
			})
		},
		methods: {
			clickBtn() {
				this.$emit('clickBtn', {})
			},
			onSearch() {
				this.$emit('onSearch', {})
			}
		}
	}
</script>

<style lang="less">
	.fakeSearch {
		width: 710rpx;
		height: 120rpx;
		background-color: #FFFFFF;
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif*/
		align-items: center;
		justify-content: center;
		padding: 0 20rpx;
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
		margin-left: 20rpx;
		font-size: 30rpx;
	}

	.big {
		width: 600rpx;
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-style: normal;

		/* #ifndef APP-PLUS-NVUE */
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		/* #endif*/
	}

	@font-face {
		font-family: iconfont;
		src: url("/static/icon_font/iconfont.ttf");
	}
</style>
