<template>
	<view class="container">
		<Itable :column="column" :list="list" />
	</view>
</template>

<script>
	import { exchangelog } from "@/api/integral.js"
	export default {
		data() {
			return {
				list: [],
				page: 1,
				data:{},
				column:[
					{
						title: "产品名称",
						prop: "productname",
					},
					{
						title: "状态",
						prop: "status",
						format: function(item){
							return item.status == 0?"等待处理":item.status == 1?"兑换成功":"兑换失败"
						}
					},
					{
						title: "数量",
						prop: "number",
					},
					{
						title: "兑换积分",
						prop: "integral",
					},
					{
						title: "兑换时间",
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
				exchangelog({
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