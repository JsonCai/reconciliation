<!-- 报销 -->
<template>
	<view class="">
		<fakeSearch></fakeSearch>
		<!-- <swiperTabHead id="swiperTabHead" class="swiper-tab-head" :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></swiperTabHead> -->
		<view class="tabs">
			<!-- <scroll-view :scroll-y="true" class="list" :style="{ height: swiperheight + 'px' }">
				<block v-for="(item, index1) in list" :key="index1"><applyItem :applyItem="item" /></block>
			</scroll-view> -->
			<list id="0" :dataList="list" >
				<block v-for="(item, index1) in list" :key="index1"><applyItem :applyItem="item" /></block>
			</list>
		</view>
	</view>
</template>

<script>
import fakeSearch from '../../../components/fakeSearch/fakeSearch.vue';
import { applyList } from '../../../libs/testDates.js';
import swiperTabHead from '../../../components/swiperTabHead/swiperTabHead.vue';
import applyItem from '../../../components/applyItem/applyItem.vue';
import list from './list.nvue'
export default {
	components: {
		applyItem,
		fakeSearch,
		swiperTabHead,
		list
	},
	data() {
		return {
			list: applyList,
			swiperheight: 500,
			tabIndex: 0,
			tabBars: [
				{
					name: '全部',
					id: 0
				},
				{
					name: '未提交',
					id: 1
				},
				{
					name: '已提交',
					id: 2
				},
				{
					name: '未通过',
					id: 3
				},
				{
					name: '已成功',
					id: 4
				}
			],
			newslist: [
				{
					list: applyList
				},
				{},
				{},
				{},
				{}
			]
		};
	},
	onReady() {
		// uni.getSystemInfo({
		// 	success: res => {
		// 		const query = uni.createSelectorQuery().in(this);
		// 		query
		// 			.select('#swiperTabHead')
		// 			.boundingClientRect(data => {
		// 				console.log(data);
		// 				let height = res.windowHeight - data.height;
		// 				this.swiperheight = height - 20;
		// 			})
		// 			.exec();
		// 	}
		// });
	},
	methods: {
		tabtap(index) {
			this.tabIndex = index;
			console.log(index);
		},
		tabChange(index) {}
	}
};
</script>

<style>
@import url('reimbursement.less');
</style>
