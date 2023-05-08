<template>
	<view class="container">
		<view class="table">
			<view class="theader viewFlex">
				<view class="" v-for="(item, index) in column">
					{{item}}
				</view>
			</view>
			<view class="tbody">
				<block v-if="list.length > 0">
					<view class="tbody-item viewFlex" v-for="(item, index) in list">
						<view class="">
							{{item.title}}
						</view>
						<view class="">
							{{item.Tstatus}}
						</view>
						<view class="">
							{{item.date}}
						</view>
						<view class="" @click="download(item)">
							<a href="javascript:;">下载合同</a>
						</view>
					</view>
				</block>
				<view class="empty" v-else>
					暂无更多数据
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		investlog,
	} from "@/api/finance.js"
	export default {
		data() {
			return {
				list: [],
				page: 1,
				data: {},
				column: [
					"投资产品",
					"投资状态",
					"投资时间",
					"协议",
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
		methods: {
			getList() {
				let that = this

				investlog({
					page: this.page
				}).then(res => {
					if (res.status == 0) {
						const {
							data
						} = res.data;
						if (data.length > 0) {
							that.list = that.list.concat(data)
						} else {
							that.page = that.page - 1
						}
						that.data = res.show
					}
				})
			},
			download(item) {
				uni.navigateTo({
					url: "investAgreement?id=" + item.id
				})
				// uni.downloadFile({
				// 	url: item.url, //下载地址，后端接口获取的链接
				// 	success: (data) => {
				// 		console.log(data.tempFilePath)
				// 		console.log(JSON.stringify(data))
				// 		if (data.statusCode === 200) {
				// 			uni.saveFile({ //文件保存到本地
				// 				tempFilePath: data.tempFilePath, //临时路径
				// 				success: function(res) {
				// 					console.log("下载成功" + res.savedFilePath)
				// 					console.log(JSON.stringify(res))
				// 					that.$utils.handleShowToast({
				// 						msg:"文件已保存",
				// 						status: 0
				// 					}) 
				// 					uni.openDocument({
				// 						fileType: 'docx',
				// 						filePath: res.savedFilePath,
				// 						success: function(res) {
				// 							console.log('打开文档成功');
				// 						}
				// 					});
				// 				}
				// 			});
				// 		}
				// 	},
				// 	fail: (err) => {
				// 		console.log(err);
				// 		uni.showToast({
				// 			icon: 'none',
				// 			mask: true,
				// 			title: '失败请重新下载',
				// 		});
				// 	},
				// });
			},
		}
	}
</script>

<style lang="scss">
	.container {
		width: 95%;
		margin: 0 auto;

	}
</style>