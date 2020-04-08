<template>
	<view class="swiperTab" :style="{'top':top+'rpx'}">
		<ms-tabs :list="tabList" v-model="active"></ms-tabs>
	</view>
</template>

<script>
import msTabs from '@/components/ms-tabs/ms-tabs.vue';
export default {
	props:{
		tabList:Array,
		top:{
			type:Number,
			default:0
		}
	},
	components: {
		msTabs
	},
	data() {
		return {
			active: 0
		};
	},
	methods: {
		change(index) {
			console.log(index);
		}
	}
};
</script>

<style>
	.swiperTab{
		width: 750rpx;
		background: #ccc;
		position: fixed;
		left: 0;
		z-index: 999;
	}
</style>
