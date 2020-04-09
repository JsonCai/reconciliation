import fakeSearch from '@/components/fakeSearch/fakeSearch.vue';

export default {
	components: {
		fakeSearch

	},
	data(){
		return {
			height: "400px", // 需要固定swiper的高度
			tabIndex: 0, // 当前tab的下标	
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