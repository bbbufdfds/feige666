<template>
	<view class="">
		<u-parse :content="data" @preview="preview" @navigate="navigate" noData="正在加载中..." />
	</view>
</template>

<script>
	import {
		agreement
	} from "@/api/finance.js"
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
				agreement({proid:that.id}).then(res=>{
					that.data = res
				})
			}
		}
	}
</script>

<style>
</style>