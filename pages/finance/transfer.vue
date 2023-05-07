<template>
	<view class="container">
		<view class="cell-box">
			<span class="item-title">账户余额:</span>
			<view class="item-centent">
				{{infoData.Balance}}
			</view>
		</view>
		<view class="cell-box">
			<span class="item-title">收款账户:</span>
			<view class="item-centent">
				<input type="number" class="weui-input"  v-model="data.phone"
					placeholder="请输入收款账户" />
			</view>
		</view>
		<view class="cell-box">
			<span class="item-title">转账金额:</span>
			<view class="item-centent">
				<input type="number" class="weui-input" @blur="amountBlur" v-model="amount"
					placeholder="请输入转账金额" />
			</view>
		</view>
		<view class="notice">
			第三方框架开发发觉打赏大手大脚爱丽丝的
			第三方框架开发发觉打赏大手大脚爱丽丝的
			第三方框架开发发觉打赏大手大脚爱丽丝的
		</view>
		<view class="submit" @click="submit">立即转账</view>
	</view>
</template>

<script>
	import {transfer} from "@/api/finance.js"
	
	export default {
		data() {
			return {
				data:{},
				infoData:{},
				amount: ""
			}
		},
		onLoad() {
			this.init()
		},
		onNavigationBarButtonTap(e) {
		    uni.navigateTo({
		        url: "/pages/finance/transferlog"
		    })
		},
		methods: {
			init(){
				let that = this
				that.$utils.handleUserInfo().then(res=>{
					if(res.status == 0){
						that.infoData = res.data
					}
				})
			},
			submit(){
				let that = this
					, data = that.data
					, amount = Number(this.amount)
				
				if(!data.phone){
					that.$utils.handleShowToast({
						msg:"请输入收款账户",
						status: 1
					}) 
					return
				}
				if(!amount || amount < 0){
					that.$utils.handleShowToast({
						msg:"请输入转账金额",
						status: 1
					}) 
					return
				}
				if(this.infoData.Balance < amount){
					that.$utils.handleShowToast({
						msg:"转账金额不可大于余额",
						status: 1
					}) 
					return
				}
				
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
				data.amount = amount
				transfer(data).then(res=>{
					that.$utils.handleShowToast(res)
					if (res.status == 0) {
						that.$utils.handleNavigateTo("/pages/finance/transferlog")
					}
				})
			},
			amountBlur(){
				if(this.infoData.Balance < this.amount){
					console.log(123)
					this.amount = this.infoData.Balance
				}
				this.$forceUpdate()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.notice{
			padding: 25rpx 32rpx;
			color: #d64147;
		}
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