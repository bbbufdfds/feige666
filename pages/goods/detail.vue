<template>
	<view>
		<view class="main">
			<view class="header">
				<view class="img">
					<image :src="data.image" mode="aspectFill"></image>
				</view>
				<view class="title">
					{{data.name}}
				</view>
				<view class="viewFlex box">
					<view class="box-item">
						<view class="">
							收益比例
						</view>
						<view class="price">
							<text>{{data.profit}}</text>
						</view>
					</view>
					<view class="box-item">
						<view class="">
							分红({{data.day}}):
						</view>
						<view class="price">
							<text>{{data.dividends}}</text>
						</view>
					</view>
					<view class="box-item">
						<view class="">
							投资周期
						</view>
						<view class="price">
							<text>{{data.cycle}}</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="detail">
				<view class="title">
					项目详情
				</view>
				<view class="line"></view>
				<view class="">
					<u-parse :content="data.content" @preview="preview" @navigate="navigate" noData="正在加载中..." />
				</view>
			</view>
		</view>
		<view class="bottomBlock"></view>
		<view class="submit" @click="submit">立即投资</view>
		<uni-popup type="bottom" ref="popup" @change="popupDetailChange">
			<view class="popupDetail">
				<view class="product viewFlex">
					<view class="product-img">
						<image :src="data.image" mode="aspectFill"></image>
					</view>
					<view class="product-info">
						<view class="symbol">
							<text>￥</text>{{price}}
						</view>
						<view class="estimate">
							<text class="">分红({{data.day}}):{{data.dividends}}</text>
						</view>
					</view>
				</view>
				<view class="box">
					<view class="cell-box">
						<span class="item-title">项目可投金额:</span>
						<view class="item-centent">
							￥<text class="flag">{{data.remaining_balance}}</text>元
						</view>
					</view>
					<view class="cell-box">
						<span class="item-title">账户可用余额:</span>
						<view class="item-centent">
							￥<text class="flag">{{data.user_balance}}</text>元
						</view>
					</view>
					<view class="cell-box">
						<span class="item-title">结息时间:</span>
						<view class="item-centent">
							满<text class="flag">{{data.time}}</text>自动结息
						</view>
					</view>
					<view class="cell-box">
						<span class="item-title" style="width: 70%;">投资份数:</span>
						<view class="item-centent viewFlex price" style="width: 30%;">
							<view class="dec" @click="dec">
								-
							</view>
							<input type="number" v-model="num" @blur="numBlur" >
							<view class="inc" @click="inc">
								+
							</view>
						</view>
					</view>
					<view class="cell-box">
						<span class="item-title">优惠券:</span>
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
				<view class="bottomBlock"></view>
				<view class="bottomBlock"></view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uParse from '@/components/u-parse/u-parse.vue'
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
				num: 1,
				price: 0,
				coupon_2: [],
				index_2: -1,
				id: 0,
				popupDetail: true
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
						that.data = that.$utils.handleFile(res.data, "image")
						that.price = res.data.start_balance
						that.numPrice = that.price
						that.coupon_2 = res.data.cash_coupon
						uni.setNavigationBarTitle({
							title: that.data.name
						});

					}
				})
			},
			bindPickerChange(e) {
				this[e.currentTarget.dataset.index] = e.detail.value
			},
			submit(){
				let that= this
					,data = this.data
					
				if(this.popupDetail){
					this.popupDetail = false
					this.$refs.popup.open()
					return
				}
				this.popupDetail = !this.popupDetail
				
				if(that.price > data.remaining_balance){
					that.$utils.handleShowToast({
						msg:"不可大于项目可投金额",
						status: 1
					}) 
					this.popupDetail = true
					return;
				}
				if(!data.pwdPay){
					that.$utils.handleShowToast({
						msg:"请输入支付密码",
						status: 1
					}) 
					this.popupDetail = true
					return;
				}
				
				let field = {
					idPay: that.id,
					num: that.num,
					pwdPay: data.pwdPay,
				}
				if(that.index_2 > -1){
					field.cashcoupon = that.coupon_2[that.index_2].id
				}
				pay(field).then(res=>{
					that.$utils.handleShowToast(res) 
					if (res.status == 0) {
						that.$utils.handleNavigateTo("/pages/finance/investlog")
					}
				}).finally(res=>{
					that.popupDetail = false
				})
			},
			inc(){
				this.num = Number(this.num) + 1
				this.verifyPrice()
			},
			dec(){
				this.num = Number(this.num) - 1
				if(this.num < 1){
					this.num = 1
				}
				this.verifyPrice()
			},
			verifyPrice(){
				let data = this.data
					, num = Number(this.num)
					, price = data.start_balance * num
				if(price > data.remaining_balance){
					num = Math.ceil(data.remaining_balance / data.start_balance)
					this.num = num
				}
				this.price = data.start_balance * num
				this.$forceUpdate()
			},
			numBlur(res){
				this.verifyPrice()
			},
			popupDetailChange(e){
				this.popupDetail = !e.show
			}
		}
	}
</script>

<style lang="scss">
	.main{
		.header {
			width: 95%;
			margin: 0 auto;
			margin-top: 20rpx;
			border-radius: 10rpx;
			.img{
				width: 100%;
				height: 30vh;
				overflow: hidden;
				border-radius: 5rpx;
				image{
					width: 100%;
					height: 100%;
					display: block;
				}
			}
			.title{
				margin-top: 20rpx;
				font-size: 30rpx;
				font-weight: bold;
			}
			.box{
				border: 1rpx solid #ebebeb;
				padding: 20rpx;
				text-align: center;
				margin-top: 30rpx;
				color: #9f8080;
				.box-item{
					width: 30%;
					.price{
						color: #000000;
						margin-top: 10rpx;
						text{
							color: red;
						}
					}
				}
				.box-item:nth-child(2){
					border-left: 1rpx  solid #ebebeb;
					border-right: 1rpx  solid #ebebeb;
					width: 40%;
				}
			}
		}
		.detail{
			margin-top: 40rpx;
			.title{
				text-align: center;
			}
			.line{
				margin-top: 20rpx;
				height: 10rpx;
				background-color: #fe8113;
			}
		}
	}
	
	.popupDetail{
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		background-color: #ffffff;
		padding-top: 30rpx;
		.box, .product{
			width: 90%;
			margin: 0 auto;
		}
		.product{
			margin-bottom: 50rpx;
			.product-img{
				width: 40%;
				overflow: hidden;
				border-radius: 20rpx;
				height: 220rpx;
				image{
					width: 100%;
					height: 100%;
					display: block;
				}
			}
			.product-info{
				width: 58%;
				margin-left: 2%;
				color: #fe8113;
				.symbol{
					font-weight: bold;
					text{
						font-size: 50rpx;
					}
				}
				.estimate{
					margin-top: 20rpx;
					text{
						padding: 5rpx 30rpx;
						border-radius: 50rpx;
						background-color: #fe8113;
						color: #ffffff;
						font-size: 30rpx;
					}
				}
			}
		}
		.box{
			.cell-box {
				display: flex;
				align-items: center;
				padding: 6rpx 0;
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
	}
	.bottomBlock, .submit,.popupDetail .cell-box {
		height: 100rpx;
		line-height: 100rpx;
	}
	.submit {
		position: fixed;
		bottom: 0;
		background-color: #fe8113;
		color: #fff;
		width: 100%;
		text-align: center;
		z-index: 999;
	}
</style>