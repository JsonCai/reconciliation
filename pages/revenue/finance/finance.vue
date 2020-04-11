<template>
	<view class="card-wrap">

		<view class="tab-title">
			<text class="tab">区间财务</text>
			<view style="width: 1px;height: 40rpx;background-color: #ededed;"></view>
			<text class="tab">年度财务</text>
		</view>

		<view class="card yellow">
			<text class="card-title">总账面利润</text>
			<text class="card-value">{{formatGrissProfit}}元</text>
			<text class="card-bg-money">&#xe67c;</text>
		</view>

		<view class="card blue">
			<text class="card-title">总账面现金</text>
			<text class="card-value">{{formatGrissCarsh}}元</text>
			<text class="card-bg-wallet">&#xe621;</text>
		</view>

		<view class="card green">
			<text class="card-title">总未收款</text>
			<text class="card-value">{{formatGrissUncollected}}元</text>
			<text class="card-bg-card">&#xe782;</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				grossProfit: 99999.69, // 总账面利润
				grossCash: 465465464564.25, // 总账面现金
				grossUncollected: 21584146546.75 //	总未收款
			}
		},
		computed: {
			formatGrissProfit() {
				return this.toThousands(this.grossProfit)
			},
			formatGrissCarsh() {
				return this.toThousands(this.grossCash)
			},
			formatGrissUncollected() {
				return this.toThousands(this.grossUncollected)
			}
		},
		methods: {
			toThousands(float) {
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
			}
		}
	}
</script>

<style lang="less">
	@import url('./finance.less');
</style>
