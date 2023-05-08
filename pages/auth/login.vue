<template>
	<view class="">
		<view class="nav"></view>
		<view class="container">
			<form class="form" @submit="formSubmit" @reset="formReset">
				<view class="title">用户登录</view>
				<view class="loginform">
					<view class="form-item">
						<image src="@/static/image/reg-tel.png" class="img" />
						<input type="text" class="input" placeholder="请输入手机号"
							placeholder-style="font-size:30rpx;color:#B2B5BE" name="phone" value="" maxlength="11" />
					</view>
					<view class="form-item">
						<image src="@/static/image/reg-pwd.png" class="img" />
						<input type="text" class="input" placeholder="登录密码6~18位字符"
							placeholder-style="font-size:30rpx;color:#B2B5BE" name="password" value="" maxlength="18" :password="true" />
					</view>
					<!-- <view class="forget">
						忘记密码？
					</view> -->
					<button class="form-btn" form-type="submit">登录</button>
					<navigator url="register" class="form-btn form-btn2">注册</navigator>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},

		onLoad: function(opt) {
		},
		methods: {
			formSubmit: function(e){
				let that = this
					, formdata = e.detail.value;
				if (formdata.phone == ''){
					that.$utils.handleShowToast({
						msg:"请输入手机号",
						status: 1
					})
				  return;
				}
				if (formdata.password == ''){
					that.$utils.handleShowToast({
						msg:"请输入密码",
						status: 1
					}) 
				  return;
				}
				
				uni.showLoading({
					title: '提交中...',
					mask: true
				});
				
				that.$store.commit("user/login",formdata)
			}
		}
	};
</script>

<style>
	page ,.nav{
		background: #ffffff
	}
	.container {
		width: 100%;
	}

	.title {
		margin: 70rpx 50rpx 50rpx 40rpx;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 48rpx;
		font-weight: bold;
		color: #000000;
	}
	.form{
		margin-bottom: 40rpx;
	}

	.loginform {
		padding: 0 50rpx;
		border-radius: 5px;
		background: #FFF;
	}
	.loginform .forget{
		margin-top: 30rpx;
		text-align: right;
		font-size: 30rpx;
		color: #415ee4;
	}
	
	.loginform .form-item {
		display: flex;
		align-items: center;
		width: 100%;
		border-bottom: 1px #ededed solid;
		height: 88rpx;
		line-height: 88rpx;
		border-bottom: 1px solid #F0F3F6;
		margin-top: 20rpx
	}

	/*.loginform .form-item:last-child{border:0}*/
	.loginform .form-item .img {
		width: 44rpx;
		height: 44rpx;
		margin-right: 30rpx
	}

	.loginform .form-item .input {
		flex: 1;
		color: #000;
	}
	.loginform .form-btn {
		margin-top: 30rpx;
		width: 100%;
		height: 96rpx;
		line-height: 96rpx;
		color: #fff;
		font-size: 30rpx;
		border-radius: 48rpx;
		background: rgb(238, 136, 55);
	}

	.loginform .form-btn2{
		background: #EEEEEE;
		color: #000000;
		margin-top: 20rpx;
		text-align: center;
	}
</style>
