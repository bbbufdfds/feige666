<template>
	<view class="container">
		<view class="header">
			<view class="header-item">
				今日收益：{{data.Dayyuemoneys}}（元）
			</view>
			<view class="header-item">
				总金额：{{data.yuamount}}（元）
			</view>
		</view>
		<view class="line"></view>
		<view class="priceInfo viewFlex">
			<view class="priceInfo-item">
				<view class="text">
					{{data.Allyuemoneys}}
				</view>
				<view class="text bt">
					累计收益(元)
				</view>
				<view class="btn" @click="open('+')">
					转入
				</view>
			</view>
			<!-- <view class="priceInfo-item">
				<view class="text">
					{{data.YuBaoLv}}
				</view>
				<view class="text bt">
					万份收益(%)
				</view>
			</view> -->
			<view class="priceInfo-item">
				<view class="text">
					{{data.day7}}
				</view>
				<view class="text bt">
					七日年化(%)
				</view>
				<view class="btn right" @click="open('-')">
					转出
				</view>
			</view>
		</view>
		<view class="line"></view>
		<Itable :column="column" :list="list" />
		<uni-popup ref="popup" type="center">
			<view class="popupDetail">
				<view class="popup-close" @click="$refs.popup.close()">✖</view>
				<view class="box">
					<view class="title">金额</view>
					<radio-group @change="radioChange">
						<view class="cell-box">
							<span class="item-title">待投资金额：￥<text class="flag">{{yeboprice.invest_price}}</text>元</span>
							<view class="item-centent">
								<radio value="1" checked color="#fe8113"	/>
							</view>
						</view>
						<view class="cell-box">
							<span class="item-title">可提现金额：￥<text class="flag">{{yeboprice.withdraw_price}}</text>元</span>
							<view class="item-centent">
								<radio value="2" color="#fe8113"	/>
							</view>
						</view>
					</radio-group>
					<input type="number" class="weui-input" v-model="value" placeholder="请输入金额" maxlength="10"/>
					<button type="primary" @click="submit">提交</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		yuebao as yuebaoApi,
		yeboprice,
		yeboperation as yeboperationApi
	} from "@/api/user.js"
	export default {
		data() {
			return {
				list: [],
				page: 1,
				data: {},
				column: [{
						title: "序号",
						prop: "id",
					},
					{
						title: "标题",
						prop: "moneylog_type",
					},
					{
						title: "金额",
						prop: "moneylog_money",
					},
					{
						title: "时间",
						prop: "date",
					}
				],
				value: "",
				priceType: 1,
				t: "",
				yeboprice: {
					invest_price: 0.00,
					withdraw_price: 0.00
				}
			}
		},
		onLoad() {
			this.getList()
		},
		onReachBottom() {
			this.page = this.page + 1
			this.getList()
		},
		methods: {
			getList() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
				let that = this
				yuebaoApi({
					page: this.page
				}).then(res => {
					if (res.status == 0) {
						const {
							data
						} = res.data;
						if (data.length > 0) {
							that.list = that.list.concat(data)
						} else {
							that.page = that.page - 1
						}
						that.data = res.show
					}
				})
			},
			open(t){
				let that  = this
				this.t = t
				this.$refs.popup.open()
				yeboprice({
					t:t
				}).then(res=>{
					if(res.status == 0){
						that.yeboprice = res.data
					}
				})
			},
			submit() {
				let that = this
					, t = that.t 
					, clickCountName
					, value = Number(this.value)
				if (t == "-") {
					clickCountName = "yuebaoDecCount"
				} else {
					clickCountName = "yuebaoIncCount"
				}
				that.$utils.handleClickCount(clickCountName)
				
				if(!value){
					that.$utils.handleShowToast({
						msg: "请输入金额",
						status: 1
					})
					return;
				}
				if (t == "-") {
					if (value > that.data.yuamount) {
						that.$utils.handleShowToast({
							msg: "转出金额不可大于总金额",
							status: 1
						})
						return;
					}
				}
				if(this.priceType == 1 && value > this.yeboprice.invest_price){
					that.$utils.handleShowToast({
						msg: "金额不可大于待投资金额",
						status: 1
					})
					return
				}
				if(this.priceType == 2 && value > this.yeboprice.withdraw_price){
					that.$utils.handleShowToast({
						msg: "金额不可大于可提现金额",
						status: 1
					})
					return
				}
				yeboperationApi({
					act: t,
					amount: value,
					priceType: this.priceType
				}).then(res => {
					if (res.status == 0) {
						that.$utils.handleSaveClickCount(clickCountName)
					}
					that.$utils.handleShowToast(res)
				})
			},
			radioChange(e){
				this.priceType = e.detail.value
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
			}
		}

		.line {
			border-bottom: 1rpx solid #efefef;
			margin: 25rpx 0;
		}

		.priceInfo {
			.priceInfo-item {
				flex: 1;
				text-align: center;

				.text {
					font-weight: bold;
					margin-bottom: 15rpx;
				}

				.bt {
					font-weight: normal;
				}
			}

			view {
				margin-bottom: 10rpx;
			}

			.btn {
				padding: 15rpx 0;
				background-color: #5bc724;
				width: 80%;
				margin: 0 auto;
				color: #ffffff;
				border-radius: 10rpx;
			}

			.right {
				background-color: #f46c6c;
			}
		}

	}
	.popupDetail{
		position: relative;
		width: 80vw;
		background-color: #ffffff;
		border-radius: 20rpx;
		overflow: hidden;
		.popup-close{
			position: absolute;
			top: 20rpx;
			right: 20rpx;
		}
		
		.box{
			padding: 20rpx;
			padding-top: 50rpx;
			.title{
				text-align: center;
				font-size: 35rpx;
				font-weight: bold;
			}
			.cell-box {
				display: flex;
				align-items: center;
				padding: 25rpx 30rpx;
				box-sizing: border-box;
				background-color: #fff;
				border-bottom: 1px solid #f8f8f8;
			
				.item-title {
					font-size: 30rpx;
					color: #333;
					width: 80%;
					font-weight: bold;
					.flag{
						color: red;
					}
				}
			
				.item-centent {
					width: 20%;
					text-align: right;
				}
			}
			.weui-input{
				padding: 25rpx 30rpx;
			}
		}
		button{
			background-color: #fe8113;
		}
	}
</style>