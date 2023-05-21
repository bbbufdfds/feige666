<template>
	<view class="container">
		<view class="qrcodeBlock">
			<image src="@/static/image/inviteBg.jpg" mode="widthFix"></image>
			<view class="qrcode">
				<view class="code">
					邀请码: {{user.info.Invitation_code}}
				</view>
				<view class="">
					<image :src="qrcodeUrl" mode="widthFix"></image>
				</view>
			</view>
		</view>

		<view class="">
			<Itable :column="column" :list="list" />
			<view class="pagination">
				<uni-pagination @change="pagination" :total="total" :pageSize="limit"></uni-pagination>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	import env from "@/utils/env.js"
	import {
		invitelist
	} from "@/api/user.js"
	export default {
		data() {
			return {
				qrcodeUrl: env.baseUrl + "qrcode",
				list: [],
				page: 1,
				column: [{
						title: "手机号",
						prop: "username",
					},
					{
						title: "层级",
						prop: "cenji"
					},
					{
						title: "注册时间",
						prop: "date",
					}
				],
				total: 0,
				limit: 10,
			};
		},
		computed: {
			...mapState([
				'user'
			]),
		},
		onLoad() {
			this.getList()
		},
		methods: {
			getList() {
				let that = this
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
				invitelist({
					page: this.page
				}).then(res => {
					if (res.status == 0) {
						const {
							data
						} = res.data;
						that.list = data
						that.total = res.data.total
						that.limit = res.data.per_page
					}
				})
			},
			pagination(e) {
				this.page = e.current
				this.getList()
			}
		},
	};
</script>

<style lang="scss">
	.container {
		height: 100%;

		image {
			width: 100vw;
		}

		.qrcodeBlock {
			position: relative;

			.qrcode {
				position: absolute;
				top: 55%;
				z-index: 99;

				view {
					text-align: center;
					width: 100vw;
				}

				.code {
					font-size: 32rpx;
					font-weight: bold;
				}

				image {
					width: 37vh;
					height: 37vh;
				}
			}
		}

		.table {
			margin-top: 0;
			padding-bottom: 20rpx;
		}
	}

	.pagination {
		width: 90%;
		margin: 0 auto;
	}
</style>