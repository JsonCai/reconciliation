<template>
	<view>
		<fakeSearch></fakeSearch>
		<app-tabs v-model="tabIndex" :tabs="tabs" :fixed="true" :top="120"></app-tabs>
		<view class="list-wrap">
			<block v-for="(item,index) in tabs" :key="index">
				<paymentList :tab="item" :ref="'list'+index" v-if="index == tabIndex"/>
			</block>
		</view>
		<view class="btn-add" @tap="applyFrom">&#xe604;</view>
	</view>
</template>
<script>
	import paymentList from "./paymentList.vue";
	import AppTabs from "@/components/appTabs/app-tabs.vue";
	import fakeSearch from '@/components/fakeSearch/fakeSearch.vue';

	import {
		buyerTabs
	} from '../../../config/config.js'
	export default {
		components: {
			paymentList,
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
			console.log(this.tabIndex)
			let gv='list'+this.tabIndex;
			this.$refs[gv][0].loadMore()
		},
		methods:{
			applyFrom(){
				uni.navigateTo({
					url:'../payments/payments'
				})
			}
		}
	};
</script>

<style>
</style>
