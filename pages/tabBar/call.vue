<template>
	<web-view :src="url"></web-view>
</template>

<script>
	import {kefu} from "@/api/common.js";
	export default {
		data() {
			return {
				url: ""
			}
		},
		onLoad(options) {
			let that = this
			kefu().then(res=>{
				if (res.status == 0) 
					that.url = res.data.url
			})
		},
	}
</script>

<style>
</style>