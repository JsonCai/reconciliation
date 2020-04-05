<template>
	<view class="list-item" @tap="clickitem" >
	  <movable-area>
	    <movable-view damping="20" out-of-bounds="true" direction="horizontal" x="x" animation="false" 
	    :friction="1"
	  capture-bind:touchend="handleTouchend">
	      <view class="main_item_content ">
	        <view class="tag">
	        
	          <text>{{applyItem.state}}</text>
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
	    </movable-view>
	  </movable-area>
	  <view class="delete_btn "  @tap="del">删除</view>
	</view>
</template>

<script>
	import mixin from '../../libs/mixin/listItemMixin.js'
	export default {
		mixins:[mixin],
		props:{
			applyItem:Object
		}
	}
</script>

<style>
</style>
