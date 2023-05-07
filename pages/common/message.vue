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
						<view class="" @click="viewClick(index, item)">
							{{item.title}}
							<text class="" v-if="item.show">
								{{item.content}}
							</text>
						</view>
						<view class="">
							{{item.date}}
						</view>
						<view class="">
							<text :class="item.status?'flag':''">{{item.status == 1?"已读":"未读"}}</text>
						</view>
						<view class="" @click="remove(index, item)">
							<a href="javascript:;">删除</a>
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
	import { message, msgStatus, msgDel } from "@/api/common.js"
	export default {
		data() {
			return {
				list: [],
				page: 1,
				data:{},
				column:[
					"标题",
					"时间",
					"状态",
					"删除",
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
				message({
					page: this.page
				}).then(res=>{
					if(res.status == 0){
						const { data } = res.data;
						
						if(data.length > 0){
							data.forEach(function(item){
								item.show = false
							})
							that.list = that.list.concat(data)
						}else{
							that.page = that.page - 1
						}
					}
				})
			},
			remove(index, item){
				let that = this
				msgDel({
					id: item.id
				}).then(res=>{
					if(res.status == 0){
						that.list.splice(index, 1)
					}
				})
			},
			viewClick(index, item){
				let that = this
				that.list[index].show = !that.list[index].show;
				msgStatus({
					id: item.id
				}).then(res=>{
					if(res.status == 0){
						that.list[index].status = 1;
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
	.table .tbody .tbody-item view{
		height: auto;
		line-height: inherit;
		padding: 20rpx;
		text{
			margin-top: 20rpx;
			display: inline-block;
		}
	}
</style>