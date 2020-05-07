<template>
	<view class="container">
		<view class="item-list">
			<indexNavItem  @handleClick="applyClick('BossPage')" text="报销" roleName="老板" v-if="showApplyBoss"/>
			<indexNavItem @handleClick="financeClick('BossPage')" text="财务" roleName="老板" v-if="showFinanceBoss"/>
			<indexNavItem @handleClick="applyClick('buyer')" text="报销" roleName="采购" v-if="showApplyBuyer"/>
			<indexNavItem @handleClick="revenueClick('revenue')" text="营收" roleName="营收" v-if="showRevenueRevenuer"/>
			<indexNavItem @handleClick="applyClick('teller')" text="报销" roleName="出纳" v-if="showApplyCashier"/>
			<indexNavItem @handleClick="financeClick('revenue')" text="财务" roleName="出纳" v-if="showFinanceCashier"/>
			<indexNavItem @handleClick="applyClick('accountant')" text="报销" roleName="会计" v-if="showApplyAccountant"/>
			<indexNavItem @handleClick="handleClick" text="营收" roleName="会计" v-if="showRevenueAccountant"/>
			<indexNavItem @handleClick="handleClick" text="报表" roleName="会计" v-if="showStatementAccountant"/>
		</view>
	</view>
</template>
<script>
	import indexNavItem from '../../components/indexNavItem/indexNavItem.vue'
	export default {
		components:{
			indexNavItem
		},
		data() {
			return {
				showApplyBoss:true,
				showFinanceBoss:true,
				showApplyBuyer:true,
				showApplyRevenue:true,
				showCashierApply:true,
				showApplyCashier:true,
				showFinanceApply:true,
				showRevenueRevenuer:true,
				showStatementAccountant:true,
				showRevenueAccountant:true,
				showApplyAccountant:true,
				showFinanceCashier:true
			}
		},
		onLoad() {

		},
		methods: {
			applyClick(type){
				uni.navigateTo({
					url:'/pages/'+type+'/apply/applyPage'
				})
			},
			financeClick(type){
				uni.navigateTo({
					url:'/pages/'+type+'/finance/finance'
				})
			},
			revenueClick(type){
				uni.navigateTo({
					url:'../revenue/revenue/revenuePage'
				})
			},
			handleClick(type){
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
