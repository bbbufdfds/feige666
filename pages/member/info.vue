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
				<navigator url="realnameAuth" hover-class="none" class="auth" v-if="!user.info.isrealname">
					<span class="unauth">未实名</span>
				</navigator>
				<span url="realnameAuth" class="auth" v-else>
					已实名
				</span>
			</view>
		</view>
		<view class="cell-box">
			<span class="item-title">银行卡绑定:</span>
			<view class="item-centent">
				<navigator hover-class="none" class="auth" url="bankcardAuth" >
					<span :class="!user.info.isbank?'unauth':''">{{!user.info.isbank?'未绑定':'已绑定'}}</span>
				</navigator>
			</view>
		</view>
		<view class="cell-box">
			<span class="item-title">修改登录密码:</span>
			<navigator class="item-centent" url="changePassword?passwordType=1">
				<i class="iconfont icon-jinrujiantou"></i>
			</navigator>
		</view>
		<view class="cell-box">
			<span class="item-title">修改支付密码:</span>
			<navigator class="item-centent" url="changePassword?passwordType=2">
				<i class="iconfont icon-jinrujiantou"></i>
			</navigator>
		</view>

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

</style>