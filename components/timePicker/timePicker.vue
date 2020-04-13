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
				<view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
			</picker-view-column>
			<picker-view-column>
				<view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
			</picker-view-column>
			<picker-view-column>
				<view class="item" v-for="(item,index) in currentDays" :key="index">{{item}}日</view>
			</picker-view-column>
		</picker-view>
	</view>
</template>

<script>
	export default {
		props: {
			requestCode: Number, // 选择时间的请求code
			show: Boolean,
			year: Number,
			month: Number,
			day: Number
		},
		data() {
			const date = new Date()
			const years = []
			const months = []
			var currentDays = []
			const days = []
			for (let i = 1990; i <= date.getFullYear(); i++) {
				years.push(i)
			}
			for (let i = 1; i <= 12; i++) {
				months.push(i)
			}
			for (let i = 1; i <= 31; i++) {
				days.push(i)
			}
			return {
				years,
				months,
				currentDays,
				days,
				value: [9999, 0, 0],
				visible: true,
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`
			}
		},
		mounted() {
			const date = new Date()
			this.value[0] = date.getFullYear();
			this.value[1] = date.getMonth();
			this.value[2] = date.getDate();
		},
		methods: {
			bindChange(e) {
				const val = e.detail.value;
				this.value = val;
				const daySize = new Date(val[0] + 1990, val[1] + 1, 0).getDate();
				this.currentDays = this.days.slice(0, daySize);
				console.log(val);
			},
			onConfirm() {
				this.$emit("onConfirm", {
					code: this.requestCode,
					year: this.value[0] + 1990,
					month: this.value[1],
					day: this.value[2] + 1
				})
			},
			onCancel() {
				this.$emit("onCancel")
			}
		},
		watch: {
			year: {
				handler(newVal, oldVal) {
					this.value[0] = newVal;
					const daySize = new Date(this.year, this.month, 0).getDate();
					this.currentDays = this.days.slice(0, daySize);
				},
				immediate: true,
				deep: true
			},
			month: {
				handler(newVal, oldVal) {
					this.value[1] = newVal;
					const daySize = new Date(this.year, this.month, 0).getDate();
					this.currentDays = this.days.slice(0, daySize);
				},
				immediate: true,
				deep: true
			},
			day: {
				handler(newVal, oldVal) {
					this.value[2] = newVal - 1;
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
			flex:0 0 100rpx;
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
