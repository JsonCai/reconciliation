<template>
	<view>
		<fakeSearch></fakeSearch>
		<app-tabs v-model="tabIndex" :tabs="tabs" :fixed="true" :top="120"></app-tabs>
		<view class="list-wrap">
			<block v-for="(item,index) in tabs" :key="index">
				<applyList :tab="item" :ref="'list'+index" v-if="index == tabIndex"/>
			</block>
		</view>
		<view class="btn-add" @tap="applyFrom">&#xe604;</view>
	</view>
</template>
<script>
	import applyList from "./applyList.vue";
	import AppTabs from "@/components/appTabs/app-tabs.vue";
	import fakeSearch from '@/components/fakeSearch/fakeSearch.vue';

	import {
		buyerTabs
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
				tabs: buyerTabs,
			};
		},
		onReachBottom(){
			let gv='list'+this.tabIndex;
			this.$refs[gv][0].loadMore()
		},
		methods:{
			applyFrom(){
				uni.navigateTo({
					url:'../../applyForm/applyForm'
				})
			}
		},
		onShow(){
		    uni.$on("reload", () => {
				let gv='list'+this.tabIndex;
				if(this.$refs[gv][0]){
					this.$refs[gv][0].reload()
				}
		    })
		},
	};
</script>

<style>
</style>
