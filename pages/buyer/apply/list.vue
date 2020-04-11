<template>
	<!-- 
	swiper中的transfrom会使fixed失效,此时用height="100%"固定高度; 
	swiper中无法触发mescroll-mixins.js的onPageScroll和onReachBottom方法,只能用mescroll-uni,不能用mescroll-body
	-->
	<mescroll-uni ref="mescrollRef" @init="mescrollInit" height="100%" top="230" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @emptyclick="emptyClick">
		<!-- 数据列表 -->
		<block v-for="item in dataList" :key="item.id"><applyItem :applyItem="item"></applyItem></block>
	</mescroll-uni>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
import MescrollMoreItemMixin from '@/components/mescroll-uni/mixins/mescroll-more-item.js';
import applyItem from '@/components/mescroll-uni/mescroll-mixins.js';
import { friendlyDate } from '@/common/util.js';
export default {
	mixins: [MescrollMixin, MescrollMoreItemMixin], // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
	data() {
		return {
			dataList: [],
			downOption: {
				auto: false // 不自动加载 (mixin已处理第一个tab触发downCallback)
			},
			upOption: {
				auto: false, // 不自动加载
				// page: {
				// 	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
				// 	size: 10 // 每页数据的数量
				// },
				noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
				empty: {
					tip: '~ 空空如也 ~', // 提示
					btnText: '去看看'
				}
			}
		};
	},
	props: {
		tabs: Array, // tab菜单,此处用于取关键词
		i: Number,
		type: String,
		index:''
	},
	data() {
		return {
			dataList: []
		};
	},
	computed: {
		requestParams() {
			if (this.type == 'single') {
				return {};
			} else {
				return {
					columnId: this.tabs[this.i].id,
					minId: 0,
					pageSize: 10,
					column: 'id,post_id,title,author_name,cover,published_at,comments_count'
				};
			}
		}
	},
	methods: {
		/*下拉刷新的回调 */
		downCallback() {
			if(this.index == this.i){
				this.mescroll.resetUpScroll(false);
			}
		},
		/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
		upCallback(page) {
			//联网加载数据
			uni.request({
				// url: this.$host + 'api/news',
				url: 'https://unidemo.dcloud.net.cn/api/news',
				data: this.requestParams,
				success: result => {
					this.mescroll.endSuccess(result.data.length);
					const data = result.data;
					const data_list = data.map(news => {
						return {
							id: this.newGuid() + news.id,
							newsid: news.id,
							article_type: 1,
							datetime: friendlyDate(new Date(news.published_at.replace(/\-/g, '/')).getTime()),
							title: news.title,
							image_url: news.cover,
							source: news.author_name,
							comment_count: news.comments_count,
							post_id: news.post_id
						};
					});
					if (page.num == 1) this.dataList = []; //如果是第一页需手动制空列表
					this.dataList = this.dataList.concat(data_list); //追加新数据
				},
				fail: err => {
					console.log(err);
				},
				complete: e => {}
			});
		},
		//点击空布局按钮的回调
		emptyClick() {
			uni.showToast({
				title: '点击了按钮,具体逻辑自行实现'
			});
		},
		newGuid() {
			let s4 = function() {
				return ((65536 * (1 + Math.random())) | 0).toString(16).substring(1);
			};
			return (s4() + s4() + '-' + s4() + '-4' + s4().substr(0, 3) + '-' + s4() + '-' + s4() + s4() + s4()).toUpperCase();
		}
	}
};
</script>
