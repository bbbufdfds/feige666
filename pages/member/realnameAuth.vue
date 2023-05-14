<template>
	<view class="container">
		<view class="cell-box">
			<span class="item-title">姓名:</span>
			<view class="item-centent">
				<input type="text" class="weui-input"  v-model="data.realname"
					placeholder="请输入姓名" maxlength="5"/>
			</view>
		</view>
		<view class="cell-box">
			<span class="item-title">身份证号:</span>
			<view class="item-centent">
				<input type="text" class="weui-input"  v-model="data.card"
					placeholder="请输入身份证号" maxlength="16"/>
			</view>
		</view>
		<view v-if="!user.info.isrealname" class="submit" @click="submit">确定修改</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	import { shiming } from "@/api/user.js";
	export default {
		computed: {
			...mapState([
				'user'
			]),
		},
		data() {
			return {
				data: {},
			}
		},
		methods:{
			submit(){
				let that = this
					,data = this.data
				
				if(!data.realname){
					that.$utils.handleShowToast({
						msg:"请输入姓名",
						status: 1
					}) 
					return
				}
				if(!data.card){
					that.$utils.handleShowToast({
						msg:"请输入身份证号",
						status: 1
					}) 
					return
				}
				shiming(this.data).then(res=>{
					that.$utils.handleShowToast(res) 
					if(res.status == 0){
						that.$store.commit("user/setUserInfo",{isrealname:1})
						setTimeout(function(){
							uni.navigateBack(1)
						},1000)
					}
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