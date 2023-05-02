<template>
	<view class="container">
		<Itable :column="column" :list="list" />
	</view>
</template>

<script>
	import { investlog } from "@/api/finance.js"
	export default {
		data() {
			return {
				list: [],
				page: 1,
				data:{},
				column:[
					{
						title: "投资产品",
						prop: "id",
					},
					{
						title: "投资状态",
						prop: "moneylog_type",
					},
					{
						title: "投资时间",
						prop: "date",
					},
					{
						title: "投资协议",
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
				investlog({
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
		width: 92%;
		margin: 0 auto;
		
	}
</style>