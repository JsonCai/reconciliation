<template>
	<view class="list-item" @tap="clickitem(applyItem)">
	      <view class="main_item_content ">
	        <view class="tag">
	          <text>{{applyItem.state | formatState}}</text>
	        </view>
	        <view class="main-wrap">
	          <view class="item-wrap ">
	            <text>名称：</text>
	            <text>{{applyItem.name}}</text>
	          </view>
	          <view class="item-wrap ">
	            <text>分类：</text>
	            <text>{{applyItem.category}}</text>
	          </view>
	          <view class="item-wrap price-wrap">
	            <view>
	              <text>价格：</text>
	              <text class="fc-r">￥{{applyItem.price}}</text>
	            </view>
	            <text class="apply-time fc-6">{{applyItem.applyTime}}</text>
	          </view>
	        </view>
	        <image class="arrow" :src="arrowSrc"></image>
	      </view>
	</view>
</template>

<script>
	import mixin from '../../libs/mixin/listItemMixin.js'
	export default {
		mixins:[mixin],
		props:{
			applyItem:Object
		},
		filters:{
			formatState(val){
				if(val == '1'){
					return '未提交'
				}else if(val == '2'){
					return '已提交'
				}else if(val == '3'){
					return '未通过'
				}else if(val == '4'){
					return '已成功'
				}
			}
		},
		methods:{
			onLongpress(){
				uni.showModal({
				    title: '提示',
				    content: '确定要删除？',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
		}
	}
</script>

<style lang="less">
	@import url('../../common/list-item.less');
</style>
