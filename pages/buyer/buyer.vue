<template>
	<view>
		<fakeSearch></fakeSearch>
		<AppTabs v-model="tabIndex" :tabs="tabs" :fixed="true" :top="120"></AppTabs>
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
import MescrollItem from "./mescroll-swiper-item.vue";
import pageMixin from '@/common/pageMixin'
import AppTabs from "@/components/appTabs/app-tabs.vue";
export default {
	mixins: [pageMixin],
	components:{
		MescrollItem,
		AppTabs
	},
	data() {
		return {
			
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
			
		};
	}
};
</script>

<style>
.swiper{
	position: relative;
	top: 240rpx;
}
</style>
