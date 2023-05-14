<template>
	<view class="container">
		<view class="bgImg">
			<image src="../../static/image/drawPrizeBg.png" mode="widthFix"></image>
			<view class="almost-lottery-turntable">
				<view class="almost-lottery__wheel">
					<almost-lottery :lottery-size="lotteryConfig.lotterySize" :action-size="lotteryConfig.actionSize"
						:ring-count="2" :duration="1" :img-circled="true" :canvasCached="true" :prize-list="prizeList"
						:prize-index="prizeIndex" @reset-index="prizeIndex = -1" @draw-start="handleDrawStart"
						@draw-end="handleDrawEnd" @finish="handleDrawFinish" :lotteryBg="lotteryBg" :actionBg="actionBg"
						v-if="prizeList.length" />
					<view class="almost-lottery__count">
						<text class="text">剩余免费抽奖 <text class="number">{{ freeNum }}</text> 次</text>
					</view>
				</view>
			</view>
			<view class="almost-lottery-main">
				<view class="lottery-list">
					<swiper class="swiper" circular :indicator-dots="false" :autoplay="true" :interval='2000' :vertical="true">
						<swiper-item v-for="(item,i) in config.winlist">
							<view>{{item.moneylog_notice}}</view>
						</swiper-item>
					</swiper>
				</view>
				<view class="rule">
					<view class="rule-title">
						活动规则
					</view>
					<view class="rule-content">
						<view class="" v-for="(item, index) in config.Memberlevel" :key="index">
							{{item.name}}每日可以抽奖{{item.num}}次
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import AlmostLottery from '@/components/almost-lottery/components/almost-lottery/almost-lottery.vue'
	import * as Api from "@/api/common.js"
	export default {
		name: 'Home',
		components: {
			AlmostLottery
		},
		data() {
			return {
				// 以下是转盘配置相关数据
				lotteryConfig: {
					// 抽奖转盘的整体尺寸，单位rpx
					lotterySize: 600,
					// 抽奖按钮的尺寸，单位rpx
					actionSize: 200
				},

				// 以下是转盘 UI 配置
				// 转盘外环图，如有需要，请参考替换为自己的设计稿
				lotteryBg: require('@/static/img/lottery-bg.png'),
				// 抽奖按钮图
				actionBg: require('@/static/img/action-bg.png'),

				// 以下是奖品配置数据
				// 奖品数据
				prizeList: [],
				// 奖品是否设有库存
				onStock: false,
				// 中奖下标
				prizeIndex: -1,

				// 是否正在抽奖中，避免重复触发
				prizeing: false,

				// 以下为中奖概率有关数据
				// 是否由前端控制概率，默认不开启，强烈建议由后端控制
				onFrontend: false,
				// 权重随机数的最大值
				prizeWeightMax: 0,
				// 权重数组
				prizeWeightArr: [],

				// 当日免费抽奖次数余额
				freeNum: 0,
				config: {}
			}
		},
		computed: {
			isApple() {
				return uni.getSystemInfoSync().platform === 'ios'
			}
		},
		
		methods: {
			// 重新生成
			handleInitCanvas() {
				clearCacheFile()
				clearStore()

				this.prizeList = []
				this.getPrizeList()
			},
			// 获取奖品列表
			getPrizeList() {
				uni.showLoading({
					title: '奖品准备中...'
				})

				// 等待接口返回的数据进一步处理
				this.requestApiGetPrizeList()
			},
			// 模拟请求 获取奖品列表 接口，
			// 注意这里返回的是一个 Promise
			// 大哥，这里只是模拟，别告诉我你不会对接自己的接口
			requestApiGetPrizeList() {
				let that = this
				Api.prizeList().then(res=>{
					let list = [];
					if(res.status == 0){
						res.data.forEach(item=>{
							list.push({
								prizeId: item.id,
								prizeImage: that.$utils.handleFile(item, "img").img,
								prizeName: item.name,
								prizeWeight: item.winningrate,
								prizeDesc: item.prize,
							})
						})
						
						that.prizeList = list
						console.log('已获取到奖品列表数据，开始绘制抽奖转盘')
						console.log('获取奖品列表',list)
						// 计算开始绘制的时间
						if (console.time) {
							console.time('绘制转盘用时')
						}
					}
				}).catch(res=>{
					uni.hideLoading()
					that.$utils.handleShowToast({
						status: 1,
						mag: "获取奖品失败",
					}) 
				})
			},
			// 本次抽奖开始
			handleDrawStart() {
				console.log('触发抽奖按钮')
				if (this.prizeing) return
				this.prizeing = true

				// 还有免费数次或者剩余金币足够抽一次
				if (this.freeNum > 0) {

					// 更新免费次数或金币余额
					if (this.freeNum > 0) {
						this.freeNum--
					} 

					this.tryLotteryDraw()
				} else {
					uni.showToast({
						title: '次数已用尽',
						mask: true,
						icon: 'none',
						complete: () => {
							this.prizeing = false
						}
					})
				}
			},
			// 尝试发起抽奖
			tryLotteryDraw() {
				console.log('旋转开始，获取中奖下标......')
				this.remoteGetPrizeIndex()
			},
			// 远程请求接口获取中奖下标
			// 大哥，这里只是模拟，别告诉我你不会对接自己的接口
			remoteGetPrizeIndex() {
				let that = this
				Api.winclick().then(res=>{
					if(res.status == 0){
						let prizeId = res.index
						let list = [...that.prizeList]
						
						for (let i = 0; i < list.length; i++) {
							let item = list[i]
							if (item.prizeId === prizeId) {
								// 中奖下标
								that.prizeIndex = i
								break
							}
						}
						console.log('本次抽中奖品 =>', that.prizeList[that.prizeIndex])
					}else{
						that.$utils.handleShowToast(res) 
						this.prizeing = false
					}
				})
			},
			// 本次抽奖结束
			handleDrawEnd() {
				console.log('旋转结束，执行拿到结果后到逻辑')

				uni.showModal({
					content: this.prizeList[this.prizeIndex].prizeDesc,
					showCancel: false,
					complete: () => {
						this.prizeing = false
					}
				})
			},
			// 抽奖转盘绘制完成
			handleDrawFinish(res) {
				console.log('抽奖转盘绘制完成', res)

				if (res.ok) {
					// 计算结束绘制的时间
					if (console.timeEnd) {
						console.timeEnd('绘制转盘用时')
					}
				}

				let stoTimer = setTimeout(() => {
					stoTimer = null

					uni.hideLoading()
					uni.showToast({
						title: res.msg,
						mask: true,
						icon: 'none'
					})
				}, 50)
			},
			getWinlist(){
				let that = this
				Api.winlist().then(res=>{
					that.config = res.data
					that.freeNum = res.data.mynum
				})
			}
		},
		onLoad() {
			this.prizeList = []
			this.getPrizeList()
			this.getWinlist()
		},
		onUnload() {
			uni.hideLoading()
		}
	}
</script>

<style lang="scss" scoped>
	.bgImg{
		position: relative;
		image{
			width: 100vw;
			height: 100%;
		}
		
		.almost-lottery-turntable {
			position: absolute;
			top: 22%;
			left: 0;
			right: 0;
			.almost-lottery__wheel {
				text-align: center;
			
				.almost-lottery__count {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					text-align: center;
					padding: 40rpx 0;
					.text {
						color: #000000;
						font-size: 30rpx;
						.number{
							color: red;
							font-size: 36rpx;
							font-weight: bold;
							margin: 0 10rpx;
						}
					}
				}
			}
		}
		.almost-lottery-main{
			position: absolute;
			top: 56%;
			width: 100%;
			.lottery-list{
				width: 80%;
				margin: 40rpx auto 50rpx;
				background-color: #cb8653;
				padding: 15rpx 40rpx;
				border-radius: 50rpx;
				color: #ffffff;
				text-align: center;
				.swiper, view{
					height: 55rpx;
					line-height: 55rpx;
				}
			}
			.rule{
				width: 80%;
				margin: 0 auto;
				background-color: #ffffff;
				border-radius: 20rpx;
				overflow: hidden;
				padding: 40rpx;
				.rule-title{
					font-size: 32rpx;
					font-weight: bold;
					text-align: center;
				}
				.rule-content{
					margin-top: 35rpx;
					letter-spacing: 2px;
					word-spacing: 10px;
					view{
						margin-bottom: 15rpx;
					}
				}
			}
		}
	}
	
</style>