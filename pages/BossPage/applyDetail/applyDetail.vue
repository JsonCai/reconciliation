<template>
	<view class="container bg-f5">
		<view class="content-wrap">
			<view class="title item-wrap">
				<image src="../../../static/images/apply.png" class="icon-wallet mr-20"></image>
				<text class="title-text">订单信息</text>
			</view>
			<view class="item-wrap">
				<text>名称:</text>
				<text>{{detailForm.expenseAccountTitle}}</text>
			</view>
			<view class="item-wrap" v-if="detailForm.costCategory">
				<text>分类:</text>
				<text>{{detailForm.costCategory.costCategoryName}}</text>
			</view>
			<view class="item-wrap">
				<text>金额:</text>
				<text>{{detailForm.amount}}元</text>
			</view>
			<view class="item-wrap">
				<text>报销日期:</text>
				<text>{{detailForm.expenseTime}}</text>
			</view>
			<view class="img-wrap fc-6">
				<text class="fc-30 fc-6">凭据：</text>
				<imgList :list="detailForm.imgList" :isDisabled="true" />
			</view>
			<view class="item-wrap">
				<text>申请日期:</text>
				<text>{{detailForm.applyTime}}</text>
			</view>
			<view class="item-wrap" v-if="detailForm.applyPerson">
				<text>申请人:</text>
				<text>{{detailForm.applyPerson.employeeName}}</text>
			</view>
			<view class="title item-wrap" v-if="detailForm.approvals">
				<image src="../../../static/images/progress.png" class="icon-wallet mr-20"></image>
				<text class="title-text">审批历史</text>
			</view>
			<view class="item-cross-line" v-if="detailForm.approvals" v-for="(item,index) in detailForm.approvals" :key="item.createTime">
				<view class="item-nowrap">
					<text>审批意见</text>
					<text>通过</text>
				</view>
				<view class="item-nowrap">
					<text>审批时间</text>
					<text>2020-06-01</text>
				</view>
				<view class="item-nowrap">
					<text>审批人</text>
					<text>黄总</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import imgList from '@/components/imgList/imgList.vue'
	import {applyDetail} from '@/api/apply/apply.js'
	export default {
		components: {
			imgList
		},
		data() {
			return {
				detailForm: {}
			}
		},
		methods: {

		},
		onLoad(option) {
			console.log(option)
			applyDetail(option.id)
			.then(res=>{
				console.log(res)
				this.$set(this,"detailForm",res.data.data.expenseAccount)
			})
			.catch(err=>{
				console.log(err)
			})
		}
	}
</script>

<style lang="less" scoped>
	@import url('../../../common/detailForm.less');
</style>
