<template>
	<view class="">
		<u-parse :content="data" @preview="preview" @navigate="navigate" noData="正在加载中..." />
	</view>
</template>

<script>
	import * as Api from "@/api/common.js"
	export default {
		data() {
			return {
				id: 0,
				data: ""
			}
		},
		onLoad(options) {
			this.id = options.id
			this.detail()
		},
		methods:{
			detail(){
				let that = this
				Api.aboutDetail({
					aboutid: this.id
				}).then(res=>{
					if(res.status == 0){
						that.data = res.data
						uni.setNavigationBarTitle({
							title: res.title
						});
					}
				})
			}
		}
	}
</script>

<style>
	page{
		overflow-y: auto;
		min-height: 100%;
	}
</style>