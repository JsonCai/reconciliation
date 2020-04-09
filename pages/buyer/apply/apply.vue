<template>
	<view>
		<fakeSearch v-if="!isSearch"></fakeSearch>
		<app-tabs v-model="tabIndex" :tabs="tabs" :fixed="true" :top="120" v-if="!isSearch"></app-tabs>
		<!-- <switchTab :tabList="tabList" :top="120"></switchTab> -->
		<swiper :style="{height: height}" :current="tabIndex" @change="swiperChange" v-if="!isSearch">
			<!--全部 -->
			<swiper-item v-for="(item,index) in tabs" :key="item.id">
				<mescroll-item :i="0" :index="tabIndex" :tabs="tabs"></mescroll-item>
			</swiper-item>
		</swiper>
		<realSearch v-if="isSearch"/>
	</view>
</template>

<script>

import MescrollItem from "./apply-item.vue";
import pageMixin from '@/common/pageMixin'
import AppTabs from "@/components/appTabs/app-tabs.vue";
import realSearch from "@/components/realSearch/realSearch.vue";
export default {
	mixins: [pageMixin],
	components:{
		MescrollItem,
		AppTabs,
		realSearch
	},
	data() {
		return {
			isSearch:true,
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
			}]
		};
	}
};
</script>

<style>
</style>
