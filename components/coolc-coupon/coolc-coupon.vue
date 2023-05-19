<template>
	<view class="coupon-item">
		<view class="coupon-money">
			<view class="layof" :style="{color:theme}">{{item.name}}</view>
			<view class="end_time">{{item.exptime}}前使用</view>
		</view>
		<navigator open-type="switchTab" v-if="item.status==1"  class="get-btn" :style="{color:color, borderColor:color, background:solid}"
			url='/pages/tabBar/project'>立即使用</navigator>
		<view class="get-btn" v-else style="background-color: #eeeeee;border: 1rpx solid #eeeeee;color: #ffffff;">{{item.status==2?"已使用":"已过期"}}</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object
			},
			theme: {
				type: String,
				default: '#ff9000'
			},
			solid: {
				type: String,
				default: '#ffffff'
			},
			color: {
				type: String,
				default: '#ff9000'
			},
		},
		methods: {

		}
	}
</script>

<style lang='scss'>
	.coupon-item {
		width: 100%;
		height: auto;
		display: table;
		border-radius: 10upx;
		padding: 0 20upx;
		margin-top: 22upx;
		border: 1px solid #eeeeee;
		position: relative;

		.coupon-money {
			width: 465upx;
			height: auto;
			display: table;
			float: left;
			padding: 26upx 0;
			border-style: none dotted none none;
			border-color: #eeeeee;

			.nick {
				width: 100%;
				height: 50upx;
				line-height: 30upx;
				font-size: $font-sm;
				color: $font-color-999;
			}

			.tit {
				width: 100%;
				height: 50upx;
				line-height: 50upx;
				font-size: $font-sm;
				color: $font-color-999;
			}

			.demand {
				width: 100%;
				height: 30upx;
				line-height: 30upx;
				font-size: $font-sm;
				color: $font-color-999;
			}

			.layof {
				width: 100%;
				height: 48upx;
				line-height: 30upx;
				font-size: 44upx;
				color: #ff9000;
				font-weight: bold;
			}

			.end_time {
				width: 100%;
				height: 30upx;
				line-height: 30upx;
				font-size: $font-sm;
				color: $font-color-999;
			}
		}

		.get-btn {
			width: 146upx;
			height: 52upx;
			line-height: 50upx;
			position: absolute;
			top: 50%;
			right: 26upx;
			margin-top: -26upx;
			text-align: center;
			border-radius: 60upx;
			color: #ff9000;
			border: 1px solid #ff9000;
			font-size: $font-sm;
			float: right;
		}
	}

	.coupon-item:after {
		width: 40upx;
		height: 20upx;
		position: absolute;
		left: 460upx;
		top: -1px;
		border-radius: 0 0 40upx 40upx;
		content: "";
		display: block;
		background: $bgcolor_white;
		border: 1px solid #eeeeee;
		border-top: 0px;
	}

	.coupon-item:before {
		width: 40upx;
		height: 20upx;
		position: absolute;
		left: 460upx;
		bottom: -1px;
		border-radius: 40upx 40upx 0 0;
		content: "";
		display: block;
		background: $bgcolor_white;
		border: 1px solid #eeeeee;
		border-bottom: 0px;
	}
	view,
	scroll-view,
	swiper,
	swiper-item,
	cover-view,
	cover-image,
	icon,
	text,
	rich-text,
	progress,
	button,
	checkbox,
	form,input,
	label,
	radio,
	slider,
	switch,
	textarea,
	navigator,
	audio,
	camera,
	image,
	video 
	{ box-sizing:border-box; }
</style>