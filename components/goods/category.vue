<template>
	<view class="category-list viewFlex">
		<view class="category-list-item" @click="classifyClick(index)" :class="index==classifyIndex?'active':''" v-for="(item, index) in classifyList" :key="index">
			{{item.name}}
		</view>
	</view>
</template>

<script>
	import * as Api from "@/api/product.js"
	export default {
		data() {
			return {
				classifyList: [],
				classifyIndex: "",
			}
		},
		mounted() {
			this.classify()
		},
		methods:{
			classify(){
				let that = this
				Api.classify().then(res=>{
					if(res.status == 0)
						that.classifyList = res.data
				})
			},
			classifyClick(index){
				this.classifyIndex = index
				this.$emit("changeClassify", this.classifyList[index])
			},
		}
	}
</script>

<style>
	
	.category-list {
		flex-flow: row wrap;
		justify-content: space-between;
		margin: 80rpx auto 40rpx;
	}
	
	.category-list-item {
		height: 42rpx;
		line-height: 42rpx;
		padding: 0 15rpx;
		margin-right: 20rpx;
		margin-bottom: 10rpx;
		font-size: 32rpx;
		border-radius: 42rpx;
		color: #676767;
		text-align: center;
	}
	.category-list-item.active{
		background-color: #ff820d;
		color: #fff;
	}
</style>