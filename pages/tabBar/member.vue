<template>
	<view class="">
		<view class="nav"></view>
		<view class="container">
			<view class="header">
				<view class="userInfo">
					<view class="userInfo-info viewFlex">
						<view class="userInfo-info-item">
							{{user.info.phone}}
						</view>
						<view class="userInfo-info-item">
							{{infoData.Agent}}
						</view>
					</view>
					<view>等级</view>
				</view>
				<!-- viewFlex -->
				<view class="priceInfo ">
					<view class="priceInfo-item">
						<view class="priceSize">
							{{infoData.Balance}}
						</view>
						<view class="">
							账户余额
						</view>
					</view>
					<view class="priceInfo-item right">
						<view class="">
							<!-- 待投资金额：{{infoData.Balance}} -->
						</view>
						<view class="" >
							<!-- 可提现金额：{{infoData.Balance}} -->
						</view>
					</view>
				</view>
				<view class="priceUl viewFlex">
					<view class="priceUl-li">
						<view class="">
							{{infoData.Amount_receive}}
						</view>
						<view class="">
							待收本金(元)
						</view>
					</view>
					<view class="priceUl-li">
						<view class="">
							{{infoData.Interest_received}}
						</view>
						<view class="">
							待收收益(元)
						</view>
					</view>
					<view class="priceUl-li">
						<view class="">
							{{infoData.Yuebao}}
						</view>
						<view class="">
							余额宝(元)
						</view>
					</view>
					<view class="priceUl-li">
						<view class="">
							{{infoData.Reputation_points}}
						</view>
						<view class="">
							荣誉积分
						</view>
					</view>
				</view>
				
				<view class="btnInfo viewFlex">
					<navigator hover-class="none" class="btn" :url="navBankcard?'/pages/finance/withdrawal':'/pages/member/bankcardAuth'">
						提现
					</navigator> 
					<view class="line"></view>
					<navigator hover-class="none" class="btn" url="/pages/finance/recharge">
						充值
					</navigator> 
				</view>
			</view>
			
			<view class="content">
				<view style="height: 90rpx;"></view>
				<view class="list viewFlex">
					<navigator hover-class="none" :url="item.url" class="list-item viewFlex" :class="(index+1)%3 == 0?'right-border-none':''" v-for="(item, index) in btnList">
						<view class="">
							<view class="">
								<i class="iconfont" :style="'color:#' + item.color" :class="'icon-' +item.icon"></i>
							</view>
							<view class="">
								{{item.title}}
							</view>
						</view>
						<span class="notice" v-if="item.notice">{{notice}}</span>
					</navigator>
				</view>
			</view>
			
			<view class="logout" @click="logout">
				退出
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from "vuex";
	import { bankcardbinding } from "@/api/finance.js"
	import * as userApi from "@/api/user.js"
	export default {
		data(){
			return{
				btnList:[
					{
						title: "转账",
						icon: "yinhangqia",
						color: "53aaed",
						url: "/pages/finance/transfer",
					},
					{
						title: "余额宝",
						icon: "qiandai",
						color: "fcb848",
						url: "/pages/member/yuebao",
					},
					{
						title: "优惠券",
						icon: "youhuiquan",
						color: "fb6264",
						url: "/pages/member/coupon",
					},
					{
						title: "账号设置",
						icon: "shezhi",
						color: "fb5f60",
						url: "/pages/member/info",
					},
					{
						title: "资金流水",
						icon: "hongbao",
						color: "ff7f53",
						url: "/pages/finance/flowlog",
					},
					{
						title: "邀请好友",
						icon: "yaoqinghaoyou",
						color: "56bff9",
						url: "/pages/member/invite",
					},
					{
						title: "站内短信",
						icon: "duanxin",
						color: "56bff9",
						notice: true,
						url: "/pages/common/message",
					},
					{
						title: "收益记录",
						icon: "jilu",
						color: "60b768",
						url: "/pages/finance/incomelog",
					},
					{
						title: "投资记录",
						icon: "jiluliebiao",
						color: "faa530",
						url: "/pages/finance/investlog",
					},
					{
						title: "充值记录",
						icon: "qian",
						color: "aa7adf",
						url: "/pages/finance/rechargelog",
					},
					{
						title: "提现记录",
						icon: "3tixian",
						color: "e5b23d",
						url: "/pages/finance/withdrawallog",
					},
					{
						title: "兑换记录",
						icon: "gouwuchefill",
						color: "ff8053",
						url: "/pages/integral/exchangelog",
					}
				],
				navBankcard: true,
				infoData: {},
				notice: 0
			}
		},
		onShow() {
			let that = this
			userApi.mymsg().then(res=>{
				if(res.status == 0){
					that.notice = res.num
				}
			})
		},
		onLoad() {
			let that = this
			bankcardbinding().then(res => {
				if (res.status == 1) {
					that.navBankcard = false
				}
			})
			that.info()
		},
		computed: { 
		   ...mapState([ 
				'user' 
		   ]),
		},
		methods:{
			info(){
				let that = this
				that.$utils.handleUserInfo().then(res=>{
					if(res.status == 0){
						that.infoData = res.data
					}
				})
			},
			logout(){
				let that = this
				that.$store.commit("user/logout")
			},
		}
	}
</script>

<style lang="scss">
	.nav{
		background-color: #ff7949;
	}
	.container{
		.header{
			background-color: #ff7949;
			color: #ffffff;
			padding: 40rpx;
			height: 30vh;
			position: relative;
			.userInfo{
				margin-bottom: 40rpx;
			}
			.priceInfo{
				margin-bottom: 40rpx;
				.priceSize{
					font-size: 50rpx;
					font-weight: bold;
				}
				.priceInfo-item.right view{
					margin-top: 15rpx;
				}
			}
			
			.priceInfo-item, .userInfo-info-item{
				width: 50%;
			}
			.userInfo-info-item:nth-child(2), .priceInfo-item:nth-child(2){
				text-align: right;
			}
		}
		.priceUl{
			text-align: center;
			.priceUl-li{
				width: 25%;
				font-size: 28rpx;
				view{
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}
		.btnInfo{
			position: absolute;
			bottom: -50rpx;
			border-radius: 20rpx;
			width: 85%;
			background-color: #ffffff;
			color: #000000;
			left: 0;
			right: 0;
			margin: auto;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			-moz-box-shadow: 2px 2px 10px #909090;
			-webkit-box-shadow: 2px 2px 10px #909090;
			box-shadow:2px 2px 10px #909090;
			align-items: center;
			.line{
				height: 40%;
				border-left: 2rpx solid #a4a4a4;
			}
			.btn{
				width: 50%;
			}
		}
		.list{
			text-align: center;
			flex-wrap: wrap;
			border-top: 1rpx solid #eee;
			.list-item{
				border-right: 1rpx solid #eee;
				border-bottom: 1rpx solid #eee;
				align-items: center;
				justify-content: center;
				width: 33%;
				aspect-ratio: 1/1; 
				position: relative;
				.iconfont{
					font-size: 60rpx;
					width: 80rpx;
					height: 80rpx;
					line-height: 80rpx;
					display: inline-block;
				}
				.notice{
					position: absolute;
					top: 20rpx;
					right: 20rpx;
					width: 40rpx;
					height: 40rpx;
					line-height: 40rpx;
					text-align: center;
					background-color: red;
					border-radius: 50%;
					color: #ffffff;
				}
			}
			.right-border-none{
				border-right: 0;
			}
		}
	}
	.logout{
		margin-top: 50rpx;
		width: 100%;
		text-align: center;
		background-color: #fe8113;
		color: #ffffff;
		padding: 20rpx;
	}
</style>