<template>
	<swiper class="image-container" previous-margin="45rpx" next-margin="45rpx" circular autoplay
		@change="swiperChange">
		<swiper-item :class="currentIndex == index ? 'swiper-item' : 'swiper-item-side'"
			v-for="(item, index) in imgList" :key="item[index]">
			<image @click="clickImg(item)" :class="currentIndex == index ? 'item-img' : 'item-img-side'"
				:src="item[urlKey]" lazy-load :style="dontFirstAnimation ? 'animation: none;' : ''" mode="aspectFill">
			</image>
		</swiper-item>
	</swiper>
</template>
<script>
	export default {
		props: {
			imgList: {
				type: Array,
				default () {
					return []
				}
			},
			urlKey: {
				type: String,
				default () {
					return ''
				}
			},
		},
		data() {
			return {
				currentIndex: 0,
				dontFirstAnimation: true
			}
		},
		methods: {
			swiperChange(e) {
				this.dontFirstAnimation = false
				this.currentIndex = e.detail.current
			},
			clickImg(item) {
				this.$emit('selected', item, this.currentIndex)
			}
		}
	}
</script>
<style scoped>
	.image-container {
		width: 100%;
		height: 100%;
		/* border: 1px solid red; */
	}

	.item-img {
		width: 100%;
		height: 100%;
		border-radius: 14rpx;
		animation: to-big .3s;
	}

	.swiper-item {
		width: 630rpx;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.item-img-side {
		width: 630rpx;
		height: 80%;
		border-radius: 14rpx;
		animation: to-mini .3s;
	}

	.swiper-item-side {
		width: 630rpx;
		height: 80%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	@keyframes to-mini {
		from {
			height: 100%;
		}

		to {
			height: 80%;
		}
	}

	@keyframes to-big {
		from {
			height: 80%;
		}

		to {
			height: 100%;
		}
	}
</style>
