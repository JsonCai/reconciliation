<template>
	<view class="container">
		<view class="item-list" v-if="isLogin">
			{{JSON.stringify(permissions)}}
			<indexNavItem @handleClick="applyClick('BossPage')" text="报销" roleName="老板" v-if="showApplyBoss" />
			<indexNavItem @handleClick="financeClick('BossPage')" text="财务" roleName="老板" v-if="showFinanceBoss" />
			<indexNavItem @handleClick="applyClick('buyer')" text="报销" roleName="采购" v-if="showApplyBuyer" />
			<indexNavItem @handleClick="revenueClick('revenue')" text="营收" roleName="营收" v-if="showRevenueRevenuer" />
			<indexNavItem @handleClick="applyClick('teller')" text="报销" roleName="出纳" v-if="showApplyCashier" />
			<indexNavItem @handleClick="revenueClick('teller')" text="营收" roleName="出纳" v-if="showApplyCashier" />
			<indexNavItem @handleClick="financeClick('BossPage')" text="财务" roleName="出纳" v-if="showFinanceCashier" />
			<indexNavItem @handleClick="specialPayments" text="特殊收支" roleName="出纳" v-if="showFinanceCashier" />
			<indexNavItem @handleClick="applyClick('accountant')" text="报销" roleName="会计" v-if="showApplyAccountant" />
			<indexNavItem @handleClick="revenueClick('accountant')" text="营收" roleName="会计" v-if="showRevenueAccountant" />
			<indexNavItem @handleClick="statement" text="报表" roleName="会计" v-if="showStatementAccountant" />
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
					url: '/pages/' + type + '/finance/finance'
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
					url:'../reportScope/reportScope'
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
