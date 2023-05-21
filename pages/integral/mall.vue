<template>
	<view class="container">
		<view class="header viewFlex">
			<view class="header-item viewFlex">
				<view class="">
					<view class="icon">
						<text>{{myintegral}}</text>
					</view>
					<view>
						我的积分
					</view>
				</view>
			</view>
			<navigator url="exchangelog" class="header-item viewFlex">
				<view class="">
					<view class="icon">
						<text class="iconfont icon-a-youhuiquankaquan "></text>
					</view>
					<view>
						我的订单
					</view>
				</view>
			</navigator>
		</view>
		<view class="goods-list viewFlex">
			<view class="goods" v-for="(item, index) in list">
				<view class="img">
					<image :src="item.image" mode=""></image>
				</view>
				<view class="maigin-top-15">
					<view class="title">
						{{item.title}}
					</view>
					<view class="maigin-top-15 priceInfo">
						<span class="price">
							<i class="iconfont icon-qian"></i>
							<text>{{item.integral}}</text>
						</span>
						<span class="category">
							<text class="category-icon">官方自营</text>
						</span>
					</view>
				</view>
				<navigator class="btn maigin-top-15" :class="'btn' + item.isexchange" :url="item.isexchange==0?'detail?id=' + item.id:''">
					{{item.isexchange == 1?'兑换完成':'立即兑换'}}
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import * as integralApi from "@/api/integral.js";
	export default {
		data() {
			return {
				page: 1,
				myintegral: 0,
				list: [],
			}
		},
		onLoad() {
			this.getList()
		},
		onReachBottom() {
			this.page = this.page + 1
			this.getList()
		},
		methods: {
			getList() {
				let that = this
				integralApi.jifen({
					page: that.page
				}).then(res => {
					if (res.status == 0) {
						that.myintegral = res.myintegral
						const {
							data
						} = res.data;
						if (data.length > 0) {
							that.list = that.list.concat(that.$utils.handleFile(data, "image"))
						} else {
							that.page = that.page - 1
						}
					}
				})
			},
			itemClick(id) {
				integralApi.jifenexchange({
					productid: id
				}).then(res => {
					if (res.status == 0) {
						const {
							data
						} = res.data;
						if (data.length > 0) {
							that.list = that.list.concat(that.$utils.handleFile(data, "image"))
						} else {
							that.page = that.page - 1
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		width: 93%;
		margin: 0 auto;

		.header {
			margin-top: 20rpx;
			border-radius: 20rpx;
			overflow: hidden;
			text-align: center;
			color: #ffffff;

			.header-item {
				align-items: center;
				justify-content: center;
				width: 50%;
				padding: 40rpx;
				background-color: #fe8113;

				.icon {
					margin-bottom: 10rpx;
				}

				.icon text {
					font-size: 45rpx;
				}
			}
		}

		.goods-list {
			margin-top: 30rpx;
			flex-flow: row wrap;
			justify-content: space-between;

			.goods {
				width: 46%;
				margin-bottom: 40rpx;

				.img image {
					width: 100%;
				}

				.title {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}

				.icon-qian {
					color: #fe8113;
					margin-right: 10rpx;
				}

				.btn {
					background-color: #fe8113;
					color: #ffffff;
					padding: 18rpx 20rpx;
					border-radius: 60rpx;
					text-align: center;
				}
				.btn1{
					background-color: #eeeeee;
				}
				.maigin-top-15 {
					margin-top: 17rpx;
				}
				

				.priceInfo {
					font-size: 30rpx;

					.price {
						font-size: 35rpx;
						font-weight: bold;

						.icon-qian {
							font-size: 40rpx;
						}
					}

					.category {
						.category-icon {
							padding: 1rpx 15rpx;
							border-radius: 60rpx;
							border: 1rpx solid #fe8113;
							color: #fe8113;
							margin-left: 20rpx;
						}
					}
				}

			}
		}
	}
</style>