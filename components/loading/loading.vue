<template>
	<view class="mask-layer" v-if="isShow">
	</view>
</template>

<script>
	export default {
		props:{
			isShow:Boolean
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less">
	.mask-layer{
		position: absolute;
		top: 0;
		left: 0;
		width: 750rpx;
		height: 100%;
		background-color: #333333;
		opacity:0.3;
		z-index: 999;
	}
</style>
