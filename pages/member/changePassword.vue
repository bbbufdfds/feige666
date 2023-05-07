<template>
	<view class="container">
		<form class="form" @submit="formSubmit" @reset="formReset">
			<view class="cell-box">
				<span class="item-title">旧密码:</span>
				<view class="item-centent">
					<input type="password" class="weui-input" name="oldPassword" v-model="data.oldPassword"
						placeholder="请输入旧密码" maxlength="11"/>
				</view>
			</view>
			<view class="cell-box">
				<span class="item-title">新密码:</span>
				<view class="item-centent">
					<input type="password" class="weui-input" name="password" v-model="data.password"
						placeholder="请输入新密码" maxlength="11"/>
				</view>
			</view>
			<view class="cell-box">
				<span class="item-title">确认密码:</span>
				<view class="item-centent">
					<input type="password" class="weui-input"  name="confirmPassword" v-model="data.confirmPassword"
						placeholder="请输入确认密码" maxlength="11"/>
				</view>
			</view>
			<button class="submit" form-type="submit">提交</button>
		</form>
	</view>
</template>

<script>
	import * as Api from "@/api/user.js"
	export default {
		data() {
			return {
				data:{},
				passwordType: 0
			}
		},
		onLoad(options) {
			let title ="修改" + (options.passwordType == 1?"登录":"支付") + "密码"
			this.passwordType = options.passwordType
			uni.setNavigationBarTitle({
				title: title,
			})
		},
		methods: {
			formSubmit: function(e){
				let that = this
					, data = e.detail.value;
				
				if (data.oldPassword == ''){
					that.$utils.handleShowToast({
						msg:"请输入旧密码",
						status: 1
					}) 
				  return;
				}	
				if (data.password == ''){
					that.$utils.handleShowToast({
						msg:"请输入密码",
						status: 1
					}) 
				  return;
				}	
				if (data.password != data.confirmPassword){
					that.$utils.handleShowToast({
						msg:"两次密码不一致",
						status: 1
					}) 
					return;
				}	
				
				uni.showLoading({
					title: '提交中...',
					mask: true
				});
				data.passwordType = that.passwordType
				Api.changePassword(data).then(res=>{
					that.$utils.handleShowToast(res)  
					if(res.status == 0)
						setTimeout(function(){
							uni.navigateBack(1)
						},1000)
				})
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