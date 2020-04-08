<template>
	<view class="container">
		<swiperTab :tabList="tabList" />
	</view>
</template>

<script>
	import swiperTab from '@/components/swiperTab/swiperTab';

	export default {
		components: {
			swiperTab
		},
		data() {
			return {
				tabList: [{
						title: 'test1'
					}, {
						title: 'test2'
					}, {
						title: 'test3'
					}, {
						title: 'test4'
					}, {
						title: 'test5'
					}, {
						title: 'test6'
					}, {
						title: 'test7'
					}, {
						title: 'test8'
					}

				]
			};
		},
		methods: {}
	};
</script>

<style lang="less">
	.container {
		background: red;
	}
</style>
