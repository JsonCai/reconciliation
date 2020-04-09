<template>
	<view class="container">
		<view class="item-list">
			<indexNavItem  @handleClick="handleClick('ApplyBoss')" text="报销" roleName="老板" v-if="showApplyBoss"/>
			<indexNavItem @handleClick="handleClick" text="财务" roleName="老板" v-if="showFinanceBoss"/>
			<indexNavItem @handleClick="handleClick('ApplyBuyer')" text="报销" roleName="采购" v-if="showApplyBuyer"/>
			<indexNavItem @handleClick="handleClick" text="营收" roleName="营收" v-if="showRevenueRevenuer"/>
			<indexNavItem @handleClick="handleClick" text="报销" roleName="出纳" v-if="showApplyCashier"/>
			<indexNavItem @handleClick="handleClick" text="营收" roleName="出纳" v-if="showApplyCashier"/>
			<indexNavItem @handleClick="handleClick" text="财务" roleName="出纳" v-if="showFinanceCashier"/>
			<indexNavItem @handleClick="handleClick" text="报销" roleName="会计" v-if="showApplyAccountant"/>
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
			handleClick(type){
				if(type == 'ApplyBoss'){
					uni.navigateTo({
						url:'/pages/BossPage/apply/apply'
					})
				}else if(type == 'ApplyBuyer'){
					uni.navigateTo({
						url:'/pages/buyer/apply/apply'
					})
				}
			}
		}
	}
</script>

<style lang="less">
	@import url('./index.less');
</style>
