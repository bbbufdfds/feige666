<template>
	<view class="container">
		<view class="header">
			<view class="userInfo">
				<view class="userInfo-info viewFlex">
					<view class="userInfo-info-item">
						{{user.info.phone}}
					</view>
					<view class="userInfo-info-item">
						团长
					</view>
				</view>
				<view>等级</view>
			</view>
			<view class="priceInfo viewFlex">
				<view class="priceInfo-item">
					<view class="priceSize">
						38.00
					</view>
					<view class="">
						账户余额
					</view>
				</view>
				<view class="priceInfo-item right">
					<view class="">
						待投资金额：38.00
					</view>
					<view class="" >
						可提现金额：00.00
					</view>
				</view>
			</view>
			<view class="priceUl viewFlex">
				<view class="priceUl-li">
					<view class="">
						0
					</view>
					<view class="">
						待收本金(元)
					</view>
				</view>
				<view class="priceUl-li">
					<view class="">
						0
					</view>
					<view class="">
						待收收益(元)
					</view>
				</view>
				<view class="priceUl-li">
					<view class="">
						0
					</view>
					<view class="">
						余额宝(元)
					</view>
				</view>
				<view class="priceUl-li">
					<view class="">
						0
					</view>
					<view class="">
						积分
					</view>
				</view>
			</view>
			
			<view class="btnInfo viewFlex">
				<navigator class="btn" url="/pages/finance/withdrawal">
					提现
				</navigator> 
				<view class="line"></view>
				<navigator class="btn" url="/pages/finance/recharge">
					充值
				</navigator> 
			</view>
		</view>
		
		<view class="content">
			<view style="height: 90rpx;"></view>
			<view class="list viewFlex">
				<view class="list-item viewFlex">
					<view class="">
						<view class="">
							<image src="../../static/logo.png"></image>
						</view>
						<view class="">
							哈哈哈
						</view>
					</view>
					<span class="notice">1</span>
				</view>
				<view class="list-item viewFlex">
					<view class="">
						<view class="">
							<image src="../../static/logo.png"></image>
						</view>
						<view class="">
							哈哈哈
						</view>
					</view>
				</view>
				<view class="list-item right-border-none viewFlex">
					<view class="">
						<view class="">
							<image src="../../static/logo.png"></image>
						</view>
						<view class="">
							哈哈哈
						</view>
					</view>
				</view>
				<view class="list-item viewFlex">
					<view class="">
						<view class="">
							<image src="../../static/logo.png"></image>
						</view>
						<view class="">
							哈哈哈
						</view>
					</view>
				</view>
				<view class="list-item viewFlex">
					<view class="">
						<view class="">
							<image src="../../static/logo.png"></image>
						</view>
						<view class="">
							哈哈哈
						</view>
					</view>
				</view>
				<view class="list-item right-border-none viewFlex">
					<view class="">
						<view class="">
							<image src="../../static/logo.png"></image>
						</view>
						<view class="">
							哈哈哈
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from "vuex";
	export default {
		onLoad() {

		},
		computed: { 
		   ...mapState([ 
				'user' 
		   ]),
		},
	}
</script>

<style lang="scss">
	.container{
		.header{
			background-color: #ff7949;
			color: #ffffff;
			padding: 40rpx;
			height: 30vh;
			position: relative;
			.userInfo{
				margin-bottom: 40rpx;
			}
			.priceInfo{
				margin-bottom: 40rpx;
				.priceSize{
					font-size: 60rpx;
					font-weight: bold;
				}
				.priceInfo-item.right view{
					margin-top: 15rpx;
				}
			}
			
			.priceInfo-item, .userInfo-info-item{
				width: 50%;
			}
			.userInfo-info-item:nth-child(2), .priceInfo-item:nth-child(2){
				text-align: right;
			}
		}
		.priceUl{
			text-align: center;
			.priceUl-li{
				flex: 1;
				font-size: 28rpx;
			}
		}
		.btnInfo{
			position: absolute;
			bottom: -50rpx;
			border-radius: 20rpx;
			width: 85%;
			background-color: #ffffff;
			color: #000000;
			left: 0;
			right: 0;
			margin: auto;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			-moz-box-shadow: 2px 2px 10px #909090;
			-webkit-box-shadow: 2px 2px 10px #909090;
			box-shadow:2px 2px 10px #909090;
			align-items: center;
			.line{
				height: 40%;
				border-left: 2rpx solid #a4a4a4;
			}
			.btn{
				width: 50%;
			}
		}
		.list{
			text-align: center;
			flex-wrap: wrap;
			border-top: 1rpx solid #eee;
			.list-item{
				border-right: 1rpx solid #eee;
				border-bottom: 1rpx solid #eee;
				align-items: center;
				justify-content: center;
				width: 33%;
				aspect-ratio: 1/1; 
				image{
					width: 100rpx;
					height: 100rpx;
				}
				position: relative;
				.notice{
					position: absolute;
					top: 20rpx;
					right: 20rpx;
					width: 40rpx;
					height: 40rpx;
					background-color: red;
					border-radius: 50%;
					color: #ffffff;
				}
			}
			.right-border-none{
				border-right: 0;
			}
		}
	}
</style>