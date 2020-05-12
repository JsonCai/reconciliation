<template>
	<view>
		<fakeSearch @onSearch="onSearch"></fakeSearch>
		<app-tabs v-model="tabIndex" :tabs="tabs" :fixed="true" :top="120"></app-tabs>
		<view class="list-wrap">
			<block v-for="(item,index) in tabs" :key="index">
				<revenueList :tab="item" :ref="'list'+index" v-if="index == tabIndex" />
			</block>
			<view class="btn-add" @tap="revenueFrom">&#xe604;</view>
		</view>
	</view>
</template>

<script>
	import revenueList from "./revenueList.vue";
	import AppTabs from "@/components/appTabs/app-tabs.vue";
	import fakeSearch from '@/components/fakeSearch/fakeSearch.vue';

	import {
		tellerRevenueTab
	} from '../../../config/config.js'


	export default {

		components: {
			revenueList,
			AppTabs,
			fakeSearch,
		},
		data() {
			return {
				tabIndex: 0,
				tabs: tellerRevenueTab,
			};
		},
		onReachBottom() {
			console.log(this.tabIndex)
			let gv = 'list' + this.tabIndex;
			this.$refs[gv][0].loadMore()
		},
		methods: {
			revenueFrom() {
				uni.navigateTo({
					url: '../../revenueForm/revenueForm'
				})
			},
			onSearch() {
				uni.navigateTo({
					url:'../searchPage/searchPage'
				})
			}
		}

	};
</script>

<style>
</style>
