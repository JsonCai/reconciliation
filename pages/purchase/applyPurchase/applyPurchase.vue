<!-- 报销 -->
<template>
	<view>
		<fakeSearch></fakeSearch>
		<swiperTabHead id="swiperTabHead" class="swiper-tab-head" :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></swiperTabHead>
		<view>
			<swiper class="swiper-box" :style="{height:swiperheight+'px'}" :current="tabIndex" @change="tabChange">
				<swiper-item v-for="(items,index) in newslist" :key="index">
					<scroll-view :scroll-y="true" class="list" :style="{height:swiperheight+'px'}">
						<block v-for="(item,index1) in items.list" :key="index1">
							<applyItem :applyItem="item"/>
						</block>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import fakeSearch from '../../../components/fakeSearch/fakeSearch.vue'
	import {applyList} from '../../../libs/testDates.js'
	import swiperTabHead from '../../../components/swiperTabHead/swiperTabHead.vue'
	import {applyItem} from '../../../components/applyItem/applyItem.vue'
	export default {
		data() {
			return {
				swiperheight: 500,
				tabIndex: 0,
				tabBars: [{
						name: "全部",
						id: 0
					},
					{
						name: "未提交",
						id: 1
					},
					{
						name: "已提交",
						id: 2
					},
					{
						name: "未通过",
						id: 3
					},
					{
						name: "已成功",
						id: 4
					}
				],
				newslist: [{
						list: applyList
						
					},
					{},
					{},
					{},
					{}
				]
			}
		},
		onReady() {
			uni.getSystemInfo({
				success: (res) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('#swiperTabHead').boundingClientRect(data => {
						let height = res.windowHeight - data.height
						this.swiperheight = height;
					}).exec();
				}
			});
		},
		methods: {
			tabtap(index) {
				this.tabIndex = index
				console.log(index)
			},
			tabChange(index) {

			}
		}
	}
</script>

<style>
	@import url('reimbursement.less');
</style>
