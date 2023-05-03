<template>
	<view>
		<view class="nav"></view>
		<view class="container">
			<view class="welcome">
				<view class="welcome_c">
					<image mode="heightFix" src="../../static/img/icon/icon-1.png"></image>
				</view>
				<view class="welcome_c" style="margin-left:20rpx;">
					欢迎来到邵氏兄弟
				</view>
			</view>
			<view class="banner" v-if="imgList">
				<carousel :img-list="imgList" url-key="thumb_url" @selected="selectedBanner" />
			</view>
			<view class="notice" v-if="notices">
				<view class="notice-item notice_icon">
					<image mode="heightFix" src="../../static/img/icon/icon-2.png"></image>
				</view>
				<view class="notice-item notice_text swiper">
					<view>
						<mosowe-swiper :lists="notices" :touchable="true" vertical swiperType="text" textKey="title"
							:height="80" />
					</view>
				</view>
			</view>
			<!-- 金刚区 start -->
			<view class="button-list" v-if="buttonList">
				<view class="button-list-item" v-for="(item, index) in buttonList" :key="index" @click="buttonClick(item)">
					<view class="button-list-item_icon">
						<image :src="item.thumb_url" mode="widthFix"></image>
					</view>
					<view class="button-list-item_text">
						{{item.name}}
					</view>
				</view>
			</view>
			<view class="video" v-if="videoObj.open == 1">
				<video  :src="videoObj.videourl"></video>
			</view>
		
			<goods-category @changeClassify="changeClassify"></goods-category>
			
			<goods-list ref="goodsRef"></goods-list>
			
			<uni-popup ref="popup">
				<image :src="popupData.thumb_url" mode="widthFix"></image>
				<view class="popup-close" @click="$refs.popup.close()">
					✖
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import carousel from '@/components/vear-carousel/vear-carousel'
	import goodsCategory from '@/components/goods/category.vue'
	import goodsList from '@/components/goods/list.vue'
	import * as Api from "@/api/index.js"

	export default {
		components: {
			carousel,
			goodsList,
			goodsCategory
		},

		data() {
			return {
				buttonList: [],
				imgList: [],
				notices: [],
				videoObj: "",
				popupData:{}
			}
		},
		onLoad() {
			let that = this
			this.banner()
			this.menu()
			this.video()
			
			this.placard()
			
			that.$nextTick(function(){
				Api.homepopups().then(res=>{
					if(res.data.open == "开启"){
						that.popupData = that.$utils.handleFile(res.data.data, "thumb_url")
						that.$refs.popup.open()
					}
				})
			})
			
		},
		methods: {
			banner(){
				let that = this
				Api.banner().then(res=>{
					if(res.status == 0)
						that.imgList = that.$utils.handleFile(res.data, "thumb_url")
				})
			},
			placard(){
				let that = this
				Api.placard().then(res=>{
					if(res.status == 0)
						that.notices = res.data
				})
			},
			menu(){
				let that = this
				Api.menu().then(res=>{
					if(res.status == 0)
						that.buttonList = that.$utils.handleFile(res.data, "thumb_url")
				})
			},
			
			video(){
				let that = this
				Api.video().then(res=>{
					if(res.status == 0){
						that.videoObj = that.$utils.handleFile(res.data, "videourl")
					}
				})
			},
			changeClassify(item){
				this.$refs.goodsRef.product(item.id)
			},
			
			selectedBanner(item, index) {
				console.log('🥒', item, index)
			},
			buttonClick(item){
				if(item.name == "每日签到"){
					Api.qiandao().then(res=>{
						uni.showToast({
						    title: res.msg,
						    icon: 'none',
						    duration: 2000
						})
					})
				}
			}
		}
	}
</script>

<style>
	.container {
		width: 95%;
		margin: 0 auto;
	}
	.nav{
		background-color: #ffffff;
	}
	.swiper {
		height: 80rpx;
		font-size: 28rpx;
		line-height: 80rpx;
		/* padding: 0 30rpx; */
		box-sizing: border-box;
		/* background-color: #fe8252; */
		color: #000;
		width: 100%;
	}


	.welcome {
		height: 88rpx;
		width: 696rpx;
		margin: 0 auto;
	}

	.welcome_c {
		float: left;
		height: 100%;
		line-height: 88rpx;
		font-size: 32rpx;
		font-weight: bold;
	}

	.welcome_c image {
		height: 100%;
	}


	.banner {
		margin: 26rpx auto;
		height: 396rpx;
		width: 100%;
	}

	.notice {
		width: 696rpx;
		margin: 38rpx auto 0;
		height: 60rpx;
	}

	.notice-item {
		float: left;
		height: 100%;
		line-height: 60rpx;
		font-size: 32rpx;
		font-weight: bold;
	}


	.notice_icon image {
		height: 100%;
	}

	.notice_text {
		width: 60%;
		margin-left: 20rpx;
	}



	.button-list {
		height: 350rpx;
		margin: 16rpx auto 0;
		/* width: 696rpx; */
		display: -webkit-flex;
		flex-flow: row wrap;
	}

	.button-list-item {
		height: 50%;
		width: 20%;
	}

	.button-list-item_text {
		text-align: center;
		font-size: 28rpx;
	}

	.button-list-item_icon {
		width: 70%;
		margin: 0 auto;
	}

	.button-list-item_icon image {
		width: 100%;
	}


	.video,.video video {
		height: 30vh;
		margin: 20rpx auto;
		width: 100%;
	}

	.popup-close{
		position: absolute;
		top: 10rpx;
		right: 10rpx;
		border-radius: 50%;
		width: 50rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		background-color: #fe8113;
		color: #ffffff;
		font-size: 20rpx;
	}

</style>