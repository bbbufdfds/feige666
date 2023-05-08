<template>
	<view class="">
		<u-parse :content="data" @preview="preview" @navigate="navigate" noData="正在加载中..." />
	</view>
</template>

<script>
	import * as Api from "@/api/news.js"
	import uParse from '@/components/u-parse/u-parse.vue'
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
				Api.detail({
					newid: this.id
				}).then(res=>{
					if(res.status == 0){
						that.data = res.data
					}
				})
			}
		}
	}
</script>

<style>
</style>