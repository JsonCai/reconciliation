<template>
	<view class="v-content">
		<text class="time-label" v-if="isSectionShow">时间区间</text>
		<view class="v-time-range" v-if="isSectionShow">
			<text class="time-range" @tap="onStartTimeTap(0,startTime)">
				<text v-if="startTime==''" style="font-size: 30rpx;color: #cccccc;">选择开始时间</text>
				{{startTime}}&ensp;&#xe74b;
			</text>
			<text style="padding: 0 20rpx;color: #666666;">-</text>
			<text class="time-range" @tap="onStartTimeTap(1,endTime)">
				<text v-if="endTime==''" style="font-size: 30rpx;color: #cccccc;">选择结束时间</text>
				{{endTime}}&ensp;&#xe74b;
			</text>
		</view>
		<view class="v-btn" v-if="isSectionShow">
			<text class="t-btn btn-speedy" @tap="showMonthPicker = true">月份选择</text>
			<text class="t-btn btn-report" @tap="onGetReport">生成报表</text>
		</view>

		<view class="report-label" v-if="isShowReport">
			<text class="report-text fc-6">报表区间</text>
			<text class="report-text fc-3">{{realTime.startTime}}</text>
			<text>&ensp;至&ensp;</text>
			<text class="fc-3">{{realTime.endTime}}</text>

		</view>
		<view class="report-label" v-if="isShowReport">
			<text class="report-text fc-6">利润：</text>
			<text class="report-text fc-3">¥{{reportDetail.profit | formatMoney}}</text>
		</view>
		<view class="report-label" v-if="isShowReport">
			<text class="report-text fc-6">现金：</text>
			<text class="report-text fc-3">¥{{reportDetail.cash | formatMoney}}</text>
		</view>
		<view class="report-label" v-if="isShowReport">
			<text class="report-text fc-6">未收款：</text>
			<text class="report-text fc-3">¥{{reportDetail.uncollected | formatMoney}}</text>
		</view>
		<view class="report-label" v-if="isShowReport">
			<text class="report-text fc-6">实收款：</text>
			<text class="report-text fc-3">¥{{reportDetail.fundsReceived | formatMoney}}</text>
		</view>
		<view class="report-label" v-if="isShowReport" @tap="onItemClick(StatementTypes.mainBusinessExpenses)">
			<text class="report-text fc-6">主营支出：</text>
			<text class="report-text fc-b">¥{{reportDetail.mainBusinessExpenses | formatMoney}}</text>
		</view>
		<view class="report-label" v-if="isShowReport" @tap="onItemClick(StatementTypes.mainBusinessIncome)">
			<text class="report-text fc-6">主营收入：</text>
			<text class="report-text fc-b">¥{{reportDetail.mainBusinessIncome | formatMoney}}</text>
		</view>
		<view class="report-label" v-if="isShowReport" @tap="onItemClick(StatementTypes.otherExpenses)">
			<text class="report-text fc-6">其他支出：</text>
			<text class="report-text fc-b">¥{{reportDetail.otherExpenses | formatMoney}}</text>
		</view>
		<view class="report-label" v-if="isShowReport" @tap="onItemClick(StatementTypes.otherIncome)">
			<text class="report-text fc-6">其他收入：</text>
			<text class="report-text fc-b">¥{{reportDetail.otherIncome | formatMoney}}</text>
		</view>
		<timePicker :requestCode="timeCode" :date="dialogTime" :show="showTimePicker" @onConfirm="timePickConfirm" @onCancel="showTimePicker = false"></timePicker>
		<monthPicker :show="showMonthPicker" @onConfirm="monthPickConfirm" @onCancel="showMonthPicker = false"></monthPicker>
		<loading :isShow='isShowLoading'></loading>
	</view>
</template>

<script>
	import timePicker from '@/components/timePicker/timePicker.vue';
	import monthPicker from '@/components/monthPicker/monthPicker.vue';
	import {
		getSectionStatement
	} from '@/api/statement/statement.js'
	import {
		StatementTypes
	} from '@/config/config.js'
	import {
		fmtMoney2,
		fmtMoneyBySeparator
	} from '@/libs/utils.js'
	export default {
		components: {
			timePicker,
			monthPicker
		},
		filters: {
			formatMoney(val) {
				if (val) {
					return fmtMoneyBySeparator(fmtMoney2(val))
				} else {
					return '0'
				}
			}
		},
		data() {
			return {
				timeCode: 0,
				startTime: "",
				endTime: "",
				showTimePicker: false,
				showMonthPicker: false,
				dialogTime: "",
				realTime: {
					startTime: "",
					endTime: ""
				},
				reportDetail: {},
				isShowReport: false,
				StatementTypes,
				isSectionShow: true
			}
		},
		onLoad(option) {
			if (option.year && option.month) {
				this.isSectionShow = false
				const date = new Date(option.year, option.month, 0)
				this.startTime = option.year + "-" + (option.month < 10 ? ('0' + option.month) : option.month) + "-" + '01'
				this.endTime = option.year + "-" + (option.month < 10 ? ('0' + option.month) : option.month) + "-" + date.getDate()
				this.onGetReport()
			}
		},
		methods: {
			onStartTimeTap(code, time) {
				this.timeCode = code
				this.dialogTime = time
				this.showTimePicker = true;
			},
			timePickConfirm(time) {
				this.showTimePicker = false;
				if (time.code == 0) {
					this.startTime = time.date;
				} else {
					this.endTime = time.date;
				}
			},
			monthPickConfirm(time) {
				this.showMonthPicker = false
				console.log(time)
				const date = new Date(new Date().getFullYear(), time.month, 0)
				this.startTime = date.getFullYear() + "-" + (time.month < 10 ? ('0' + time.month) : time.month) + "-" + '01'
				this.endTime = date.getFullYear() + "-" + (time.month < 10 ? ('0' + time.month) : time.month) + "-" + date.getDate()
			},
			onGetReport() {
				if (this.startTime && this.endTime) {
					// this.isShowReport = true
					this.realTime.startTime = this.startTime;
					this.realTime.endTime = this.endTime;
					this.showLoading()
					getSectionStatement({
							sectionStartTime: this.startTime + " 00:00:00",
							sectionEndTime: this.endTime + " 23:59:59"
						})
						.then(res => {
							this.dismissLoading()
							console.log(res)
							this.reportDetail = res.data.sectionStatementDto
							this.isShowReport = true
						})
						.catch(err => {
							this.dismissLoading()
							console.log(err)
						})
				}
			},
			onItemClick(type) {
				uni.navigateTo({
					url: 'statementList/statementList?request=' + encodeURIComponent(JSON.stringify({
						sectionStartTime: this.startTime + " 00:00:00",
						sectionEndTime: this.endTime + " 23:59:59",
						statementItemType: type
					}))
				})
			}
		}
	}
</script>

<style lang="less">
	@import url('./reportScope.less');
</style>
