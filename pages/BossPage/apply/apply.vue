<template>
	<view>
		<fakeSearch></fakeSearch>
		<app-tabs v-model="tabIndex" :tabs="tabs" :fixed="true" :top="120"></app-tabs>
		<!-- <switchTab :tabList="tabList" :top="120"></switchTab> -->
		<swiper :style="{height: height}" :current="tabIndex" @change="swiperChange">
			<!--全部 -->
			<swiper-item>
				<mescroll-item :i="0" :index="tabIndex" :tabs="tabs"></mescroll-item>
			</swiper-item>
			
			<!-- 奶粉 -->
			<swiper-item>
				
			</swiper-item>
			
			<!-- 面膜 -->
			<swiper-item>
				
			</swiper-item>
			
			<!-- 图书 -->
			<swiper-item>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>

import fakeSearch from '@/components/fakeSearch/fakeSearch.vue';
import MescrollItem from "./mescroll-swiper-item.vue";
import mTabs from "@/components/ms-tabs/ms-tabs.vue";
import AppTabs from "@/components/appTabs/app-tabs.vue";
export default {
	components: {
		fakeSearch,
		MescrollItem,
		mTabs,
		AppTabs
	},
	data() {
		return {
			height: "400px", // 需要固定swiper的高度
			tabs: [{
				id: "tab01",
				name: '全部',
				newsid: 0
			}, {
				id: "tab02",
				name: '未提交',
				newsid: 23
			}, {
				id: "tab03",
				name: '已提交',
				newsid: 223
			}, {
				id: "tab04",
				name: '被拒收',
				newsid: 221
			}, {
				id: "tab05",
				name: '被收款',
				newsid: 225
			}],
			tabIndex: 0, // 当前tab的下标
			addList: [], //新增微博
			dataList: [], // 数据列表
			top: 0, //提示,到顶部的距离
			
		};
	},
	methods: {
		swiperChange(e){
			this.tabIndex = e.detail.current
		}
	},
	onLoad(){
		this.height = uni.getSystemInfoSync().windowHeight + 'px'
	}
};
</script>

<style>
.swiper{
	position: relative;
	top: 240rpx;
}
</style>
