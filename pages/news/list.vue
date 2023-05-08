<template>
	<view class="container">
		<navigator hover-class="none" :url="'detail?id=' + item.id" class="news viewFlex" v-for="(item, index) in list">
			<view class="content">
				<view class="title">
					{{item.title}}
				</view>
				<view class="time">
					{{item.created_at}}
				</view>
			</view>
			<view class="image">
				<image :src="item.image" mode="aspectFit"></image>
			</view>
		</navigator>
	</view>
</template>

<script>
	import * as Api from "@/api/news.js"
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.getList()
		},
		methods:{
			getList(){
				let that = this
				Api.list().then(res=>{
					if(res.status == 0){
						that.list = that.$utils.handleFile(res.data, "image")
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
		.news{
			height: 15vh;
			margin: 20rpx 0;
			.content{
				width: 60%;
				.title{
					height: 80%;
					 overflow:hidden;
					  text-overflow: ellipsis;
					  -webkit-line-clamp: 3;
					  display: -webkit-box;
					  -webkit-box-orient: vertical;
				}
				.time{
					color: #c77777;
				}
			}
			.image{
				margin-left: 3%;
				width: 37%;
				height: 15vh;
				overflow: hidden;
				border-radius: 10rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>