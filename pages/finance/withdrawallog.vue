<template>
	<view class="container">
		<Itable :column="column" :list="list" />
	</view>
</template>

<script>
	import { withdrawallog } from "@/api/finance.js"
	export default {
		data() {
			return {
				list: [],
				page: 1,
				data:{},
				column:[
					{
						title: "提现金额",
						prop: "amount",
					},
					{
						title: "理由",
						prop: "tishi",
						format: function(item){
							return item.tishi || "无"
						}
					},
					{
						title: "提现状态",
						prop: "status",
						format: function(item){
							return item.status == -1 ?"驳回":item.status == 0?"审核中":"已通过"
						}
					},
					{
						title: "提现时间",
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
				let that = this
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
				withdrawallog({
					page: this.page
				}).then(res=>{
					if(res.status == 0){
						const { data } = res.data;
						if(data.length > 0){
							that.list = that.list.concat(data)
						}else{
							that.page = that.page - 1
						}
						that.data = res.show
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