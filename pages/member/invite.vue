<template>
	<view class="container">
		<view class="qrcodeBlock">
			<image src="@/static/image/inviteBg.png" mode="widthFix"></image>
			<view class="qrcode" >
				<view class="code">
					邀请码:
				</view>
				<view class="">
					<image :src="qrcodeUrl" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<Itable :column="column" :list="list" />
	</view>
</template>

<script>
	import env from "@/utils/env.js"
	import { invitelist } from "@/api/user.js"
	export default {
		data() {
			return {
				qrcodeUrl: env.baseUrl + "qrcode",
				list: [],
				page: 1,
				column:[
					{
						title: "手机号",
						prop: "username",
					},
					{
						title: "层级",
						prop: "cenji"
					},
					{
						title: "注册时间",
						prop: "date",
					}
				]
			};
		},
		onLoad() {
			this.getList()
		},
		onReachBottom() {
			this.page = this.page + 1
			this.getList()
		},
		methods: {
			getList(){
				let that = this
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
				invitelist({
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
		},
	};
</script>

<style lang="scss">
	.container{
		height: 100%;
		image{
			width: 100vw;
		}
		.qrcodeBlock{
			position: relative;
			.qrcode{
				position: absolute;
				top: 55%;
				z-index: 99;
				view{
					text-align: center;
					width: 100vw;
				}
				.code{
					font-size: 32rpx;
					font-weight: bold;
				}
				image{
					width: 37vh;
					height: 37vh;
				}
			}
		}
		
		.table{
			margin-top: 0;
			padding-bottom: 20rpx;
		}
	}
	
</style>