<template>
	<view>
		<view v-show="!isSearch">
			<fakeSearch @onSearch="onSearch"></fakeSearch>
			<app-tabs v-model="tabIndex" :tabs="tabs" :fixed="true" :top="120"></app-tabs>
			<!-- <switchTab :tabList="tabList" :top="120"></switchTab> -->
			<swiper :style="{ height: height }" :current="tabIndex" @change="swiperChange">
				<!--全部 -->
				<swiper-item v-for="(item, index) in tabs" :key="item.id">
					<mescroll-item :i="index" :index="tabIndex" :tabs="tabs" type="multi"></mescroll-item>
				</swiper-item>
			</swiper>
			<view class="btn-add" @tap="applyFrom">&#xe604;</view>
		</view>
		<view v-show="isSearch">
			<realSearch v-show="isSearch" @onConfirm="onConfirm" @onCancel="onCancel" />
			<!-- <mescroll-item  v-if="isSearch" type="single"></mescroll-item> -->
			<mescroll-body ref="mescrollRef" @init="mescrollInit" top="100" bottom="100" :down="downOption" :up="upOption" @down="downCallback"
			 @up="upCallback">
				<!-- 新增的微博 -->
			</mescroll-body>
		</view>
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
				tabs: [{
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
			downCallback() {
				console.log('down')
			},
			upCallback() {
				console.log('up')
			},
			applyFrom() {
				uni.navigateTo({
					url:"../../applyFrom/applyFrom"
				})
			}
		}
	};
</script>

<style lang="less">
	@font-face {
		font-family: 'iconfont';
		src: url('@/static/icon_font/iconfont.ttf') format('truetype');
	}

	.btn-add {
		display: flex;
		position: absolute;
		font-family: iconfont;
		width: 120rpx;
		height: 120rpx;
		bottom: 150rpx;
		align-items: center;
		justify-content: center;
		right: 80rpx;
		font-size: 120rpx;
		color: #999;
		color: #06bebe;
		background-color: #F7F7F7;
		border-radius: 60rpx;
	}
</style>
