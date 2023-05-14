<template>
	<view class="container">
		<image src="@/static/image/inviteBg.png" mode="widthFix"></image>
		<view class="qrcode" >
			<view class="code">
				邀请码:
			</view>
			<view class="">
				<image :src="qrcodeUrl" mode="widthFix"></image>
			</view>
		</view>
		<Itable :column="column" :list="list" />
	</view>
</template>

<script>
	import env from "@/utils/env.js"
	export default {
		data() {
			return {
				qrcodeUrl: env.baseUrl + "qrcode",
				list: [],
				page: 1,
				column:[
					{
						title: "说明",
						prop: "moneylog_notice",
					},
					{
						title: "金额",
						prop: "moneylog_money"
					},
					{
						title: "时间",
						prop: "date",
					}
				]
			};
		},
		onLoad() {
		},
		methods: {},
	};
</script>

<style lang="scss">
	.container{
		position: relative;
		height: 100%;
		image{
			width: 100vw;
		}
		.qrcode{
			position: absolute;
			top: 55%;
			z-index: 99;
			view{
				text-align: center;
				width: 100vw;
			}
			.code{
				font-size: 32rpx;
				font-weight: bold;
			}
			image{
				width: 37vh;
				height: 37vh;
			}
		}
		.table{
			margin-top: 0;
			padding-bottom: 20rpx;
		}
	}
	
</style>