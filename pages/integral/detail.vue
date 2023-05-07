<template>
	<view>
		<view class="container">
			<view class="box">
				<view class="cell-box">
					<span class="item-title">商品名称:</span>
					<view class="item-centent">
						{{data.title}}
					</view>
				</view>
				<view class="cell-box">
					<span class="item-title" style="width: 65%;">兑换数量:</span>
					<view class="item-centent viewFlex price">
						<view class="dec" @click="dec">
							-
						</view>
						<input type="number" v-model="number" @blur="numberBlur">
						<view class="inc" @click="inc">
							+
						</view>
					</view>
				</view>
				<view class="cell-box">
					<span class="item-title" style="width: 65%;">所需积分:</span>
					<view class="item-centent">
						{{data.integral * number}}
					</view>
				</view>
				<view class="cell-box">
					<span class="item-title">收件人名字:</span>
					<view class="item-centent">
						<input type="text" class="weui-input" v-model="data.name" placeholder="请输入收件人名字" />
					</view>
				</view>
				<view class="cell-box">
					<span class="item-title">联系电话:</span>
					<view class="item-centent">
						<input type="text" class="weui-input" v-model="data.phone" placeholder="请输入联系电话" />
					</view>
				</view>
				<view class="cell-box">
					<span class="item-title">收货地址:</span>
					<view class="item-centent">
						<input type="text" class="weui-input" v-model="data.address" placeholder="请输入收货地址" />
					</view>
				</view>
			</view>
		</view>
		<view class="submit" @click="submit">立即投资</view>
	</view>
</template>

<script>
	import { detail, jifenexchange} from "@/api/integral.js";
	export default {
		data() {
			return {
				data: {
					title: "",
					integral: "",
					userintegral: "",
					name: "",
					phone: "",
					address: "",
				},
				number: 1
			}
		},
		onLoad(options) {
			if(!options.id){
				uni.navigateTo({
					url:"/pages/integral/mall"
				})
				return
			}
			this.id = options.id
			this.init()
		},
		methods: {
			init(){
				let that = this
				detail({
					id: this.id
				}).then(res=>{
					if(res.status == 0){
						that.data = res.data
					}
				})
			},
			inc(){
				this.number = this.number + 1
			},
			dec(){
				let number = this.number - 1
				if(this.number < 2){
					number = 1
				}
				this.number = number
			},
			submit(){
				let that= this
					,data = this.data
					
				if(!data.name){
					that.$utils.handleShowToast({
						msg:"请输入姓名",
						status: 1
					}) 
					return;
				}
				if(!data.phone){
					that.$utils.handleShowToast({
						msg:"请输入手机号",
						status: 1
					}) 
					return;
				}
				if(!data.address){
					that.$utils.handleShowToast({
						msg:"请输入地址",
						status: 1
					}) 
					return;
				}
				if(data.integral * that.number > data.userintegral){
					that.$utils.handleShowToast({
						msg:"积分不足",
						status: 1
					}) 
					return;
				}
				data.number = that.number
				jifenexchange(data).then(res=>{
					that.$utils.handleShowToast(res) 
					if (res.status == 0) {
						that.$utils.handleNavigateTo("/pages/integral/exchangelog")
					}
				})
			},
			numberBlur(res){
				console.log(res)
				if(this.number < 0){
					this.number = 1
				}
				this.$forceUpdate()
			},
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