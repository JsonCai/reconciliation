<template>
	<view class="v-list">
		<view class="item-wrap" v-for="(item,index) in year" :key="index.toString()" @tap="onYearClick(item)" v-if="!selectYaer">
			<text class="t-label">{{item}}年财务</text>
			<image src="../../../static/images/arrow-right01.png" class="arrow-right"></image>
		</view>
		<view class="item-wrap" v-for="(item,index) in month" :key="index.toString()" @tap="onMonthClick(item)">
			<text class="t-label">{{item}}月财务明细</text>
			<image src="../../../static/images/arrow-right01.png" class="arrow-right"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				year: [],
				month: [],
				selectYaer: 0
			}
		},
		methods: {
			onYearClick(item) {
				console.log(item)
				if (this.year.length) {
					this.selectYaer = item
					let currentYaer = this.year[this.year.length - 1]
					var month = 12
					if (item == currentYaer) {
						const date = new Date()
						month = date.getMonth();
					}
					this.month = []
					for (var i = 1; i <= month; i++) {
						this.month.push(i)
					}
					console.log(this.month)
				}
			},
			onMonthClick(item){
				uni.navigateTo({
					url:'../reportScope?year='+this.selectYaer+"&month="+item
				})
			}
		},
		onLoad() {
			let year = new Date().getFullYear()
			this.year = []
			for (var i = 2020; i <= year; i++) {
				this.year.push(i)
			}
		},
		onBackPress(e) {
			if (this.month.length) {
				this.month = []
				this.selectYaer = 0
				return true;
			}
		}
	}
</script>

<style lang="less">
	.v-list {
		display: flex;
		align-items: center;
		flex-direction: column;

		.item-wrap {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 120rpx;
			width: 85%;
			border: solid #b0b0b0 1rpx;
			margin-top: 50rpx;
			border-radius: 10rpx;
			box-shadow: 0 0 10px #ededed;

			.t-label {
				font-size: 40rpx;
				color: #666666;
				line-height: 120rpx;
				margin-left: 50rpx;
			}

			.arrow-right {
				width: 60rpx;
				height: 60rpx;
				margin-right: 50rpx;
			}
		}
	}
</style>
