<template>
	<view>
		<fakeSearch></fakeSearch>
		<app-tabs v-model="tabIndex" :tabs="tabs" :fixed="true" :top="120"></app-tabs>
		<!-- <switchTab :tabList="tabList" :top="120"></switchTab> -->
		<swiper :style="{height: height}" :current="tabIndex" @change="swiperChange">
			<!--全部 -->
			<swiper-item v-for="(item,index) in tabs" :key="item.id">
				<applyList :i="0" :index="tabIndex" :tabs="tabs"></applyList>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>

import applyList from "./applyList.vue";
import pageMixin from '@/common/pageMixin'
import AppTabs from "@/components/appTabs/app-tabs.vue";
import fakeSearch from '@/components/fakeSearch/fakeSearch.vue';

import {bossTabs} from '../../../config/config.js'

export default {
	mixins: [pageMixin],
	components:{
		applyList,
		AppTabs,
		fakeSearch
	},
	data() {
		return {
			height: "400px", // 需要固定swiper的高度
			tabs: bossTabs
		};
	},
	onLoad() {
		console.log(bossTabs)
	}
};
</script>

<style>
</style>
