<template>
	<view class="noLogin">
		<image src="../../static/images/noLogin.png" class="noLoginImg"></image>
		<view class="mt-20">
			<text class="mt-20 fc-9">您还未登录</text>
			<text class="login-btn ml-10" @click="goLogin">前往登录</text>
		</view>

	</view>
</template>
<script>
	export default {
		methods: {
			goLogin() {
				uni.switchTab({
					url: '/pages/me/me'
				})
			}
		}
	}
</script>

<style>
	.noLogin {
		text-align: center;
		font-size: 34rpx;
	}

	.noLoginImg {
		display: block;
		width: 200rpx;
		height: 200rpx;
		margin: 0 auto;
		margin-top: 200rpx;
	}

	.login-btn {
		color: #06bebe;
	}
</style>
