const mixin ={
	data(){
		return{
			isShowLoading:false
		}
	},
	methods:{
		showLoading(){
			this.isShowLoading = true
		},
		dismissLoading(){
			this.isShowLoading = false
		}
	}
}
export default mixin