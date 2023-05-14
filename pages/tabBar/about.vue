<template>
	<view>
		<view class="nav"></view>
		<view class="container">
			<navigator hover-class="none" :url="'/pages/common/aboutDetail?id=' + item.id" class="item viewFlex" v-for="(item, index) in list">
			<!-- 	<view class="img viewFlex">
					<image :src="item.thumb_url" mode=""></image>
				</view> -->
				<view class="name">
					<view class="viewFlex">
						<view class="nameBlock">
							{{item.name}}
						</view>
						<view class="iconfont icon-jinrujiantou"></view>
					</view>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	import * as Api from "@/api/common.js"
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
				Api.aboutList().then(res=>{
					if(res.status == 0){
						that.list = that.$utils.handleFile(res.data, "thumb_url")
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.nav{
		background-color: #ffffff;
	}
	.container{
		width: 95%;
		margin: 0 auto;
		.item{
			.img{
				align-self: center;
				width: 10%;
			}
			height: 100rpx;
			line-height: 100rpx;
			image{
				width: 50rpx;
				height: 50rpx;
			}
			// .nameBlock{
			// 	width: 90%;
			// }
			// .name{
			// 	width: 90%;
			// }
			.name{
				width: 100%;
				.nameBlock{
					width: 100%;
				}
			}
		}
	}
</style>