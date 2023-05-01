<template>
	<view class="container">
		<view class="cell-box">
			<span class="item-title">提现时间:</span>
			<view class="item-centent">
				10：00-22：00
			</view>
		</view>
		<view class="cell-box">
			<span class="item-title">提现金额(元):</span>
			<view class="item-centent">
				<input type="number" class="weui-input"  v-model="data.amount"
					placeholder="不能低于100元" maxlength="11"/>
			</view>
		</view>
		<view class="cell-box">
			<span class="item-title">可提现金额(元):</span>
			<view class="item-centent">
				666
			</view>
		</view>
		<view class="cell-box">
			<span class="item-title">交易密码:</span>
			<view class="item-centent">
				<input type="text" class="weui-input"  v-model="data.password"
					placeholder="请输入交易密码" />
			</view>
		</view>
		<view class="submit" @click="submit">申请提现</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:{}
			}
		},
		onLoad() {
			
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.cell-box {
			width: 100vw;
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
	}
</style>