<template>
	<view class="container">
		<view class="header">
			<view class="header-item">
				啊大苏打
			</view>
			<view class="header-item">
				啊大苏打
			</view>
		</view>
		<view class="line"></view>
		<view class="priceInfo viewFlex">
			<view class="priceInfo-item">
				<view class="text">
					00
				</view>
				<view class="text">
					00
				</view>
				<view class="btn">
					转入
				</view>
			</view>
			<view class="priceInfo-item">
				<view class="text">
					00
				</view>
				<view class="text">
					00
				</view>
				<view class="btn right">
					转出
				</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="table">
			<view class="theader viewFlex">
				<view class="">
					序号
				</view>
				<view class="">
					标题
				</view>
				<view class="">
					金额
				</view>
				<view class="">
					时间
				</view>
			</view>
			<view class="tbody">
				<block v-if="list.length > 0">
					<view class="tbody-item viewFlex" v-for="(item, index) in list" >
						<view class="">
							序号
						</view>
						<view class="">
							标题
						</view>
						<view class="">
							金额
						</view>
						<view class="">
							时间
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
	export default {
		data() {
			return {
				list: [],
			}
		},
	}
</script>

<style lang="scss">
	.container{
		width: 92%;
		margin: 0 auto;
		.header{
			color: #ffffff;
			margin-top: 20rpx;
			padding: 20rpx;
			background-color: #fe8113;
			border-radius: 10rpx;
			text-align: center;
			.header-item{
				padding: 10rpx 0;
			}
		}
		.line{
			border-bottom: 1rpx solid #efefef;
			margin: 25rpx 0;
		}
		.priceInfo{
			.priceInfo-item{
				width: 50%;
				text-align: center;
				.text{
					font-weight: bold;
					margin-bottom: 15rpx;
				}
			}
			view{
				margin-bottom: 10rpx;
			}
			.btn{
				padding: 15rpx 0;
				background-color: #5bc724;
				width: 70%;
				margin: 0 auto;
				color: #ffffff;
				border-radius: 10rpx;
			}
			.right{
				background-color: #f46c6c;
			}
		}
		.table{
			.theader, .tbody .tbody-item{
				background-color: #1b2b42;
				color: #90939d;
				text-align: center;
				view{
					width: 25%;
					position: relative;
					height: 80rpx;
					line-height: 80rpx;
				}
				view::before{
					content: "";
					position: absolute;
					right: 0;
					height: 100%;
					border-right: 1rpx solid #ffffff;
				}
			}
			.tbody .tbody-item{
				background-color: #ffffff;
				position: relative;
				view::before{
					content: "";
					position: absolute;
					right: 0;
					top: 0;
					bottom: 0;
					left: 0;
					height: 100%;
					border: 1rpx solid #eeeeee;
					border-right: 0;
				}
			}
			.tbody .tbody-item::before{
				content: "";
				position: absolute;
				right: 2rpx;
				height: 100%;
				border-right: 1rpx solid #eeeeee;
			}
			.empty{
				margin-top: 40rpx;
				text-align: center;
				color: #acacac;
			}
		}
	}
</style>