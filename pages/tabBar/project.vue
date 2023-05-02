<template>
	<view>
		<view class="nav"></view>
		<view class="container">
			<goods-category @changeClassify="changeClassify"></goods-category>
			
			<goods-list ref="goodsRef"></goods-list>
		</view>
	</view>
	
</template>

<script>
	import goodsCategory from '@/components/goods/category.vue'
	import goodsList from '@/components/goods/list.vue'
	export default {
		components: {
			goodsList,
			goodsCategory
		},
		data() {
			return {
				
			}
		},
		methods: {
			changeClassify(item){
				this.$refs.goodsRef.product(item.id)
			},
		}
	}
</script>

<style>
	.container {
		width: 95%;
		margin: 0 auto;
	}
	.category-list{
		margin-top: 10rpx !important;
	}
	.nav{
		background-color: #ffffff;
	}
</style>
