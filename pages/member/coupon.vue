<template>
	<view class="container">
		<view class="tab-list viewFlex">
			<view v-for="(item,index) in tabList" class="tab-item" :class="index == tabIndex?'active':''" @click="tabClick(index)">
				{{item.title}}
			</view>
		</view>
		<view class="">
			<view class="empty">
				<image src="../../static/img/coupon.png"></image>
				<view class="">
					没有优惠券
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				tabList:[
					{
						title: "未使用",
						index: 0,
					},
					{
						title: "已使用",
						index: 1,
					},
					{
						title: "已过期",
						index: 2,
					}
				],
				tabIndex: 0,
			}
		},
		onLoad() {
			
			
		},
		methods:{
			tabClick(index){
				let that = this
				that.tabIndex = index
			}
		}
	}
</script>

<style lang="scss">
	.container{
		background-color: #f9f9f9;
		.tab-list{
			background-color: #ffffff;
			.tab-item{
				width: 33.33333333%;
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				color: #676769;
				position: relative;
			}
			.active::before{
				content: "";
				position: absolute;
				bottom: 0;
				border: 1rpx solid #fe8113;
				width: 80%;
				box-sizing: border-box;
				left: 50%;
				transform: translate(-50%, -50%);
				border-radius: 20rpx;
				overflow: hidden;
			}
		}
		.empty{
			text-align: center;
			color: #bfc3cd;
			padding: 20rpx 0;
			image{
				width: 150rpx;
				height: 140rpx;
			}
		}
	}
	
</style>