<template>
	<view class="">
		<view class="goods-list">
			<view class="goods viewFlex" v-for="(item, index) in productList" :key="index">
				<view class="goods-thumb">
					<image :src="item.pic" mode="widthFix"></image>
				</view>
				<view class="goods-content">
					<view class="goods-content-name">
						{{item.title}}
					</view>
					<view class="goods-content-desc">
						{{item.hkfs}}
					</view>
					<view class="goods-content-list">
						<view class="goods-content-list-item viewFlex left">
							<view class="">
								<view class="price">{{item.shijian}}{{item.qxdw =='个小时'?'小时':'天'}}</view>
								<view class="title">投资期限</view>
							</view>
						</view>
						<view class="goods-content-list-item viewFlex right">
							<view class="">
								<view class="price">{{item.qtje}}元</view>
								<view class="title">起购金额</view>
							</view>
						</view>
						<view class="goods-content-list-item viewFlex left">
							<view class="">
								<view class="price">{{item.jyrsy*item.qtje/100}}元</view>
								<view class="title">每{{item.qxdw =='个小时'?'时':'天'}}收益</view>
							</view>
						</view>
						<view class="goods-content-list-item viewFlex right">
							<view class="">
								<view class="price">{{item.jyrsy}}%</view>
								<view class="title">收益率</view>
							</view>
						</view>
					</view>
					<view class="progress viewFlex">
						<view class="progress-text">
							项目进度
						</view>
						<view class="progress-bar">
							<view class="progress-complete" :style="'width:' + item.xmjd + '%'">
								{{item.xmjd}}%
							</view>
						</view>
					</view>
					<view @click="nav('/pages/goods/detail?id='+item.id)" class="good-submit">
						立即投资
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import * as Api from "@/api/product.js"
	export default {
		data() {
			return {
				productList: [],
			}
		},
		mounted() {
			this.product()
		},
		methods: {
			product(classifyId = 0) {
				let that = this,
					params = {};
				classifyId ? params.classifyId = classifyId : "";
				
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
				Api.list(params).then(res => {
					if (res.status == 0) {
						let productList = res.data
						productList.forEach(function(item) {
							item = that.$utils.handleProduct(item, res.text)
						})
						that.productList = productList
					}
				}).finally(res=>{
					uni.hideLoading()
				})
			},
			nav(url){
				this.$utils.handleVerifyPath({
					url: url,
					isrealname: true
				});
			}
		}
	}
</script>

<style lang="scss">
	.goods-list {
		.goods {
			margin-bottom: 20rpx;
		}
	}

	.goods-thumb {
		width: 45%;

		image {
			width: 100%;
		}
	}

	.goods-content {
		width: 53%;
		margin-left: 3%;

		.goods-content-name {
			height: 56rpx;
			line-height: 56rpx;
			font-weight: bold;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.goods-content-desc {
			height: 50rpx;
			line-height: 50rpx;
			font-size: 28rpx;
			color: #87847c;
		}

		.goods-content-list {
			height: 200rpx;
			flex-flow: row wrap;
			display: -webkit-flex;
			background-color: #f9f9f9;

			.goods-content-list-item {
				width: 49.5%;
				height: 100rpx;
				justify-content: center;
				align-items: center;
				text-align: center;

				.price {
					font-size: 30rpx;
					font-weight: bold;
				}

				.title {
					font-size: 26rpx;
					color: #87847c;
				}
			}

			.left {
				border-right: 1rpx solid #f4f4f4;
			}

			.goods-content-list-item:nth-child(1),
			.goods-content-list-item:nth-child(2) {
				border-bottom: 1rpx solid #f4f4f4;
			}
		}

		.progress {
			flex-flow: row wrap;
			align-items: center;
			height: 60rpx;

			.progress-text {
				width: 30%;
				font-size: 20rpx;
				color: #87847c;
				line-height: 60rpx;
			}

			.progress-bar {
				width: 70%;
				height: 25rpx;
				background-color: #ececec;
				border-radius: 10rpx;
				overflow: hidden;

				.progress-complete {
					background-color: #dd524d;
					height: 100%;
					line-height: 100%;
					font-size: 16rpx;
					color: #ffffff;
				}
			}
		}

		.good-submit {
			margin-top: 6%;
			color: #fff;
			border-radius: 200rpx;
			text-align: center;
			font-size: 30rpx;
			padding: 15rpx 0;
			width: 60%;
			background-color: #e03e27;
		}
	}
</style>