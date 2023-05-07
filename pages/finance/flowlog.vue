<template>
	<view class="container">
		<Itable :column="column" :list="list" />
	</view>
</template>

<script>
	import { flowlog } from "@/api/finance.js"
	export default {
		data() {
			return {
				list: [],
				page: 1,
				column:[
					{
						title: "说明",
						prop: "moneylog_notice",
					},
					{
						title: "金额",
						prop: "moneylog_money",
						format: function(item){
							let operator = item.operator == 1?"+":"-";
							return `<text style="color:${item.operator==1?'red':'green'}">${operator}${item.moneylog_money}</text>`
						}
					},
					{
						title: "时间",
						prop: "date",
					}
				]
			}
		},
		onLoad() {
			this.getList()
		},
		
		onReachBottom() {
			this.page = this.page + 1
			this.getList()
		},
		methods:{
			getList(){
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
				let that = this
				flowlog({
					page: this.page
				}).then(res=>{
					if(res.status == 0){
						const { data } = res.data;
						if(data.length > 0){
							that.list = that.list.concat(data)
						}else{
							that.page = that.page - 1
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.container{
		width: 95%;
		margin: 0 auto;
		
	}
</style>