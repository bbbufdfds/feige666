<template>
	<view class="container">
		<form class="form" @submit="formSubmit" @reset="formReset">
			<view class="cell-box">
				<span class="item-title">提现时间:</span>
				<view class="item-centent">
					10:00-22:00
				</view>
			</view>
			<view class="cell-box">
				<span class="item-title">提现金额(元):</span>
				<view class="item-centent">
					<input type="number" class="weui-input"  name="amount" :value="data.amount" placeholder="不能低于100元"
						maxlength="11" />
				</view>
			</view>
			<view class="cell-box">
				<span class="item-title">可提现金额(元):</span>
				<view class="item-centent">
					{{infoData.Balance}}
				</view>
			</view>
			<view class="cell-box">
				<span class="item-title">交易密码:</span>
				<view class="item-centent">
					<input type="password" class="weui-input" name="paypwd" :value="data.paypwd" placeholder="请输入交易密码" />
				</view>
			</view>
			<button class="submit" form-type="submit">申请提现</button>
		</form>
	</view>
</template>

<script>
	import * as Api from "@/api/finance.js"
	export default {
		data() {
			return {
				data: {},
				navBank: false,
				infoData:{},
			}
		},
		onLoad() {
			this.loadbank()
			this.init()
		},
		methods: {
			loadbank() {
				let that = this
				Api.bankcardbinding().then(res => {
					if (res.status == 1) {
						that.navBank = true
					}
				})
			},
			init(){
				let that = this
				that.$utils.handleUserInfo().then(res=>{
					if(res.status == 0){
						that.infoData = res.data
					}
				})
			},
			formSubmit(e) {
				
				if(this.navBank){
					that.$utils.handleShowToast({
						msg:"请绑定银行卡",
						status: 1
					}) 
					setTimeout(function(){
						uni.navigateTo({
							url: "/pages/member/bankcard"
						})
					},1000)
					return
				}
				
				let that = this
					, data = e.detail.value;
				if (data.amount == '') {
					that.$utils.handleShowToast({
						msg:"请输入提现金额",
						status: 1
					}) 
					return;
				}
				
				if(this.infoData.Balance < data.amount){
					that.$utils.handleShowToast({
						msg:"可提现金额不可大于余额",
						status: 1
					}) 
					return
				}
				
				
				if(data.amount < 100){
					that.$utils.handleShowToast({
						msg:"提现金额不能低于100",
						status: 1
					}) 
					return;
				}
				if (data.paypwd == '') {
					that.$utils.handleShowToast({
						msg:"请输入交易密码",
						status: 1
					}) 
					return;
				}
				
				Api.withdraw(data).then(res=>{
					that.$utils.handleShowToast(res) 
					if(res.status == 0)
						that.$utils.handleNavigateTo("/pages/finance/withdrawallog")
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