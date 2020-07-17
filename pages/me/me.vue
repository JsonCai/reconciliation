<template>
	<view class="container">
		<view class="bg">
			<view class="info-wrap">
				<image class="avatar" :src="isLogin ? userInfo.avatarUrl : defaultAvatarSrc"></image>
				<text class="tips" v-if="!isLogin">登录获取更多信息</text>
				<view class="info" v-else>
					<view class="info-item">
						<text>{{ userInfo.employeeName }}</text>
						<image class="sex-img" :src="userInfo.gender == 1 ? boySrc : girlSrc" v-if="userInfo.gender != 0"></image>
					</view>
					<view class="info-item">
						<text class="roleName fc-c">
							角色:
							<text class="ml-20">{{userInfo.roles}}</text>
						</text>
					</view>
				</view>
			</view>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view class="big-btn" @tap="onLogin" v-if="!isLogin">微信授权登录</view>
		<view class="big-btn" @tap="logout" v-else>退出</view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<button class='login_bottom' type='primary' open-type="getUserInfo" withCredentials="true" v-if="!isLogin" lang="zh_CN"
		 @getuserinfo="wxGetUserInfo">
			授权登录
		</button>
		
		<view class="big-btn" @tap="logout" v-else>退出</view>
		
		<!-- #endif -->
		<uni-popup ref="popup" type="center">
			<selectCompany :tenants="tenants" @selCompany="selCompany" />
		</uni-popup>
		<loading :isShow='isShowLoading'></loading>
	</view>
</template>

<script>
	const crypto = require('crypto')
	import {
		login,
		getCompany,
		getWxUid
	} from '@/api/login/login';
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import selectCompany from '@/components/selectCompany/selectCompany'
	import {
		getMessageBox
	} from '@/api/message/message.js'
	export default {
		components: {
			uniPopup,
			selectCompany
		},
		data() {
			return {
				sessionKey:'',
				unionId: '',
				cid: '',
				tenants: [],
				userInfo: {},
				defaultAvatarSrc: '../../static/images/avatar.png',
				loginParams: {},
				isLogin: false,
				boySrc: '../../static/images/boy.png',
				girlSrc: '../../static/images/girl.png',
				permissions: [],
				wxCode: '',
			};
		},
		methods: {
			getNoReadNum(){
				getMessageBox().then(res => {
					if(res.code == '0'){
						const temp = res.data.messageChannels.map(v => v.unReadMessageCount)
						const n = temp.reduce((pre, item) => {
							return pre + item
						}, 0)
						console.log(n)
						uni.setTabBarBadge({
						  index: 1,
						  text:n + ''
						})
					}
				})
			},
			decryptData(sessionKey, encryptedData, iv) {
				sessionKey = new Buffer(sessionKey, 'base64')
				encryptedData = new Buffer(encryptedData, 'base64')
				iv = new Buffer(iv, 'base64')
				let userInfo = null
				try {
					let decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
					decipher.setAutoPadding(true)
					let decoded = decipher.update(encryptedData, 'binary', 'utf8')
					decoded += decipher.final('utf8')
					userInfo = JSON.parse(decoded)
				} catch (err) {
					console.log(err)
				}
	
				return userInfo
			},
			doLogin() {
				login({
					tenantId: this.cid,
					wechatNumber: this.unionId
				}).then(res => {
					this.isLogin = true
					if (res.header['Set-Authorization']) {
						const token = res.header['Set-Authorization']
						this.setToken(token)
					}
					if (res.data.data.roles) {
						console.log(res.data.data.roles)
						this.setRoles(res.data.data.roles)
						this.roles = res.data.data.roles.map(v => v.roleName)
					}
					if (res.data.data.employee) {
						this.userInfo = Object.assign({}, res.data.data.employee, this.userInfo)
						this.$set(this.userInfo, 'roles', this.roles.join(','))
						this.setUserInfo(this.userInfo)
					}
					if (res.data.data.employee.tenantId) {
						this.setCompanyId(res.data.data.employee.tenantId)
					}
					this.getNoReadNum()
				}).catch(err => {
					uni.showToast({
						icon: 'none',
						title: '登录失败'
					})
				})
			},
			selCompany(id) {
				this.cid = id
				this.$store.commit('setCid', this.cid)
				this.$refs.popup.close()
				this.doLogin()
			},
			wxGetUserInfo(re) {
				this.showLoading()
				let _this = this;
				console.log(re)
				const encryptedData = re.detail.encryptedData
				const iv = re.detail.iv
				const uInfo = this.decryptData(this.sessionKey,encryptedData,iv)
				this.unionId = uInfo.unionId
				uni.getUserInfo({
					provider: 'weixin',
					success: function(infoRes) {
						_this.userInfo = infoRes.userInfo
						_this.getCompany()
					},
					fail(res) {}
				});
			},
			logout() {
				let _this = this
				uni.showModal({
					title: '温馨提示',
					content: '确定退出登录?',
					success: function(res) {
						if (res.confirm) {
							try {
								_this.isLogin = false
								uni.clearStorageSync();
								uni.removeTabBarBadge({
									index:1,
									success:function(){}
								})
								// #ifdef MP-WEIXIN
									this.showLoading()
									uni.login({
										provider: 'weixin',
										success: (res) => {
											console.log(res)
											if (res.errMsg == 'login:ok') {
												this.wxCode = res.code
												console.log(this.wxCode)
												getWxUid({
													code:this.wxCode
												}).then(r => {
													this.sessionKey = r.data.data.unionid
													this.dismissLoading()
												})
											}
										},
									})
								// #endif  
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
			setCompanyId(companyId) {
				this.$store.commit('setCid', companyId)
				try {
					uni.setStorageSync('companyId', companyId);
				} catch (e) {

				}
			},
			getCompany(){
				const p = getCompany(this.unionId)
				const p1 = p.then(res => {
					console.log(res)
					this.dismissLoading()
					if (res.data.code == 0) {
						this.tenants = res.data.data.tenants
						if (this.tenants.length > 1) {
							this.$refs.popup.open()
						} else {
							this.cid = this.tenants[0].tenantId
							this.$store.commit('setCid', this.cid)
							this.doLogin()
						}
					} else {
						this.dismissLoading()
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}
				}).catch((err) => {
					console.log(err)
					this.dismissLoading()
					uni.showToast({
						title: err,
						icon: 'none'
					})
				})
			},
			onLogin() {
				let _this = this
				this.showLoading()
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						// 获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success: function(res) {
								if (res.errMsg == 'getUserInfo:ok') {
									_this.unionId = res.userInfo.unionId;
									console.log(res)
									_this.userInfo = res.userInfo
									_this.getCompany()
								}
							},
							fail: (err) => {
								console.log(err)
								_this.dismissLoading()
							}
						});
					},
					fail: () => {
						_this.dismissLoading()
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
					const cid = uni.getStorageSync('companyId')
					console.log(cid)
					this.$store.commit('setCid', cid)
					if (userInfo) {
						this.userInfo = userInfo
					}
					this.getNoReadNum()
				} catch (e) {
					// error
				}
			}else{
				// #ifdef MP-WEIXIN  
					this.showLoading()
					uni.login({
						provider: 'weixin',
						success: (res) => {
							console.log(res)
							if (res.errMsg == 'login:ok') {
								this.wxCode = res.code
								console.log(this.wxCode)
								getWxUid({
									code:this.wxCode
								}).then(r => {
									this.sessionKey = r.data.data.unionid
									this.dismissLoading()
								})
							}
						},
					})
				// #endif  
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

	.login_bottom {
		width: 650rpx;
		margin-top: 400rpx;
	}
</style>
