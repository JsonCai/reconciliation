<template>
	<view class="container">
		<view class="item-list" v-if="isLogin">
			<indexNavItem @handleClick="applyClick('BossPage')" text="审核采购单据" v-if="permissions.includes('审核采购单据')" />
			<indexNavItem @handleClick="financeClick('BossPage')" text="查看财务" v-if="permissions.includes('查看财务报表')&&permissions.includes('查看财务情况')" />
			<indexNavItem @handleClick="applyClick('buyer')" text="提交采购单据" />
			<!-- <indexNavItem @handleClick="applyClick('buyer')" text="提交采购单据" v-if="permissions.includes('提交采购单据')" /> -->
			<indexNavItem @handleClick="revenueClick('revenue')" text="提交营收单据" v-if="permissions.includes('提交营收单据')" />
			<indexNavItem @handleClick="applyClick('teller')" text="接收营收单据" v-if="permissions.includes('接收营收单据')" />
			<indexNavItem @handleClick="revenueClick('teller')" text="接收营收单据" v-if="permissions.includes('接收营收单据')" />
			<indexNavItem @handleClick="financeClick('teller')" text="查看财务情况" v-if="permissions.includes('查看财务情况')" />
			<indexNavItem @handleClick="specialPayments" text="操作特殊单据" v-if="permissions.includes('操作特殊单据')" />
			<indexNavItem @handleClick="applyClick('accountant')" text="确认查看收支单据" v-if="permissions.includes('确认查看收支单据')" />
			<indexNavItem @handleClick="revenueClick('accountant')" text="确认查看收支单据" roleName="会计" v-if="permissions.includes('确认查看收支单据')" />
			<indexNavItem @handleClick="statement" text="查看财务报表"  v-if="permissions.includes('查看财务报表')" />
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
		data() {
			return {
				showApplyBoss: true,
				showFinanceBoss: true,
				showApplyBuyer: true,
				showApplyRevenue: true,
				showCashierApply: true,
				showApplyCashier: true,
				showFinanceApply: true,
				showRevenueRevenuer: true,
				showStatementAccountant: true,
				showRevenueAccountant: true,
				showApplyAccountant: true,
				showFinanceCashier: true
			}
		},
		computed: {
			permissions() {
				return this.$store.state.permissions
			},
			isLogin() {
				console.log(this.$store.state.token)
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
			},
			handleClick(type) {
				// if(type == 'revence'){
				// 	uni.navigateTo({
				// 		url:
				// 	})
				// }
			}
		}
	}
</script>

<style lang="less">
	@import url('./index.less');
</style>
