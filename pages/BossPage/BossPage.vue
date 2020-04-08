<template>
	<view class="container"><swiperTab :tabList="tabList"/></view>
</template>

<script>
import swiperTab from '@/components/swiperTab/swiperTab';

export default {
	components: {
		swiperTab
	},
	data() {
		return {
			tabList: [
				{
					text: '军事'
				},
				{
					text: '科技'
				},
				{
					text: '汽车'
				}
				
			]
		};
	},
	methods: {}
};
</script>

<style lang="less">
	.container{
		background: red;
	}
</style>
