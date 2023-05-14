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
				<view class="btn" @click="click('+')">
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
				<view class="btn right" @click="click('-')">
					转出
				</view>
			</view>
		</view>
		<view class="line"></view>
		<Itable :column="column" :list="list" />
	</view>
</template>

<script>
	import { yuebao as yuebaoApi, yeboperation as yeboperationApi  } from "@/api/user.js"
	export default {
		data() {
			return {
				list: [],
				page: 1,
				data:{},
				column:[
					{
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
				]
			}
		},
		onLoad() {
			this.getList()
		},
		onReachBottom() {
			this.page = this.page + 1
			this.getList()
		},
		methods:{
			getList(){
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
				let that = this
				yuebaoApi({
					page: this.page
				}).then(res=>{
					if(res.status == 0){
						const { data } = res.data;
						if(data.length > 0){
							that.list = that.list.concat(data)
						}else{
							that.page = that.page - 1
						}
						that.data = res.show
					}
				})
			},
			click(t){
				let that = this
				uni.showModal({
					title: '金额',
					confirmColor:'#3A3A3A',
					cancelColor:'#999999',
					confirmText:'提交',
					editable:true,
					content:'',
					placeholderText:"请输入金额",
					success: function (res) {
						if(res.confirm){
							if(t == "-"){
								res.content = Number(res.content)
								if(res.content > that.data.yuamount){
									that.$utils.handleShowToast({
										msg:"转出金额不可大于总金额",
										status: 1
									}) 
									return;
								}
							}
							if(res.content){
								yeboperationApi({
									act: t,
									amount: res.content
								}).then(res=>{
									that.$utils.handleShowToast(res) 
								})
							}else{
								that.$utils.handleShowToast({
									msg:"请输入金额",
									status: 1
								}) 
								return;
							}
						}
					},
				})
			}
		}
	}
</script>

<style lang="scss">
	.container{
		width: 92%;
		margin: 0 auto;
		.header{
			color: #ffffff;
			margin-top: 20rpx;
			padding: 20rpx;
			background-color: #fe8113;
			border-radius: 10rpx;
			text-align: center;
			.header-item{
				padding: 10rpx 0;
			}
		}
		.line{
			border-bottom: 1rpx solid #efefef;
			margin: 25rpx 0;
		}
		.priceInfo{
			.priceInfo-item{
				flex: 1;
				text-align: center;
				.text{
					font-weight: bold;
					margin-bottom: 15rpx;
				}
				.bt{
					font-weight: normal;
				}
			}
			view{
				margin-bottom: 10rpx;
			}
			.btn{
				padding: 15rpx 0;
				background-color: #5bc724;
				width: 80%;
				margin: 0 auto;
				color: #ffffff;
				border-radius: 10rpx;
			}
			.right{
				background-color: #f46c6c;
			}
		}
		
	}
</style>