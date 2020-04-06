<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="less">
	/* #ifndef APP-PLUS-NVUE */
	/* 引入官方css库 */
	@import url("./common/uni.css");
	/*每个页面公共css */
	@import url("./common/common.less");
	/* #endif*/
</style>
