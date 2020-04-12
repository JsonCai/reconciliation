<template>
	<view>
		<text class="time-label">时间区间</text>
		<view class="v-time-range">
			<text class="time-range" @tap="onStartTimeTap(0,startTime)">
				<text v-if="startTime==''" style="font-size: 30rpx;color: #cccccc;">选择开始时间</text>
				{{startTime | formatDate}}&ensp;&#xe74b;
			</text>
			<text style="padding: 0 20rpx;color: #666666;">-</text>
			<text class="time-range" @tap="onStartTimeTap(1,endTime)">
				<text v-if="endTime==''" style="font-size: 30rpx;color: #cccccc;">选择结束时间</text>
				{{endTime | formatDate}}&ensp;&#xe74b;
			</text>
		</view>
		<view class="v-btn">
			<text class="t-btn btn-speedy" @tap="showMonthPicker = true">月份选择</text>
			<text class="t-btn btn-report">生成报表</text>
		</view>

		<timePicker :requestCode="timeCode" :year="dialogTime.year" :month="dialogTime.month" :day="dialogTime.day" :show="showTimePicker"
		 @onConfirm="timePickConfirm" @onCancel="showTimePicker = false"></timePicker>
		<monthPicker :month="dialogTime.month" :show="showMonthPicker" @onConfirm="monthPickConfirm" @onCancel="showMonthPicker = false"></monthPicker>
	</view>
</template>

<script>
	import timePicker from '@/components/timePicker/timePicker.vue';
	import monthPicker from '@/components/monthPicker/monthPicker.vue';
	export default {
		components: {
			timePicker,
			monthPicker
		},

		data() {
			return {
				timeCode: 0,
				startTime: "",
				endTime: "",
				showTimePicker: false,
				showMonthPicker: false,
				dialogTime: {
					year: 0,
					month: 0,
					day: 0
				}
			}
		},
		filters: {
			formatDate(time) {
				if (time == "") {
					return ""
				}

				var text = time.year + "-" + (time.month < 9 ? "0" + (time.month + 1) : (time.month + 1)) +
					"-" + (time.day < 10 ? "0" + time.day : time.day)

				return text
			}
		},
		onLoad() {
			const date = new Date()
			this.dialogTime.year = date.getFullYear();
			this.dialogTime.month = date.getMonth();
			this.dialogTime.day = date.getDate();
		},
		methods: {
			onStartTimeTap(code, time) {
				this.timeCode = code
				if (time != "") {
					this.dialogTime.year = time.year;
					this.dialogTime.month = time.month;
					this.dialogTime.day = time.day;
				}
				this.showTimePicker = true;
			},
			timePickConfirm(time) {
				this.showTimePicker = false;
				if (time.code == 0) {
					this.startTime = time;
				} else {
					this.endTime = time;
				}
			},
			monthPickConfirm(time) {
				const date = new Date(new Date().getFullYear(), time.month, 0)
				this.startTime = {
					year: date.getFullYear(),
					month: time.month,
					day: 1
				};
				this.endTime = {
					year: date.getFullYear(),
					month: time.month,
					day: date.getDay()
				};
			}
		}
	}
</script>

<style lang="less">
	@import url('./reportScope.less');
</style>
