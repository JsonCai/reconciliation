<template>
	<view class="list-wrap">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<view class="msg-label" v-for="(item,index) in dataList" :key="item.messageId" @tap="onClick(item)">
				<image class="msg-icon" :src="item.isRead|readType"></image>
				<text class="msg-title">{{item.messageTitle}}</text>
				<text class="t-time">{{item.createTime}}</text>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollBody from "@/components/mescroll-diy/beibei/mescroll-body.vue";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import {
		getMessageList
	} from '@/api/message/message.js'
	import {
		MessageTypes
	} from '@/config/config.js'

	export default {
		mixins: [MescrollMixin],
		components: {
			MescrollBody
		},
		data() {
			return {
				dataList: []
			};
		},
		filters: {
			readType(type) {
				if (type) {
					return '../../static/images/msg_open.png'
				}
				return '../../static/images/msg_close.png'
			}
		},
		methods: {
			onClick(item) {
				switch (item.channelSerialNumber) {
					case MessageTypes.purchaseCode:
						uni.navigateTo({
							url: '../buyer/applyDetail/applyDetail?id=' + item.externalResource
						})
						break;
					case MessageTypes.revenueCode:
						uni.navigateTo({
							url: '../revenue/revenueDetail/revenueDetail?id=' + item.externalResource
						})
						break;
					case MessageTypes.cashierRemitCode:
						uni.navigateTo({
							url: '../teller/applyDetail/applyDetail?id=' + item.externalResource
						})
						break;
					case MessageTypes.cashierCollectCode:
						uni.navigateTo({
							url: '../revenueDetail/revenueDetail?id=' + item.externalResource
						})
						break;
					case MessageTypes.bossCode:
						uni.navigateTo({
							url: '../BossPage/applyDetail/applyDetail?id=' + item.externalResource
						})
						break;
					case MessageTypes.accountantExpanseCode:
						uni.navigateTo({
							url: '../teller/applyDetail/applyDetail?id=' + item.externalResource
						})
						break;
					case MessageTypes.accountantEarningCode:
						uni.navigateTo({
							url: '../revenueDetail/revenueDetail?id=' + item.externalResource
						})
						break;
				}
			},
			/*下拉刷新的回调 */
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				getMessageList(this.channelSerialNumber)
					.then(res => {
						console.log(res)
						this.dataList = res.data.messages
					})
					.catch(err => {
						console.log(err)
						this.mescroll.endErr()
					})
			}
		},
		onLoad(option) {
			if (option.channelSerialNumber) {
				console.log(option.channelSerialNumber)
				this.channelSerialNumber = option.channelSerialNumber
			}
		}
	}
</script>

<style lang="less">
	@import url('./msgList.less');
</style>
