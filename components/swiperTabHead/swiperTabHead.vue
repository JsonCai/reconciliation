<template>
	<view class="uni-tab-bar">
		<scroll-view scroll-x class="uni-swiper-tab">
			<block v-for="(tab, index) in tabBars" :key="tab.id">
				<view class="swiper-tab-list" :class="{ active: tabIndex == index }" @tap="tabtap(index)">
					{{ tab.name }}
					<view class="swiper-tab-line"></view>
				</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
export default {
	props: {
		tabBars: Array,
		tabIndex: Number
	},
	methods: {
		tabtap(index) {
			this.$emit('tabtap', index);
		}
	}
};
</script>

<style>
.uni-tab-bar {
	border-bottom: 1rpx solid #e5e5e5;
}
.uni-swiper-tab {
	border-bottom: 1rpx solid #eeeeee;
}
.swiper-tab-list {
	color: #969696;
	font-weight: bold;
}
.uni-tab-bar .active {
	color: #343434;
}
.active .swiper-tab-line {
	border-bottom: 2rpx solid #06bebe;
	width: 70rpx;
	margin: auto;
	border-top: 6rpx solid #06bebe;
	border-radius: 20rpx;
}
</style>
