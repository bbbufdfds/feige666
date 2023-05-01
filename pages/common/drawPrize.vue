<template>
	<view class="almost-lottery">
		<!-- lottery -->
		<view class="almost-lottery__wheel">
			<almost-lottery :lottery-size="lotteryConfig.lotterySize" :action-size="lotteryConfig.actionSize"
				:ring-count="2" :duration="1" :img-circled="true" :canvasCached="true" :prize-list="prizeList"
				:prize-index="prizeIndex" @reset-index="prizeIndex = -1" @draw-start="handleDrawStart"
				@draw-end="handleDrawEnd" @finish="handleDrawFinish" :lotteryBg="lotteryBg" :actionBg="actionBg"
				v-if="prizeList.length" />
			<view class="almost-lottery__count">
				<text class="text">剩余免费抽奖 {{ freeNum }} 次</text>
			</view>
		</view>
	</view>
</template>

<script>
	import AlmostLottery from '@/components/almost-lottery/components/almost-lottery/almost-lottery.vue'
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
				onStock: true,
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

				// 以下为业务需求有关示例数据
				// 金币余额
				goldCoin: 600,
				// 当日免费抽奖次数余额
				freeNum: 3,
				// 每次消耗的金币数
				goldNum: 20,
				// 每天免费抽奖次数
				freeNumDay: 3
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
			async getPrizeList() {
				uni.showLoading({
					title: '奖品准备中...'
				})

				// 等待接口返回的数据进一步处理
				let res = await this.requestApiGetPrizeList()
				console.log('获取奖品列表', res)

				if (res.ok) {
					let data = res.data
					if (data.length) {
						this.prizeList = data
						console.log('已获取到奖品列表数据，开始绘制抽奖转盘')

						// 计算开始绘制的时间
						if (console.time) {
							console.time('绘制转盘用时')
						}

						
					}
				} else {
					uni.hideLoading()
					uni.showToast({
						title: '获取奖品失败',
						mask: true,
						icon: 'none'
					})
				}
			},
			// 模拟请求 获取奖品列表 接口，
			// 注意这里返回的是一个 Promise
			// 大哥，这里只是模拟，别告诉我你不会对接自己的接口
			requestApiGetPrizeList() {
				return new Promise((resolve, reject) => {
					let requestTimer = setTimeout(() => {
						clearTimeout(requestTimer)
						requestTimer = null

						// prizeStock 奖品库存
						// prizeWeight 中奖概率，数值越大中奖概率越高，权重一样时随机中奖
						resolve({
							ok: true,
							data: [{
									prizeId: 1,
									prizeName: '0.1元现金',
									prizeStock: 10,
									prizeWeight: 200,
									prizeImage: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/56f085e0-bcfe-11ea-b244-a9f5e5565f30.png'
								},
								{
									prizeId: 2,
									prizeName: '10元现金',
									prizeStock: 0,
									prizeWeight: 50,
									prizeImage: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/56f085e0-bcfe-11ea-b244-a9f5e5565f30.png'
								},
								{
									prizeId: 3,
									prizeName: '5元话费',
									prizeStock: 1,
									prizeWeight: 80
								},
								{
									prizeId: 4,
									prizeName: '50元现金',
									prizeStock: 0,
									prizeWeight: 10,
									prizeImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAB2klEQVRIia3Wv09TURjG8U+u2kQZcNENh2ok0cnJ0R+L0RB2g/EvwITEwRgnV0Zx0fAHYBh0khBD4sBAmAgDiwQNg4qwmSBDAYf7Fi+n97al9UlObnvO836f3tO355b2GsAYZrCBPRzGdSPmx8J3YtXwDDsB7TR2wl/rNmAYK13C07ES9W11E9s9BjTHdnBKVf8PAcWgehpwCssF0w/5FzqLgw7AA7zDQ/wqzC8H90jjSeFMYW0Yr8PzALfjOh7z1wve2YTzpLlQw2ay+KZ1N7vS24SziVqGexhKzB07pEJXk/dDwTetdZ9HewwZLWFNw2oyudZjQFNrCW8109pqS32GpPX1TOu586fPkLR+IEMjmbzYZ0ha34Atx/fwW58hXxPeFixo7Yg7PQbcKmEtZFgsMb/C4AkDBuUnQKpFuFZI3cZuvP6C+8g6wDP572O95C4Og49/W/YJl/G5YPqO9yV3dh4f8LMCfhjcI93Afix8xAX5SVx2YBY10yagEdxjmiwY7uISXuIFrlSEPG0TMllWcAbzYViXd0rzeXC6ImSiImA+eKU6h7mCeV/eCBMnCJkLzpHSztnFCJ7L//ZkOFv1iRLtRd1IcLpSHVP4jccVnkexPqXkmd7UX15b7tiz29ReAAAAAElFTkSuQmCC'
								},
								{
									prizeId: 5,
									prizeName: '1卷抽纸',
									prizeStock: 3,
									prizeWeight: 3000,
									prizeImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABCElEQVRoge3YMa4BURSH8Y8o7UAp0WgkotBZwluAfhqlZSgUGr23ENUUCpppJnTswAIUSCaTiziZJ8d9/193zdzrfMltABF5plb+oLscDoAV0Pn8OC/lwDhL0k35QT3wstcIuM61Cj0IhXiNuAvOFwr5SgrxRiHeKMSbhnHfAVgU1i1gajhnBpwK6wnQtgxkDTlmSTq/L7rLYQ9byG+WpLvCOT8YQ6K5WgrxRiHeKMQbhXijEG8U4o1CvIkmxPrDquwMrI37KlFJSJake2BUxVlW0VytaEKsV6t5+8Ohak3rRmtIH9hav/QvRHO1FOKNQrwJheQfn+I9wflCIeNHLzuQc51PRP6rC1ZeIm1I8cC5AAAAAElFTkSuQmCC'
								},
								{
									prizeId: 6,
									prizeName: '0.2元现金',
									prizeStock: 8,
									prizeWeight: 120
								},
								{
									prizeId: 7,
									prizeName: '谢谢参与',
									prizeStock: 100,
									prizeWeight: 10000
								},
								{
									prizeId: 8,
									prizeName: '100金币',
									prizeStock: 100,
									prizeWeight: 3000
								}
							]
						})
					}, 200)
				})
			},
			// 本次抽奖开始
			handleDrawStart() {
				console.log('触发抽奖按钮')
				if (this.prizeing) return
				this.prizeing = true

				// 还有免费数次或者剩余金币足够抽一次
				if (this.freeNum > 0 || this.goldCoin >= this.goldNum) {

					// 更新免费次数或金币余额
					if (this.freeNum > 0) {
						this.freeNum--
					} else if (this.goldCoin >= this.goldNum) {
						this.goldCoin -= this.goldNum
					}

					this.tryLotteryDraw()
				} else {
					uni.showModal({
						title: '金币不足',
						content: '是否前往赚取金币？',
						success: (res) => {
							// 这里需要根据业务需求处理，一般情况下会引导用户前往赚取金币的页面
							console.log('金币不足', res)
						},
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
				console.warn('###当前处于模拟的请求接口，并返回了中奖信息###')
				// 模拟请求接口获取中奖信息
				let stoTimer = setTimeout(() => {
					stoTimer = null

					let list = [...this.prizeList]

					// 这里随机产生的 prizeId 是模拟后端返回的 prizeId
					let prizeId = Math.floor(Math.random() * list.length + 1)

					// 拿到后端返回的 prizeId 后，开始循环比对得出那个中奖的数据
					for (let i = 0; i < list.length; i++) {
						let item = list[i]
						if (item.prizeId === prizeId) {
							// 中奖下标
							this.prizeIndex = i
							break
						}
					}

					console.log('本次抽中奖品 =>', this.prizeList[this.prizeIndex].prizeName)

					// 如果奖品设有库存
					if (this.onStock) {
						console.log('本次奖品库存 =>', this.prizeList[this.prizeIndex].prizeStock)
					}
				}, 200)
			},
			// 本次抽奖结束
			handleDrawEnd() {
				console.log('旋转结束，执行拿到结果后到逻辑')

				// 旋转结束后，开始处理拿到结果后的逻辑
				let prizeName = this.prizeList[this.prizeIndex].prizeName
				let tipContent = ''

				if (prizeName === '谢谢参与') {
					tipContent = '很遗憾，没有中奖，请再接再厉！'
				} else {
					// 如果奖品设有库存
					if (this.onStock) {
						let prizeStock = this.prizeList[this.prizeIndex].prizeStock
						tipContent = prizeStock ? `恭喜您，获得 ${prizeName}` : `很抱歉，您来晚了，当前奖品 ${prizeName} 已无库存`
					} else {
						tipContent = `恭喜您，获得 ${prizeName} ！`
					}
				}

				uni.showModal({
					content: tipContent,
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
			}
		},
		onLoad() {
			this.prizeList = []
			this.getPrizeList()
		},
		onUnload() {
			uni.hideLoading()
		}
	}
</script>

<style lang="scss" scoped>
	.almost-lottery {
		flex: 1;
		background-color: #FF893F;
	}


	.almost-lottery__wheel {
		text-align: center;

		.almost-lottery__count {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			text-align: center;
			padding: 40rpx 0;
		}

		.text {
			color: #FFFFFF;
			font-size: 24rpx;
		}
	}
</style>