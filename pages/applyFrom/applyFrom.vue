<template>
	<view class="container bg-f5">
		<view class="content-wrap">
			<view class="title item-wrap">
				<image src="../../static/images/apply.png" class="icon-wallet mr-20"></image>
				<text class="title-text">订单信息</text>
			</view>
			<view class="item-wrap">
				<text>名称:</text>
				<input class="input-text" placeholder="请输入名称" placeholder-class="place" v-model="detailForm.name" />
			</view>
			<view class="item-wrap">
				<text>分类:</text>
				<picker :value="categoryIndex" :disabled="isDisabled" range-key="label" :range="categoryList">
					<view class="picker"><text class="fc-9">请选择分类</text></view>
				</picker>
			</view>
			<view class="item-wrap">
				<text>申报金额:</text>
				<input class="input-text" placeholder="请输入申报金额" placeholder-class="place" v-model="detailForm.declareMoney" />
			</view>
			<view class="item-wrap">
				<text>申报日期:</text>
				<view class="inner-wrap" @tap="onStartTimeTap(1)">
					<text v-if="!detailForm.declareTime" class="fc-9">请选择申报日期</text>
					<text v-else>{{ detailForm.declareTime | formatDate }}</text>
					<text class="font-icon">&#xe662;</text>
				</view>
			</view>
			<view class="item-wrap">
				<text>结束日期:</text>
				<text>2020-03-04</text>
			</view>
			<view class="img-wrap fc-6">
			      <text class="fc-30">凭据：</text>
			      <view class="img-list">
			        <view class="img-box" v-for="(img,index) in detailForm.imgList" :key="index">
			          <image class="item-img" :src="item" @tap="onPrevies" ></image>
			          <image class="del-img"  @tap="ondel(index)" ></image>
			        </view>
			        <view class="font-icon add-icon" @tap="addImg" v-if="!isDisabled">&#xe62c;</view>
			        <div class="itemempty"></div>
			        <div class="itemempty"></div>
			        <div class="itemempty"></div>
			      </view>
			    </view>
		</view>
		<timePicker :requestCode="timeCode" :show="showTimePicker" @onConfirm="timePickConfirm" @onCancel="showTimePicker = false"></timePicker>
	</view>
</template>

<script>
import { categoryList } from '@/libs/testDates';
import timePicker from '@/components/timePicker/timePicker';
export default {
	components: {
		timePicker
	},
	data() {
		return {
			showTimePicker: false,
			timeCode: 0,
			isDisabled: false,
			detailForm: {
				imgList:[]
			},
			categoryList,
			categoryIndex: 0
		};
	},
	methods: {
		addImg(){},
		onPrevies(){},
		onStartTimeTap(code) {
			this.timeCode = code;
			this.showTimePicker = true;
		},
		changeName(val) {
			console.log(val);
			this.$set(this.detailForm, 'name');
		},
		timePickConfirm(time) {
			this.showTimePicker = false;
			if (time.code == 1) {
				this.$set(this.detailForm, 'declareTime', time);
			}
		}
	},
	created() {
		console.log(categoryList);
	}
};
</script>

<style lang="less" scoped>
@import url('../../common/detailForm.less');
</style>
