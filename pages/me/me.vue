<template>
	<view>
		<view class='btn confirm-btn' @tap="onLogin">微信授权登录</view>
	</view>
</template>

<script>
	import {login} from '@/api/login/login'
	export default {
		data() {
			return {

			};
		},
		methods: {
			onLogin() {
				uni.login({
				  provider: 'weixin',
				  success: function (loginRes) {
				    // 获取用户信息
				    uni.getUserInfo({
				      provider: 'weixin',
				      success: function (res) {
					   if(res.errMsg == 'getUserInfo:ok'){
						   const openId = res.userInfo.openId
						   login({
							   wechatNumber:openId
						   }).then(r => {
							   const appToken = r['Set-Authorization']
							   console.log(appToken)
						   })
					   }
				      }
				    });
				  }
				});
			}
		}
	}
</script>

<style lang="less">

</style>
