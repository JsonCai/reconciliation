<template>
	<view class="img-list">
		<view class="img-box" v-for="(img, index) in dataList" :key="index">
			<!-- <image class="item-img" :src="img" @tap="onPrevies(index)"></image> -->
			<view class="del-img font-icon" @tap="ondel(index)">&#xe635;</view>
		</view>
		<view class="img-box">
			<image src="../../static/images/add.png" v-if="!isDisabled" @tap="addImg" class="item-img"></image>
		</view>
		<div class="itemempty"></div>
		<div class="itemempty"></div>
		<div class="itemempty"></div>
	</view>
</template>
<script>
	import {
		deepClone
	} from '@/libs/utils';
	export default {
		props: {
			list: Array,
			isDisabled: false
		},
		data() {
			return {
				dataList: [],
				showAdd: Boolean
			};
		},
		watch: {
			list: {
				handler(val) {
					console.log(val)
					if (val) {
						this.dataList = deepClone(val)
					}
				},
				immediate: true
			}
			// isDisabled:{
			// 	handler(val) {
			// 		console.log(val)
			// 		if (val) {
			// 			this.showAdd = deepClone(val)
			// 		}
			// 	},
			// 	immediate: true
			// }
		},
		methods: {
			onPrevies(index) {
				uni.previewImage({
					current: index, // 当前显示图片的http链接
					urls: this.dataList
				});
			},
			ondel(idx) {
				this.dataList = this.dataList.filter((v, index) => index != idx);
				this.$emit('changeImgList', deepClone(this.dataList))
			},
			addImg() {
				const _this = this;
				uni.chooseImage({
					count: 9,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success(res) {
						// tempFilePath可以作为img标签的src属性显示图片
						const tempFilePaths = res.tempFiles
						let arr = _this.dataList;
						arr.push(...tempFilePaths);
						if (arr.length > 9) {
							uni.showToast({
								title: '图片不能超过9张',
								icon: 'none'
							});
							arr = arr.slice(0, 9);
						}
						_this.$emit('changeImgList', deepClone(_this.dataList))
					}
				});
			},
		}
	};
</script>
<style lang="less">
	.img-wrap {
		display: flex;
		justify-content: space-between;
		margin-top: 30rpx;
		padding-bottom: 10rpx;
		border-bottom: 1rpx solid #e5e5e5;
	}

	.img-list {
		width: 540rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		align-items: center;
	}

	.img-box {
		width: 140rpx;
		height: 140rpx;
		margin-bottom: 20rpx;
		position: relative;
	}

	.item-img {
		width: 100%;
		height: 100%;
	}

	.itemempty {
		height: 0;
		width: 140rpx;
	}

	.del-img {
		font-size: 50rpx;
		position: absolute;
		right: -20rpx;
		top: -20rpx;
	}
</style>
