<template>
	<view class="container">
		<view class="item-list">
			<view class="index-item">
				<image src="../../static/images/index-rec-icon.png"  class="icon"></image>
				<text>报销</text>
				<view class="role-icon"></view>
			</view>
			<view class="index-item">
				<image src="../../static/images/index-revenue-icon.png"  class="icon"></image>
				<text>营收</text>
			</view>
			<view class="index-item">
				<image src="../../static/images/index-finance-icon.png"  class="icon"></image>
				<text>财务</text>
			</view>
			<view class="index-item">
				<image src="../../static/images/index-statement-icon.png"  class="icon"></image>
				<text>报表</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="less">
	@import url('index.less');
</style>
