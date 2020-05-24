<template>
	<view class="card-wrap">

		<view class="tab-title" v-if="isSectionShow">
			<text class="tab" @tap="reportScope">区间财务</text>
			<view style="width: 1px;height: 40rpx;background-color: #ededed;"></view>
			<text class="tab" @tap="yearReportClick">年度财务</text>
		</view>

		<view class="card yellow">
			<text class="card-title">总账面利润</text>
			<text class="card-value">{{grossProfit|formatMoney}}元</text>
			<text class="card-bg-money">&#xe67c;</text>
		</view>

		<view class="card blue">
			<text class="card-title">总账面现金</text>
			<text class="card-value">{{grossCash|formatMoney}}元</text>
			<text class="card-bg-wallet">&#xe621;</text>
		</view>

		<view class="card green">
			<text class="card-title">总未收款</text>
			<text class="card-value">{{grossUncollected|formatMoney}}元</text>
			<text class="card-bg-card">&#xe782;</text>
		</view>
	</view>
</template>

<script>
	import {
		getStatement
	} from '../../../api/statement/statement.js'

	export default {
		data() {
			return {
				grossProfit: 0, // 总账面利润
				grossCash: 0, // 总账面现金
				grossUncollected: 0, //	总未收款
				isSectionShow:false
			}
		},
		filters: {
			formatMoney(val) {
				if (val) {
					var result = [],
						counter = 0;
					let num = (float || 0).toString().split('.')[0].split('');
					for (var i = num.length - 1; i >= 0; i--) {
						counter++;
						result.unshift(num[i]);
						if (!(counter % 3) && i != 0) {
							result.unshift(',');
						}
					}
					if (float.toString().indexOf('.') != -1) {
						return result.join('') + "." + float.toString().split('.')[1];
					}
					return result.join('');
				} else {
					return '0'
				}
			}
		},
		methods: {
			reportScope() {
				uni.navigateTo({
					url: "../../reportScope/reportScope"
				})
			},
			yearReportClick(){
				uni.navigateTo({
					url:'../../reportScope/yearReportScope/yearReportScope'
				})
			}
		},
		onLoad(option) {
			if(option.type == 'BossPage'){
				this.isSectionShow = true
			}
			getStatement()
				.then(res => {
					console.log(res)
					this.grossCash = res.data.cash
					this.grossProfit = res.data.profit
					this.grossUncollected = res.data.uncollected
				})
				.catch(err => {

				})
		}
	}
</script>

<style lang="less">
	@import url('./finance.less');
</style>
