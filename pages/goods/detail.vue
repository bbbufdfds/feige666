<template>
	<view>
		<view class="container">
			<view class="header viewFlex">
				<view class="header-item">
					<view class="">
						啊大苏打
					</view>
					<view class="">
						啊大苏打
					</view>
				</view>
				<view class="header-item">
					<view class="">
						啊大苏打
					</view>
					<view class="">
						啊大苏打
					</view>
				</view>
			</view>
			<view class="line"></view>

			<view class="box">
				<view class="cell-box">
					<span class="item-title">起投金额:</span>
					<view class="item-centent">
						￥<text class="flag">{{data.qtje}}</text>元
					</view>
				</view>
				<view class="cell-box">
					<span class="item-title">结息时间:</span>
					<view class="item-centent">
						满<text class="flag">{{data.qtje}}</text>自动结息
					</view>
				</view>
				<view class="cell-box">
					<span class="item-title" style="width: 65%;">投资金额:</span>
					<view class="item-centent viewFlex price">
						<view class="dec" @click="dec">
							-
						</view>
						<input type="text" v-model="data.price">
						<view class="inc" @click="inc">
							+
						</view>
					</view>
				</view>
				<view class="cell-box">
					<span class="item-title">加息券:</span>
					<view class="item-centent">
						<picker @change="bindPickerChange" data-index="index_1" :value="index_1" :range="coupon_1">
							<view class="uni-input">{{coupon_1[index_1]}}</view>
						</picker>
					</view>
				</view>
				<view class="cell-box">
					<span class="item-title">现金券:</span>
					<view class="item-centent">
						<picker @change="bindPickerChange" data-index="index_2" :value="index_2" :range="coupon_2">
							<view class="uni-input">{{coupon_2[index_2]}}</view>
						</picker>
					</view>
				</view>
				<view class="cell-box">
					<span class="item-title">支付密码:</span>
					<view class="item-centent">
						<input type="text" class="weui-input" v-model="data.password" placeholder="默认为登录密码" />
					</view>
				</view>
			</view>
		</view>
		<view class="submit" @click="submit">立即投资</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: {
					price: 0
				},
				coupon_1: [2, 3],
				index_1: 0,
				coupon_2: [2, 3],
				index_2: 0,
			}
		},
		methods: {
			bindPickerChange(e) {
				this[e.currentTarget.dataset.index] = e.detail.value
			},
			inc(){
				this.data.price = this.data.price + 1
			},
			dec(){
				this.data.price = this.data.price - 1
			},
			submit(){
				
			}
		}
	}
</script>

<style lang="scss">
	.container {
		width: 92%;
		margin: 0 auto;

		.header {
			color: #ffffff;
			margin-top: 20rpx;
			padding: 20rpx;
			background-color: #fe8113;
			border-radius: 10rpx;
			text-align: center;

			.header-item {
				padding: 10rpx 0;
				width: 50%;

				view {
					padding: 5rpx;
				}
			}
		}

		.line {
			border-bottom: 1rpx solid #efefef;
			margin: 25rpx 0;
		}

		.cell-box {
			display: flex;
			align-items: center;
			padding: 25rpx 32rpx;
			box-sizing: border-box;
			background-color: #fff;
			border-bottom: 1px solid #f8f8f8;

			.item-title {
				font-size: 30rpx;
				color: #333;
				width: 35%;
				font-weight: bold;
			}

			.item-centent {
				width: 65%;
				text-align: right;
			}

			.price {
				background-color: #fafafa;
				width: 35%;
				justify-content: space-between;

				input {
					width: 100rpx;
					text-align: center;
					height: 50rpx;
					line-height: 50rpx;
				}

				.dec,
				.inc {
					width: 50rpx;
					height: 50rpx;
					line-height: 50rpx;
					text-align: center;
					border-radius: 50%;
					border: 1rpx solid #efefef;
				}
			}
		}

	}

	.submit {
		position: fixed;
		bottom: 0;
		background-color: #fe8113;
		color: #fff;
		height: 100rpx;
		line-height: 100rpx;
		width: 100%;
		text-align: center;
	}
</style>