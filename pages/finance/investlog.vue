<template>
	<view class="container">
		<view class="table">
			<view class="theader viewFlex">
				<view class="" v-for="(item, index) in column">
					{{item}}
				</view>
			</view>
			<view class="tbody">
				<block v-if="list.length > 0">
					<view class="tbody-item viewFlex" v-for="(item, index) in list" >
						<view class="">
							
						</view>
						<view class="">
							
						</view>
						<view class="">
							
						</view>
						<view class="" @click="download(item)">
							下载合同
						</view>
					</view>
				</block>
				<view class="empty" v-else>
					暂无更多数据
				</view>
			</view>
		</view>
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
					"投资产品",
					"投资状态",
					"投资时间",
					"协议",
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
			},
			download(item){
				
			},
		}
	}
</script>

<style lang="scss">
	.container{
		width: 95%;
		margin: 0 auto;
		
	}
</style>