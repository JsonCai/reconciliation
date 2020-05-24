<template>
	<view class="container">
		<view class="bg">
			<view class="info-wrap">
				<image class="avatar" :src="isLogin ? userInfo.avatarUrl : defaultAvatarSrc"></image>
				<text class="tips" v-if="!isLogin">登录获取更多信息</text>
				<view class="info" v-else>
					<view class="info-item">
						<text>{{ userInfo.employeeName }}</text>
						<image class="sex-img" :src="userInfo.gender == 1 ? boySrc : girlSrc"></image>
					</view>
					<view class="info-item">
						<text class="roleName fc-c">
							职位:
							<text class="ml-20">{{userInfo.roles}}</text>
						</text>
					</view>
				</view>
			</view>
		</view>
		<view class="big-btn" @tap="onLogin" v-if="!isLogin">微信授权登录</view>
		<view class="big-btn" @tap="logout" v-else>退出</view>
	</view>
</template>
<script>
	import {
		login,
		getCompany
	} from '@/api/login/login';
	export default {
		data() {
			return {
				userInfo: {},
				defaultAvatarSrc: '../../static/images/avatar.png',
				loginParams: {},
				isLogin: false,
				userInfo: {},
				boySrc: '../../static/images/boy.png',
				girlSrc: '../../static/images/girl.png',
				permissions: [],
				roles: []
			};
		},
		methods: {
			logout() {
				let _this = this
				uni.showModal({
					title: '温馨提示',
					content: '确定退出登录?',
					success: function(res) {
						if (res.confirm) {
							_this.isLogin = false
							try {
								uni.clearStorageSync();
							} catch (e) {
								// error
							}
						}
					}
				});
			},
			checkLogin() {
				try {
					const token = uni.getStorageSync('token');
					if (token) {
						return true
					} else {
						return false
					}
				} catch (e) {
					// error
				}
			},
			setRoles(roles) {
				this.$store.commit('setRoles', roles)
				try {
					uni.setStorageSync('roles', roles);
				} catch (e) {}
			},
			setToken(token) {
				this.$store.commit('setToken', token)
				try {
					uni.setStorageSync('token', token);
				} catch (e) {}
			},
			setUserInfo(userInfo) {
				try {
					uni.setStorageSync('userInfo', userInfo);
				} catch (e) {

				}
			},
			onLogin() {
				let _this = this
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						_this.isLogin = true
						// 获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success: function(res) {
								if (res.errMsg == 'getUserInfo:ok') {
									const openId = res.userInfo.openId;
									_this.userInfo = res.userInfo
									console.log(_this.userInfo)
									const p = getCompany(openId)
									const p1 = p.then(res => {
										if (res.data.code == 0) {
											const tenants = res.data.data.tenants
											return login({
												tenantId: tenants[0].tenantId,
												wechatNumber: openId
											})
										}
									})
									p1.then(res => {
										if (res.header['Set-Authorization']) {
											const token = res.header['Set-Authorization']
											_this.setToken(token)
										}
										if (res.data.data.roles) {
											console.log(res.data.data.roles)
											_this.setRoles(res.data.data.roles)
											_this.roles = res.data.data.roles.map(v => v.roleName)
										}
										if (res.data.data.employee) {
											_this.userInfo = Object.assign({}, res.data.data.employee, _this.userInfo)
											_this.$set(_this.userInfo, 'roles', _this.roles.join(','))
											_this.setUserInfo(_this.userInfo)
	 
										}
									})
								}
							}
						});
					}
				});
			}
		},
		onLoad() {
			if (this.checkLogin()) {
				this.isLogin = true
				try {
					const userInfo = uni.getStorageSync('userInfo');
					const token = uni.getStorageSync('token')
					this.$store.commit('setToken', token)
					const roles = uni.getStorageSync('roles')
					this.$store.commit('setRoles', roles)
					if (userInfo) {
						this.userInfo = userInfo
					}
				} catch (e) {
					// error
				}
			}
		}
	};
</script>

<style lang="less">
	.bg {
		width: 100%;
		height: 360rpx;
		background: #06bebe;
		position: relative;
	}

	.info-wrap {
		width: 690rpx;
		height: 220rpx;
		background: #fff;
		position: absolute;
		left: 50%;
		bottom: -100rpx;
		margin-left: -345rpx;
		border-radius: 10rpx;
		box-shadow: 0rpx 2rpx 14rpx 4rpx rgba(0, 0, 0, 0.2);
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.avatar {
		width: 140rpx;
		height: 140rpx;
		border-radius: 50%;
		position: absolute;
		left: 50%;
		margin-left: -70rpx;
		top: -70rpx;


	}

	.tips {
		color: #666;
		font-size: 32rpx;
		position: absolute;
		bottom: 60rpx;
	}

	.me-btn {
		margin-top: 400rpx;
	}

	.info {
		font-size: 30rpx;
		margin-top: 100rpx;
	}

	.sex-img {
		width: 26rpx;
		height: 26rpx;
		margin-left: 20rpx;
	}

	.info-item {
		margin-bottom: 10rpx;
	}

	.big-btn {
		width: 80%;
		position: absolute;
		bottom: 100rpx;
		left: 50%;
		margin-left: -40%;
		height: 90rpx;
		font-size: 32rpx;
		border-radius: 14rpx;
		text-align: center;
		color: #fff;
		line-height: 90rpx;
		background: #06bebe;
	}
</style>
