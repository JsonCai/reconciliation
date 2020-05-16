import http from '../request/request'

// 返回费用分类列表
export function getCategoryList(){
	return http.get('/cost-categories')
}