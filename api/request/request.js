import {
	baseUrl
} from '../../config/config'

function onHttpSuccess(res,resolve,reject){
	if(res.data.code == 0){
		resolve(res.data)
	}else{
		reject(res)
	}
}

const http = {
	post: (url,data) => {
		console.log(baseUrl+url)
		return new Promise((resolve,reject) => {
			uni.request({
				url:  baseUrl + url,
				method:'POST',
				data,
				header: {
					
				},
				success: (res) => {
				    onHttpSuccess(res,resolve,reject)
				},
				fail:(err)=>{
					reject(err)
				}
			});
		})
	},
	get:(url,data)=>{
		console.log(baseUrl+url)
		return new Promise((resolve,reject) => {
			uni.request({
				url:  baseUrl + url,
				method:'GET',
				data,
				header: {
					
				},
				success: (res) => {
				    resolve(res)
				},
				fail:(err)=>{
					reject(err)
				}
			});
		})
	},
	put:(url,data)=>{
		return new Promise((resolve,reject) => {
			uni.request({
				url:  baseUrl + url,
				method:'PUT',
				data,
				header: {
					
				},
				success: (res) => {
				    resolve(res)
				},
				fail:(err)=>{
					reject(err)
				}
			});
		})
	},
	delete:(url,data)=>{
		return new Promise((resolve,reject) => {
			uni.request({
				url:  baseUrl + url,
				method:'DELETE',
				data,
				header: {
					
				},
				success: (res) => {
				    resolve(res)
				},
				fail:(err)=>{
					reject(err)
				}
			});
		})
	}
}

export default http