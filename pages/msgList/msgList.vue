<template>
	<view class="list-wrap">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<view class="msg-label" v-for="(item,index) in dataList" :key="item.messageId" @tap="onClick(item)">
				<image class="msg-img" :src="item.img"></image>
				<view class="v-text">
					<text class="msg-title">{{item.messageTitle}}</text>
					<text class="msg-content">{{item.messageContent}}</text>
				</view>
				<view class="v-text">
					<text class="msg-title">{{item.createTime}}</text>
					<text class="msg-content">{{item.isRead|readType}}</text>
				</view>
				<text class="arrow-right">&#xe662;</text>
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
					return '已读'
				}
				return '未读'
			}
		},
		methods: {
			onClick(code) {
				// switch (code) {
				// 	case purchaseCode:
				// 		console.log(code)
				// 		break;
				// 	case revenueCode:
				// 		console.log(code)
				// 		break;
				// 	case cashierRemitCode:
				// 		console.log(code)
				// 		break;
				// 	case cashierCollectCode:
				// 		console.log(code)
				// 		break;
				// 	case bossCode:
				// 		console.log(code)
				// 		break;
				// 	case accountantExpanseCode:
				// 		console.log(code)
				// 		break;
				// 	case accountantEarningCode:
				// 		console.log(code)
				// 		break;
				// }
			},
			/*下拉刷新的回调 */
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				getMessageList(this.channelSerialNumber)
					.then(res => {
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
				this.channelSerialNumber = option.channelSerialNumber
			}
		}
	}
</script>

<style>
	@import url('./msgList.less');
</style>
