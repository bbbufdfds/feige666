<template>
	<view class="container">
		<image src="@/static/image/inviteBg.png" mode="widthFix"></image>
		<view class="qrcode" >
			<view class="">
				<image :src="qrcodeUrl" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import env from "@/utils/env.js"
	export default {
		data() {
			return {
				qrcodeUrl: env.baseUrl + "qrcode"
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
			top: 57%;
			z-index: 99;
			view{
				text-align: center;
				width: 100vw;
			}
			image{
				width: 40vh;
				height: 40vh;
			}
		}
	}
	
</style>