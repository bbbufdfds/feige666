<template>
	<view class="table">
		<view class="theader viewFlex">
			<view class="" v-for="(item, index) in columns">
				{{item.title}}
			</view>
		</view>
		<view class="tbody">
			<block v-if="list.length > 0">
				<view class="tbody-item viewFlex" v-for="(item, index) in list" >
					<view class="" v-for="(cItem, cIndex) in columns">
						<text v-html="cItem.format(item)?cItem.format(item):item[cItem.prop]"></text>
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
		},
		data(){
			return{
				columns: []
			}
		},
		watch:{
			column:{
				handler(newVal, oldVal) {
					newVal.forEach(function(item){
						if(!item.format){
							item.format = function(){}
						}
					})
					this.columns = newVal
				},
				deep: true,
				immediate: true
			}
		}
	}
</script>

<style lang="scss">
	
</style>