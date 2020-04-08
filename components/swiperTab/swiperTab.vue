<template>
	<view class="swiperTab">
		<s-tabs effect v-model="activeTab" @change="change"  class="custom-tabs" :nav-per-view="tabList.length">
			<s-tab :title="item.text" v-for="item in tabList"></s-tab>
		</s-tabs>
	</view>
</template>

<script>
import sTabs from '@/components/s-tabs';
import sTab from '@/components/s-tab';
export default {
	props:{
		tabList:Array
	},
	components: {
		sTabs,
		sTab
	},
	data() {
		return {
			activeTab: 0
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
	}
</style>
