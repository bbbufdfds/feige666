<script>
	export default {
		onLaunch: function(options) {
			if(!this.$store.state.user.hasLogin){
				
				if("pages/tabBar/index".indexOf(options.path) == -1){
					uni.reLaunch({
						url: "/pages/auth/login",
					})
				}
			}else{
				let paths = [
					"pages/auth/login",
					"pages/auth/register",
				];
				if(paths.indexOf(options.path) > -1){
					uni.reLaunch({
						url: "/pages/tabBar/index",
					})
				}
			}
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import url("static/iconfont/iconfont.css");
	/*每个页面公共css */
	.viewFlex{
		display: flex;
	}
	.flag{
		color: #fe8113;
	}
	
	// 顶部
	.nav{
		background-color: #000000;
		height: var(--status-bar-height);// --status-bar-height系统状态栏高度
	}
	
	
	.table{
		margin-top: 20rpx;
		.theader, .tbody .tbody-item{
			background-color: #1b2b42;
			color: #90939d;
			text-align: center;
			view{
				flex: 1;
				position: relative;
				height: 80rpx;
				line-height: 80rpx;
			}
			view::before{
				content: "";
				position: absolute;
				right: 0;
				height: 100%;
				border-right: 1rpx solid #ffffff;
			}
		}
		.tbody .tbody-item{
			background-color: #ffffff;
			position: relative;
			view::before{
				content: "";
				position: absolute;
				right: 0;
				top: 0;
				bottom: 0;
				left: 0;
				height: 100%;
				border: 1rpx solid #eeeeee;
				border-right: 0;
			}
		}
		.tbody .tbody-item::before{
			content: "";
			position: absolute;
			right: 2rpx;
			height: 100%;
			border-right: 1rpx solid #eeeeee;
		}
		.empty{
			margin-top: 40rpx;
			text-align: center;
			color: #acacac;
		}
	}
</style>
