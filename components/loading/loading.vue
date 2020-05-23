<template>
	<view class="spinner" v-if="isShow">
		<view class="double-bounce1"></view>
		<view class="double-bounce2"></view>
		<view class="mask-wrap"></view>
	</view>
</template>

<script>
	export default {
		props: {
			isShow: Boolean
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="less">
	.spinner {
		width: 40rpx;
		height: 40rpx;
		position: relative;
		z-index: 999;
		position: fixed;
		top:50%;
		left:50%;
		margin-left: -20rpx;
		margin-top: -20rpx;
	}
	.mask-wrap{
		position: fixed;
		top:0;
		bottom:0;
		left:0;
		right:0;
		z-index: 999;
		background: rgba(0,0,0,0.5);
	}
	.double-bounce1,
	.double-bounce2 {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background-color: #3063b2;
		position: absolute;
		top: 0;
		left: 0;
		-webkit-animation: bounce 2.0s infinite ease-in-out;
		animation: bounce 2.0s infinite ease-in-out;
		z-index: 999;
	}

	.double-bounce2 {
		-webkit-animation-delay: -1.0s;
		animation-delay: -1.0s;
	}

	@keyframes bounce {

		0%,
		100% {
			-webkit-transform: scale(0.0)
		}

		50% {
			-webkit-transform: scale(1.0)
		}
	}
</style>
