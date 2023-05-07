<template>
	<view class="container">
		<view class="cell-box">
			<span class="item-title">手机号:</span>
			<view class="item-centent">
				{{user.info.phone}}
			</view>
		</view>
		<view class="cell-box">
			<span class="item-title">实名认证:</span>
			<view class="item-centent">
				<navigator url="realnameAuth" class="auth">
					已认证
					<!-- <span :class="!data.back?'unauth':''">{{!data.back?'已认证':'已绑定'}}</span> -->
				</navigator>
			</view>
		</view>
		<view class="cell-box">
			<span class="item-title">银行卡绑定:</span>
			<view class="item-centent">
				<navigator class="auth" url="bankcardAuth" >
					<span :class="!data.back?'unauth':''">{{!data.back?'未绑定':'已绑定'}}</span>
				</navigator>
			</view>
		</view>
		<view class="cell-box">
			<span class="item-title">修改登录密码:</span>
			<view class="item-centent" @click="changPassword(1)">
				<i class="iconfont icon-jinrujiantou"></i>
			</view>
		</view>
		<view class="cell-box">
			<span class="item-title">修改支付密码:</span>
			<view class="item-centent" @click="changPassword(2)">
				<i class="iconfont icon-jinrujiantou"></i>
			</view>
		</view>

		<uni-popup ref="popup" position="center">
			<view class="popup-container">
				<view class="">
					修改{{passwordType == 1?"登录":"支付"}}密码
				</view>
				<input class="password-input" type="password" v-model="password" placeholder="请输入密码">
				<view class="viewFlex">
					<view class="confirm-button button" @click="confirm">确定</view>
					<view class="cancel-button button" @click="cancel">取消</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState([
				'user'
			]),
		},
		data() {
			return {
				data: {},
				password: "",
				passwordType: 1,
			}
		},
		onLoad() {

		},
		
		methods: {
			changPassword(t) {
				this.passwordType = t
				this.$refs.popup.open()
			}
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

				.auth {
					color: #fe8113;
					font-size: 25rpx;
				}

				.unauth {
					color: #eaeaea;
					border: 1rpx solid #eaeaea;
					padding: 8rpx 13rpx;
				}
			}
		}
	}

	.popup-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px;
		background-color: #fff;
		border-radius: 10rpx;
		width: 60vw;

		.password-input {
			width: 80%;
			margin: 30rpx 0;
		}
		.button{
			padding: 8rpx 20rpx;
			border-radius: 10rpx;
		}
		.confirm-button {
			background-color: #fe8113;
			color: #fff;
		}

		.cancel-button {
			background-color: #fff;
			color: #000000;
			margin-left: 20rpx;
		}
	}
</style>