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
	
</style>