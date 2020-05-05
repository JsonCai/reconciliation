<template>
	<view>
		<fakeSearch></fakeSearch>
		<app-tabs v-model="tabIndex" :tabs="tabs" :fixed="true" :top="120"></app-tabs>
		<view class="list-wrap">
			<block v-for="(item,index) in tabs">
				<applyList :tab="item" v-if="index == tabIndex"/>
			</block>
		</view>
	</view>
</template>

<script>
	import applyList from "./applyList.vue";
	import AppTabs from "@/components/appTabs/app-tabs.vue";
	import fakeSearch from '@/components/fakeSearch/fakeSearch.vue';

	import {
		bossTabs
	} from '../../../config/config.js'

	
	export default {

		components: {
			applyList,
			AppTabs,
			fakeSearch,
		},
		data() {
			return {
				tabIndex: 0,
				tabs: bossTabs,
			};
		},
		onLoad() {
			console.log(bossTabs)
		},
		methods: {
			
		}

	};
</script>

<style>
	.scroll-Y {
		width: 100%;
		height: 2000rpx;

	}

	.aaa {
		height: 400px;
		border-bottom: 1rpx solid red;
	}
</style>
