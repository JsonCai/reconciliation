<template>
	<view class="container">
		<fakeSearch />
		<swiperTab :tabList="tabList" />
		<!-- <swiper class="swiper" :indicator-dots="false" :autoplay="false">
			<swiper-item>
				
			</swiper-item>
			<swiper-item><view class="swiper-item uni-bg-green">B</view></swiper-item>
			<swiper-item><view class="swiper-item uni-bg-blue">C</view></swiper-item>
		</swiper> -->
		<mescroll-body ref="mescrollRef" @init="mescrollInit" top="100" bottom="100" :down="downOption" @down="downCallback" @up="upCallback">
			<!-- 新增的微博 -->
			<view class="news-li" v-for="news in addList" :key="news.id">
				<view>{{ news.title }}</view>
				<view class="new-content">{{ news.content }}</view>
			</view>
			<!-- 模拟的内容 -->
			<image src="http://www.mescroll.com/img/xinlang/xinlang1.jpg" mode="widthFix" />
			<!-- 分页的数据 -->
			<view class="news-li" v-for="news in dataList" :key="news.id">
				<view>{{ news.title }}</view>
				<view class="new-content">{{ news.content }}</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
import swiperTab from '@/components/swiperTab/swiperTab';
import fakeSearch from '@/components/fakeSearch/fakeSearch';
import MescrollBody from "@/components/mescroll-diy/xinlang/mescroll-body.vue";
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
import { apiWeiboList } from '@/api/mock.js';
export default {
	mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
	components: {
		swiperTab,
		fakeSearch,
		MescrollBody
	},
	data() {
		return {
			downOption: {
				auto: false //是否在初始化完毕之后自动执行下拉回调callback; 默认true
			},
			addList: [], //新增微博
			dataList: [], // 数据列表
			top: 0, //提示,到顶部的距离
			tabList: [
				{
					title: 'test1'
				},
				{
					title: 'test2'
				},
				{
					title: 'test3'
				},
				{
					title: 'test4'
				},
				{
					title: 'test5'
				},
				{
					title: 'test6'
				},
				{
					title: 'test7'
				},
				{
					title: 'test8'
				}
			]
		};
	},
	methods: {
		/*下拉刷新的回调 */
		downCallback() {
			//加载轮播数据..
			//...
			//加载列表数据
			apiWeiboList()
				.then(curPageData => {
					//联网成功的回调,隐藏下拉刷新的状态
					this.mescroll.endSuccess();
					//添加新数据到顶部
					this.addList.unshift(curPageData[0]);
					//显示提示
					// #ifdef H5
					this.top = uni.upx2px(100 + 88) + 'px'; // H5的高度需加上 88的标题栏
					// #endif

					// #ifndef H5
					this.top = uni.upx2px(100) + 'px'; // 非H5不必加
					// #endif
					setTimeout(() => {
						this.top = 0;
					}, 2000);
				})
				.catch(() => {
					//联网失败, 结束加载
					this.mescroll.endErr();
				});
		},
		/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
		upCallback(page) {
			//联网加载数据
			apiWeiboList(page.num, page.size)
				.then(curPageData => {
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					this.mescroll.endSuccess(curPageData.length);

					//追加新数据
					this.dataList = this.dataList.concat(curPageData);
				})
				.catch(() => {
					//联网失败, 结束加载
					this.mescroll.endErr();
				});
		}
	}
};
</script>

<style lang="less">
.swiper {
	width: 100%;
}
.download-tip {
	z-index: 900;
	position: fixed;
	top: calc(var(--window-top) + 20rpx);
	left: 0;
	width: 100%;
	height: 60rpx;
	line-height: 60rpx;
	font-size: 24rpx;
	text-align: center;
	background-color: rgba(255, 130, 1, 0.7);
	color: white;
	-webkit-transition: top 300ms;
	transition: top 300ms;
}

/*展示上拉加载的数据列表*/
.news-li {
	padding: 32rpx;
	border-bottom: 1rpx solid #eee;
}
.news-li .new-content {
	font-size: 28rpx;
	margin-top: 10rpx;
	margin-left: 20rpx;
	color: #666;
}
</style>
