<template>
	<view>
		<view class="container">
			<view class="header viewFlex">
				<view class="header-item">
					<view class="">
						￥{{data.user_balance}}
					</view>
					<view class="">
						账户可用余额(元)
					</view>
				</view>
				<view class="header-item">
					<view class="">
						￥{{data.remaining_balance}}
					</view>
					<view class="">
						项目可投金额(元)
					</view>
				</view>
			</view>
			<view class="line"></view>

			<view class="box">
				<view class="cell-box">
					<span class="item-title">起投金额:</span>
					<view class="item-centent">
						￥<text class="flag">{{data.start_balance}}</text>元
					</view>
				</view>
				<view class="cell-box">
					<span class="item-title">结息时间:</span>
					<view class="item-centent">
						满<text class="flag">{{data.time}}</text>自动结息
					</view>
				</view>
				<view class="cell-box">
					<span class="item-title" style="width: 50%;">投资金额:</span>
					<view class="item-centent viewFlex price" style="width: 50%;">
						<view class="dec" @click="dec">
							-
						</view>
						<input type="number" v-model="price" @blur="priceBlur" style="width: 65%;">
						<view class="inc" @click="inc">
							+
						</view>
					</view>
				</view>
				<view class="cell-box">
					<span class="item-title">加息券:</span>
					<view class="item-centent">
						<picker @change="bindPickerChange" data-index="index_1" range-key="name" :value="index_1" :range="coupon_1">
							<view class="uni-input" >{{index_1>-1?coupon_1[index_1].name:"请选择"}}</view>
						</picker>
					</view>
				</view>
				<view class="cell-box">
					<span class="item-title">现金券:</span>
					<view class="item-centent">
						<picker @change="bindPickerChange" data-index="index_2" range-key="name" :value="index_2" :range="coupon_2">
							<view class="uni-input" >{{index_2>-1?coupon_2[index_2].name:"请选择"}}</view>
						</picker>
					</view>
				</view>
				<view class="cell-box">
					<span class="item-title">支付密码:</span>
					<view class="item-centent">
						<input type="password" class="weui-input" v-model="data.pwdPay" placeholder="默认为登录密码" />
					</view>
				</view>
			</view>
		</view>
		<view class="submit" @click="submit">立即投资</view>
	</view>
</template>

<script>
	
	import { detail, pay } from "@/api/product.js"
	export default {
		data() {
			return {
				data: {
					remaining_balance:0,
					start_balance:0,
					time: "xx",
					pwdPay:""
				},
				price: 0,
				coupon_1: [],
				index_1: -1,
				coupon_2: [],
				index_2: -1,
				id: 0,
				decNum: 100,
				incNum: 100,
			}
		},
		onLoad(options) {
			if(!options.id){
				uni.switchTab({
					url:"/pages/tabBar/index"
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
						that.price = res.data.start_balance
						that.coupon_1 = res.data.interest_coupon
						that.coupon_2 = res.data.cash_coupon
						// console.log(res.data.cash_coupon)
					}
				})
			},
			bindPickerChange(e) {
				this[e.currentTarget.dataset.index] = e.detail.value
			},
			inc(){
				this.price = this.price + this.incNum
				this.verifyPrice()
			},
			dec(){
				this.price = this.price - this.decNum
				this.verifyPrice()
			},
			submit(){
				let that= this
					,data = this.data
					
				if(that.price > data.remaining_balance){
					that.$utils.handleShowToast({
						msg:"不可大于项目可投金额",
						status: 1
					}) 
					return;
				}
				if(!data.pwdPay){
					that.$utils.handleShowToast({
						msg:"请输入支付密码",
						status: 1
					}) 
					return;
				}
				
				let field = {
					idPay: that.id,
					amountPay: that.price,
					pwdPay: data.pwdPay,
				}
				if(that.index_1 > -1){
					field.ratecoupon = that.coupon_1[that.index_1].id
				}
				if(that.index_2 > -1){
					field.cashcoupon = that.coupon_2[that.index_2].id
				}
				pay(field).then(res=>{
					that.$utils.handleShowToast(res) 
					if (res.status == 0) {
						that.$utils.handleNavigateTo("/pages/finance/investlog")
					}
				})
			},
			verifyPrice(){
				let data = this.data
				if(this.price > data.remaining_balance){
					this.price = data.remaining_balance
				}
				if(this.price < data.start_balance){
					this.price = data.start_balance
				}
				this.$forceUpdate()
			},
			priceBlur(res){
				this.verifyPrice()
			}
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
			padding: 25rpx 0;
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