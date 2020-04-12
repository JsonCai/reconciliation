<template>
	<view>
		<fakeSearch v-show="!isSearch" @onSearch="onSearch"></fakeSearch>
		<app-tabs v-model="tabIndex" :tabs="tabs" :fixed="true" :top="120" v-show="!isSearch"></app-tabs>
		<!-- <switchTab :tabList="tabList" :top="120"></switchTab> -->
		<swiper :style="{ height: height }" :current="tabIndex" @change="swiperChange" v-show="!isSearch">
			<!--全部 -->
			<swiper-item v-for="(item, index) in tabs" :key="item.id"><mescroll-item :i="index" :index="tabIndex" :tabs="tabs" type="multi"></mescroll-item></swiper-item>
		</swiper>
		<realSearch v-show="isSearch" @onConfirm="onConfirm" @onCancel="onCancel" />
		<!-- <mescroll-item  v-if="isSearch" type="single"></mescroll-item> -->
		<mescroll-body ref="mescrollRef" @init="mescrollInit" top="100" bottom="100" :down="downOption" :up="upOption" @down="downCallback" @up="upCallback"><!-- 新增的微博 --></mescroll-body>
	</view>
</template>

<script>
import MescrollBody from '@/components/mescroll-uni/mescroll-body.vue';
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
import MescrollItem from './list.vue';
import pageMixin from '@/common/pageMixin';
import AppTabs from '@/components/appTabs/app-tabs.vue';
import realSearch from '@/components/realSearch/realSearch.vue';
import fakeSearch from '@/components/fakeSearch/fakeSearch.vue';

export default {
	mixins: [pageMixin, MescrollMixin],
	components: {
		MescrollItem,
		AppTabs,
		realSearch,
		MescrollBody,
		fakeSearch
	},
	data() {
		return {
			isSearch: false,
			height: '400px', // 需要固定swiper的高度
			tabs: [
				{
					id: 'tab01',
					name: '全部',
					newsid: 0
				},
				{
					id: 'tab02',
					name: '未提交',
					newsid: 23
				},
				{
					id: 'tab03',
					name: '已提交',
					newsid: 223
				},
				{
					id: 'tab04',
					name: '被拒收',
					newsid: 221
				},
				{
					id: 'tab05',
					name: '被收款',
					newsid: 225
				}
			]
		};
	},
	methods: {
		onConfirm() {},
		cancelKeyword() {},
		onCancel() {
			this.isSearch = false;
		},
		onSearch() {
			this.isSearch = true;
		},
		downCallback(){
			console.log('down')
		},
		upCallback(){
			console.log('up')
		}
	}
};
</script>

<style></style>
