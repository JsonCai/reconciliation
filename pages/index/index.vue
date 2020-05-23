<template>
	<view class="container">
		<view class="item-list" v-if="isLogin">
			<view v-for="(item,index) in roles" :key="index">
				<view class="title-wrap">
					<text>{{item.roleName}}</text>
				</view>
				<view v-if="item.permissions">
					<indexNavItem @handleClick="applyClick('BossPage')" text="审核采购单据" v-if="item.permissions.includes('审核采购单据')" />
					<indexNavItem @handleClick="financeClick('BossPage')" text="查看财务" v-if="item.permissions.includes('查看财务报表')&& item.permissions.includes('查看财务情况')" />
					<indexNavItem @handleClick="applyClick('buyer')" text="提交采购单据" v-if="item.permissions.includes('提交采购单据')" />
					<indexNavItem @handleClick="revenueClick('revenue')" text="提交营收单据" v-if="item.permissions.includes('提交营收单据')" />
					<indexNavItem @handleClick="applyClick('teller')" text="接收报销单据" v-if="item.permissions.includes('接收报销单据')" />
					<indexNavItem @handleClick="revenueClick('teller')" text="接收营收单据" v-if="item.permissions.includes('接收营收单据')" />
					<indexNavItem @handleClick="financeClick('teller')" text="查看财务情况" v-if="item.permissions.includes('查看财务情况')" />
					<indexNavItem @handleClick="specialPayments" text="操作特殊单据" v-if="item.permissions.includes('操作特殊单据')" />
					<indexNavItem @handleClick="applyClick('accountant')" text="确认查看报销单据" v-if="item.permissions.includes('确认查看收支单据')" />
					<indexNavItem @handleClick="revenueClick('accountant')" text="确认查看营收单据"  v-if="item.permissions.includes('确认查看收支单据')" />
					<indexNavItem @handleClick="statement" text="查看财务报表" v-if="item.permissions.includes('查看财务报表')" />
				</view>
			</view>
		</view>
		<noLogin v-else />
	</view>
</template>
<script>
	import indexNavItem from '@/components/indexNavItem/indexNavItem.vue'
	import noLogin from '@/components/noLogin/noLogin.vue'
	export default {
		components: {
			indexNavItem,
			noLogin
		},
		computed: {
			roles() {
				return this.$store.state.roles
			},
			isLogin() {
				if (this.$store.state.token) return true
				else return false
			}
		},
		methods: {
			applyClick(type) {
				uni.navigateTo({
					url: '/pages/' + type + '/apply/applyPage'
				})
			},
			financeClick(type) {
				uni.navigateTo({
					url: '/pages/BossPage/finance/finance?type=' + type
				})
			},
			revenueClick(type) {
				uni.navigateTo({
					url: '../' + type + '/revenue/revenuePage'
				})
			},
			specialPayments() {
				uni.navigateTo({
					url: '../specialPayments/paymentList/paymentList'
				})
			},
			statement() {
				uni.navigateTo({
					url: '../reportScope/reportScope'
				})
			}
		}
	}
</script>

<style lang="less">
	.container{
		width: 100%;
	}
	.title-wrap{
		background: #fff;
		margin-bottom: 20rpx;
		height:100rpx;
		line-height: 100rpx;
		text{
			margin: 20rpx;
			font-size: 36rpx;
		}
	}
</style>
