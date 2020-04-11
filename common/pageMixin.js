import fakeSearch from '@/components/fakeSearch/fakeSearch.vue';

export default {
	components: {
		fakeSearch

	},
	data(){
		return {
			height: "400px", // 需要固定swiper的高度
			tabIndex: 0, // 当前tab的下标	
			downOption:{
				auto:false//是否在初始化完毕之后自动执行下拉回调callback; 默认true
			},
			upOption:{
				auto:false
			}
		}
	},
	methods: {
		swiperChange(e){
			this.tabIndex = e.detail.current
		}
	},
	onLoad(){
		this.height = uni.getSystemInfoSync().windowHeight + 'px'
	}
}