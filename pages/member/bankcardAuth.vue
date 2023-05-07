<template>
	<view class="container">
		<form class="form" @submit="formSubmit" @reset="formReset">
			<view class="cell-box">
				<span class="item-title">银行名称:</span>
				<view class="item-centent">
					<input type="text" class="weui-input" name="bankname" :value="data.bankname"
						placeholder="请输入银行名称" maxlength="11"/>
				</view>
			</view>
			<view class="cell-box">
				<span class="item-title">姓名:</span>
				<view class="item-centent">
					<input type="text" class="weui-input"  name="bankrealname" :value="data.bankrealname"
						placeholder="请输入姓名" maxlength="11"/>
				</view>
			</view>
			<view class="cell-box">
				<span class="item-title">卡号:</span>
				<view class="item-centent">
					<input type="number" class="weui-input"  name="bankcode" :value="data.bankcode"
						placeholder="请输入卡号" maxlength="11"/>
				</view>
			</view>
			<view class="cell-box">
				<span class="item-title">开户行:</span>
				<view class="item-centent">
					<input type="text" class="weui-input" name="bankaddress" :value="data.bankaddress"
						placeholder="请输入开户行" />
				</view>
			</view>
			<button class="submit" form-type="submit">立即绑定</button>
		</form>
	</view>
</template>

<script>
	import * as Api from "@/api/user.js"
	export default {
		data() {
			return {
				data:{}
			}
		},
		onLoad() {
		},
		methods: {
			formSubmit: function(e){
				let that = this
					, data = e.detail.value;
				
				if (data.bankname == ''){
					that.$utils.handleShowToast({
						msg:"请输入银行名称",
						status: 1
					}) 
				  return;
				}	
				if (data.bankrealname == ''){
					that.$utils.handleShowToast({
						msg:"请输入姓名",
						status: 1
					}) 
				  return;
				}
				if (data.bankcode == ''){
					that.$utils.handleShowToast({
						msg:"请输入卡号",
						status: 1
					})  
				  return;
				}
				if (data.bankaddress == ''){
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
				
				Api.addbank(data).then(res=>{
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