<template>
	<view v-if="show" class="v-time-picker">
		<view @tap.stop="onCancel" style="height: 100%;width: 100%;"></view>
		<!-- 时间选择器 -->
		<view class="v-title">
			<text class="sel-btn" @tap.stop="onCancel">取消</text>
			<text class="time-picker-title">选择时间</text>
			<text class="sel-btn" @tap="onConfirm">确定</text>
		</view>
		<picker-view class="mpvue-picker-view" :indicator-style="indicatorStyle" :value="value" @change="bindChange">
			<picker-view-column>
				<view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
			</picker-view-column>
		</picker-view>
	</view>
</template>

<script>
	export default {
		props: {
			requestCode: Number, // 选择时间的请求code
			show: Boolean,
			month: Number
		},
		data() {
			const months = []
			for (let i = 1; i <= 12; i++) {
				months.push(i)
			}
			return {
				months,
				value: [0],
				visible: true,
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`
			}
		},
		methods: {
			bindChange(e) {
				const val = e.detail.value;
				this.value = val;
			},
			onConfirm() {
				this.$emit("onConfirm", {
					code: this.requestCode,
					month: this.value[0]+1
				})
			},
			onCancel() {
				this.$emit("onCancel")
			}
		},
		watch: {
			month: {
				handler(newVal, oldVal) {
					if (newVal) {
						this.value[0] = newVal;
					}
				},
				immediate: true,
				deep: true
			}
		}
	}
</script>

<style lang="less">
	.v-time-picker {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.7);

		.v-title {
			display: flex;
			width: 100%;
			height: 100rpx;
			background-color: #FFFFFF;
			border-bottom: solid #ededed 1rpx;

			.sel-btn {
				width: 15%;
				font-size: 30rpx;
				color: #1a1a1a;
				text-align: center;
				line-height: 100rpx;
			}

			.time-picker-title {
				flex: 1;
				font-size: 40rpx;
				text-align: center;
				line-height: 100rpx;
			}
		}

		.mpvue-picker-view {
			width: 750rpx;
			height: 470rpx;
			background-color: rgba(255, 255, 255, 1);

			.item {
				text-align: center;
				text-overflow: ellipsis;
				line-height: 90rpx;
				font-size: 36rpx;
				color: #1a1a1a;
			}
		}
	}
</style>
