import {
	baseUrl
} from '../../config/config'

const http = {
	post: (url,data) => {
		return new Promise((resolve,reject) => {
			uni.request({
				url:  baseUrl + url,
				methods:'POST',
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
	get:(url,data)=>{
		return new Promise((resolve,reject) => {
			uni.request({
				url:  baseUrl + url,
				methods:'GET',
				data
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
				methods:'PUT',
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
				methods:'DELETE',
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