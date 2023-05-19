<template>
	<view class="container">
		<view class="tab-list viewFlex">
			<view v-for="(item,index) in tabList" class="tab-item" :class="index == tabIndex?'active':''" @click="tabClick(index)" :key="index">
				{{item.title}}
			</view>
		</view>
		<view class="content">
			<block class=""  v-if="list.length > 0">
				<coupon v-for="(item, index) in list" :key="index" v-bind:item="item" theme="#ff6c00" color="#ffffff" solid="#ff6c00"></coupon>
			</block>
			<view class="empty" v-else>
				<image src="../../static/img/coupon.png"></image>
				<view class="">
					没有优惠券
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { coupon as couponApi } from "@/api/user.js"
	import coupon from '@/components/coolc-coupon/coolc-coupon';
	export default {
		components: {
			coupon
		},
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
				list:[],
				tabIndex: 0,
			}
		},
		onLoad() {
			this.getList()
		},
		methods:{
			getList(){
				let that = this
				couponApi({
					pid: that.tabIndex + 1
				}).then(res=>{
					if(res.status == 0){
						that.list = res.data
					}
				})
			},
			tabClick(index){
				this.list = []
				this.tabIndex = index
				this.getList()
			}
		}
	}
</script>

<style lang="scss">
	.container{
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
		.content{
			width: 90%;
			margin: 0 auto;
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