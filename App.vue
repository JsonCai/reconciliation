<script>
	import {
		getMessageBox
	} from '@/api/message/message.js'
	export default {
		onLaunch: function() {
			
		},
		onShow: function() {
			uni.$emit('onShow')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="less">
	 @import url("./common/common.less");
</style>
