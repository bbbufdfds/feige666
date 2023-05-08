<template>
	<view class="container">
		<view class="notice">
			充值前请联系在线客服
		</view>
		<view class="cell-box">
			<span class="item-title">用户ID:</span>
			<view class="item-centent">
				{{user.info.phone}}
			</view>
		</view>
		<!-- <view class="cell-box">
			<span class="item-title">账户余额:</span>
			<view class="item-centent">
				6666
			</view>
		</view> -->
		<view class="cell-box">
			<span class="item-title" style="width: 20%;">温馨提示:</span>
			<view class="item-centent" style="color: #c6c6c6;width: 80%;text-align: left;">
				请联系在线客服充值，转账成功发送转账截图到在线客服确认后，填写充值金额，确认提交即可
			</view>
		</view>
		<view class="cell-box">
			<span class="item-title">充值金额:</span>
			<view class="item-centent">
				<input type="text" class="weui-input"  v-model="data.amount"
					placeholder="请输入充值金额" maxlength="6" />
			</view>
		</view>
		<view class="cell-box">
			<span class="item-title">汇款转账时间:</span>
			<view class="item-centent">
				{{data.currentYMD}}
			</view>
		</view>
		<view class="cell-box">
			<span class="item-title">兑换码:</span>
			<view class="item-centent">
				<input type="text" class="weui-input"  v-model="data.password"
					placeholder="请输入兑换码(非必填)" maxlength="6" />
			</view>
		</view>
		<view class="submit" @click="submit">确定提交</view>
	</view>
</template>

<script>
	import * as Api from "@/api/finance.js"
	import {mapState} from "vuex";
	export default {
		computed: {
		   ...mapState([ 
				'user' 
		   ]),
		},
		data() {
			return {
				data:{
					currentYMD: this.$utils.handleCurrentYMD()
				}
			}
		},
		onLoad() {
			
		},
		methods: {
			submit(){
				let that = this
					, data = that.data
				
				if(!data.amount){
					that.$utils.handleShowToast({
						msg: "请输入充值金额",
						status: 1,
					})
					return
				}
				
				Api.recharge(that.data).then(res=>{
					that.$utils.handleShowToast(res)
					if(res.status == 0)
						that.$utils.handleNavigateTo("/pages/finance/rechargelog")
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.notice{
			padding: 40rpx 0;
			font-size: 35rpx;
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