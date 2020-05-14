<template>
	<view class="container">
		<view class="bg">
			<view class="info-wrap">
				<image class="avatar" :src="isLogin ? userInfo.avatarUrl : defaultAvatarSrc"></image>
				<text class="tips" v-if="!isLogin">登录获取更多信息</text>
				<view class="info" v-else>
					<view class="info-item">
						<text>{{ userInfo.nickName }}</text>
						<!-- <image class="sex-img" :src="sexSrc"></image> -->
					</view>
					<view class="info-item">
						<text class="roleName fc-c">
							职位:
							<text class="ml-20">老板</text>
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
import { login } from '@/api/login/login';
export default {
	data() {
		return {
			userInfo: {},
			defaultAvatarSrc: '../../static/images/avatar.png',
			loginParams: {},
			isLogin: false,
			userInfo: {
			},
			boySrc: '/images/boy.png',
			sexSrc: ''
		};
	},
	methods: {
		logout(){
			console.log(222222222222)
			let _this = this
			uni.showModal({
			    title: '温馨提示',
			    content: '确定退出登录?',
			    success: function (res) {
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
		checkLogin(){
			try {
			    const token = uni.getStorageSync('token');
			    if (token) {
			       return true
			    }else{
					return false
				}
			} catch (e) {
			    // error
			}
		},
		setToken(token){
			try {
			    uni.setStorageSync('token', token);
			} catch (e) {
			}
		},
		setUserInfo(userInfo){
			try {
			    uni.setStorageSync('userInfo',userInfo);
			} catch (e) {
			    
			}
		},
		onLogin() {
			let _this = this
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					console.log('登录成功')
					_this.isLogin = true
					// 获取用户信息
					uni.getUserInfo({
						provider: 'weixin',
						success: function(res) {
							if (res.errMsg == 'getUserInfo:ok') {
								console.log(res.userInfo)
								const openId = res.userInfo.openId;
								_this.userInfo = res.userInfo
								login({
									wechatNumber: openId
								}).then((res) => {
									const token = res.header['Set-Authorization']
									_this.userInfo = Object.assign({},res.data.data.employee,_this.userInfo)
									_this.setToken(token)
									_this.setUserInfo(_this.userInfo)
									
								});
							}
						}
					});
				}
			});
		}
	},
	onLoad(){
		if(this.checkLogin()){
			console.log('进来了')
			this.isLogin = true
			try {
			    const userInfo = uni.getStorageSync('userInfo');
				console.log(12312312)
				console.log(userInfo)
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
	
	.bg{
	  width: 100%;
	  height:360rpx;
	  background: #06bebe;
	  position: relative;
	}
	.info-wrap{
	  width: 690rpx;
	  height:220rpx;
	  background: #fff;
	  position: absolute;
	  left:50%;
	  bottom:-100rpx;
	  margin-left: -345rpx;
	  border-radius: 10rpx;
	  box-shadow: 0rpx 2rpx 14rpx 4rpx rgba(0,0,0,0.2);
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	}
	.avatar{
	  width: 140rpx;
	  height:140rpx;
	  border-radius: 50%;
	  position: absolute;
	  left:50%;
	  margin-left: -70rpx;
	  top:-70rpx;
	
	
	}
	.tips{
	  color: #666;
	  font-size: 32rpx;
	  position: absolute;
	  bottom:60rpx;
	} 
	
	.me-btn{
	  margin-top: 400rpx;
	}
	.info{
	  font-size: 30rpx;
	  margin-top: 100rpx;
	}
	.sex-img{
	  width: 26rpx;
	  height:26rpx;
	  margin-left: 20rpx;
	}
	.info-item{
	  margin-bottom: 10rpx;
	}
	.big-btn{
		width:80%;
		position: absolute;
		bottom:100rpx;
		left:50%;
		margin-left: -40%;
		height:90rpx;
		font-size: 32rpx;
		border-radius: 14rpx;
		text-align: center;
		color: #fff;
		line-height: 90rpx;
		background:#06bebe;
	}
</style>
