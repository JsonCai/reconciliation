export default {
	data() {
		return {
			arrowSrc: '../../static/images/arrow.png',
			x: 0
		}
	},
	methods: {
		del() {
			this.setData({
				x: 0
			})
		},
		clickitem(item) {
			this.$emit('clickItem', item)
		}
	}
}
