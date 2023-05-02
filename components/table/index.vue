<template>
	<view class="table">
		<view class="theader viewFlex">
			<view class="" v-for="(item, index) in column">
				{{item.title}}
			</view>
		</view>
		<view class="tbody">
			<block v-if="list.length > 0">
				<view class="tbody-item viewFlex" v-for="(item, index) in list" >
					<view class="" v-for="(cItem, cIndex) in column">
						{{item[cItem.prop]}}
					</view>
				</view>
			</block>
			<view class="empty" v-else>
				暂无更多数据
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "Itable",
		props:{
			column: {
				type: Array,
				default:function(){
					return [];
				}
			},
			list: {
				type: Array,
				default:function(){
					return [];
				}
			},
		}
	}
</script>

<style lang="scss">
	.table{
		margin-top: 20rpx;
		.theader, .tbody .tbody-item{
			background-color: #1b2b42;
			color: #90939d;
			text-align: center;
			view{
				flex: 1;
				position: relative;
				height: 80rpx;
				line-height: 80rpx;
			}
			view::before{
				content: "";
				position: absolute;
				right: 0;
				height: 100%;
				border-right: 1rpx solid #ffffff;
			}
		}
		.tbody .tbody-item{
			background-color: #ffffff;
			position: relative;
			view::before{
				content: "";
				position: absolute;
				right: 0;
				top: 0;
				bottom: 0;
				left: 0;
				height: 100%;
				border: 1rpx solid #eeeeee;
				border-right: 0;
			}
		}
		.tbody .tbody-item::before{
			content: "";
			position: absolute;
			right: 2rpx;
			height: 100%;
			border-right: 1rpx solid #eeeeee;
		}
		.empty{
			margin-top: 40rpx;
			text-align: center;
			color: #acacac;
		}
	}
</style>