<template>
	<view>
		<text class="time-label">时间区间</text>
		<view class="v-time-range">
			<text class="time-range">{{startTime}} &#xe74b;</text>
			<text style="padding: 0 20rpx;color: #666666;">-</text>
			<text class="time-range">{{endTime}} &#xe74b;</text>
		</view>

		<view class="v-time-picker">
			<!-- 时间选择器 -->
			<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
				<view class="uni-input">{{date}}</view>
			</picker>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				startTime: "",
				endTime: "",
				date: currentDate
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			bindChange: function(e) {
				const val = e.detail.value
				this.year = this.years[val[0]]
				this.month = this.months[val[1]]
				this.day = this.days[val[2]]
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style lang="less">
	@import url('./reportScope.less');
</style>
