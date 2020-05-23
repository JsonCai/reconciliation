<template>
	<view>
		<fakeSearch @onSearch="searchClick"></fakeSearch>
		<app-tabs v-model="tabIndex" :tabs="tabs" :fixed="true" :top="120"></app-tabs>
		<view class="list-wrap">
			<block v-for="(item,index) in tabs" :key="index">
				<applyList :tab="item" :ref="'list'+index" v-if="index == tabIndex" />
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
		onReachBottom() {
			console.log(this.tabIndex)
			let gv = 'list' + this.tabIndex;
			this.$refs[gv][0].loadMore()
		},
		onLoad(){
			uni.$on("reload", () => {
				let gv='list'+this.tabIndex;
				if(this.$refs[gv][0]){
					this.$refs[gv][0].reload()
				}
			})
		},
		methods: {
			searchClick() {
				uni.navigateTo({
					url:'../searchPage/searchPage'
				})
			}
		}

	};
</script>

<style>
</style>
