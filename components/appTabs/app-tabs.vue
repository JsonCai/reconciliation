<!-- 
tab组件: 
<app-tabs v-model="tabIndex" :tabs="tabs" @change="tabChange"></app-tabs>
tabs支持的数据格式： ['全部', '待付款'] 或 [{name:'全部'}, {name:'待付款'}]
-->
<template>
	<view v-if="tabs && tabs.length" class="app-tabs" :class="{'tabs-fixed': fixed}" :style="{'top':top+'rpx'}">
		<view class="tabs-item">
			<view class="tab-item" v-for="(tab, i) in tabs" :class="{'active': value===i}" :key="i" @click="tabClick(i)">
				{{getTabName(tab)}}
			</view>
		</view>
		<view class="tabs-line" :style="{left:lineLift}"></view>
	</view>
</template>

<script>
	export default {
		props:{
			tabs: Array,
			value: { // 当前显示的下标 (使用v-model语法糖: 1.props需为value; 2.需回调input事件)
				type: [String, Number],
				default(){
					return 0
				}
			},
			fixed: Boolean, // 是否悬浮,默认false
			top:{
				type:Number,
				default:0
			}
		},
		computed: {
			lineLift() {
				return 100/this.tabs.length*(this.value + 1) - 100/(this.tabs.length*2) + '%'
			}
		},
		methods: {
			getTabName(tab){
				return typeof tab === "object" ? tab.name : tab
			},
			tabClick(i){
				if(this.value!=i){
					this.$emit("input",i);
					this.$emit("change",i);
				}
			}
		}
	}
</script>

<style>
	.app-tabs{
		position: relative;
		height: 100rpx;
		font-size: 28rpx;
		background-color: #fff;
		border-bottom: 1rpx solid #eee;
		width: 100%;;
	}
	.app-tabs .tabs-item{
		display: flex;
		text-align: center;
		align-items: center;
		height:100%;
	}
	.app-tabs .tabs-item .tab-item{
		flex: 1;
	}
	.app-tabs .tabs-item .active{
		color: #06bebe;
	}
	.app-tabs .tabs-line{
		position: absolute;
		bottom: 0;
		width: 40rpx;
		height: 6rpx;
		transform: translateX(-50%);
		border-radius: 4rpx;
		transition: left .3s;
		background: #06bebe;
	}
	
	/*悬浮*/
	.app-tabs.tabs-fixed{
		z-index: 100;
		position: fixed;
		top: var(--window-top);
		left: 0;
		width: 100%;
	}
</style>
