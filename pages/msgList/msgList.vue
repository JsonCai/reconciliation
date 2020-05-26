<template>
	<view class="list-wrap">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<view class="msg-label" v-for="(item,index) in dataList" :key="item.messageId" @tap="onClick(item)">
				<image class="msg-icon" :src="item.isRead|readType"></image>
				<view>
					<text class="msg-title">{{item.messageTitle}}</text>
					<text class="t-time fc-9">{{item.createTime}}</text>
				</view>
			</view>
		</mescroll-body>
		<loading :isShow='isShowLoading'></loading>
	</view>
</template>

<script>
	import MescrollBody from "@/components/mescroll-diy/beibei/mescroll-body.vue";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import {
		getMessageList,
		readMsg
	} from '@/api/message/message.js'
	import {
		MessageTypes,
		REFRESH_DELAYED
	} from '@/config/config.js'
	import {
		applyDetail
	} from '@/api/apply/apply.js'
	import {
		revenueDetail
	} from '../../api/revenue/revenue.js'

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
			reload() {
				this.mescroll && this.mescroll.resetUpScroll()
			},
			onClick(item) {
				console.log(item)
				readMsg({
					channelSerialNumber: item.channelSerialNumber,
					messageId: item.messageId
				}).then(res => {
					if (res.code == '0') {
						setTimeout(() => {
							uni.$emit('reloadMsg')
						}, REFRESH_DELAYED)
					}
				}).catch(err => {
					console.log(err)
				})
				switch (item.channelSerialNumber) {
					case MessageTypes.purchaseCode:
						this.showLoading()
						applyDetail(item.externalResource)
							.then(res => {
								this.dismissLoading()
								if (res.data.expenseAccount.expenseAccountStatus.value != 3) {
									uni.navigateTo({
										url: '../buyer/applyDetail/applyDetail?id=' + item.externalResource
									})
								} else {
									uni.navigateTo({
										url: '../applyForm/applyForm?id=' + item.externalResource
									})
								}
							})
							.catch(err => {
								this.dismissLoading()
								console.log(err)
								uni.showToast({
									icon: 'none',
									title: "网络请求错误"
								})
							})

						break;
					case MessageTypes.revenueCode:
						this.showLoading()
						revenueDetail(item.externalResource)
							.then(res => {
								this.dismissLoading()
								console.log(res)
								if (res.data.revenueAccount.revenueAccountStatus.value != 3) {
									uni.navigateTo({
										url: '../revenueDetail/revenueDetail?id=' + item.externalResource
									})
								} else {
									uni.navigateTo({
										url: '../revenueForm/revenueForm?id=' + item.externalResource
									})
								}
							})
							.catch(err => {
								this.dismissLoading()
								console.log(err)
								uni.showToast({
									icon: 'none',
									title: "网络请求错误"
								})
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
							url: '../revenue/revenueDetail/revenueDetail?id=' + item.externalResource
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
						this.dataList = res.data.messages
						this.mescroll.endSuccess(res.data.messages.length);
					})
					.catch(err => {
						this.dataList = []
						this.mescroll.endSuccess(0);
						uni.showToast({
							icon: 'none',
							title: "请求失败"
						})
					})
			}
		},
		onLoad(option) {
			if (option.channelSerialNumber) {
				this.channelSerialNumber = option.channelSerialNumber
			}
			uni.$on("reloadMsg", () => {
				console.log('刷新已读')
				this.reload()
			})
		}
	}
</script>

<style lang="less">
	@import url('./msgList.less');
</style>
