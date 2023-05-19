<script>
	export default {
		onLaunch: function(options) {
			// 每分钟重置计数器
			setInterval(() => {
				console.log("重置计数器")
				// 转账
				uni.removeStorageSync("transferCount")
				// 充值
				uni.removeStorageSync("rechargeCount")
				// 提现
				uni.removeStorageSync("withdrawalCount")
				// 余额宝转入
				uni.removeStorageSync("yuebaoIncCount")
				// 余额宝转出
				uni.removeStorageSync("yuebaoDecCount")
			}, 1000 * 60 * 1);
			
			let paths
			if(!this.$store.state.user.hasLogin){
				// 无需验证登录的页面
				paths = [
					"pages/tabBar/index",
					"pages/news/list",
					"pages/news/detail",
					"pages/common/aboutDetail",
					"pages/tabBar/about",
				];
				if(paths.indexOf(options.path) == -1){
					uni.reLaunch({
						url: "/pages/auth/login",
					})
				}
			}else{
				paths = [
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
	@import url("/components/u-parse/u-parse.css");
	/*每个页面公共css */
	.viewFlex{
		display: flex;
	}
	.flag{
		color: #fe8113;
	}
	
	// 顶部
	.nav{
		height: var(--status-bar-height);// --status-bar-height系统状态栏高度
	}
	
	/deep/ .wxParse{
		margin: 10px auto;
		width: 95vw;
		border-radius: 10px;
	}
	/deep/ .first{
		text-align: center;
		padding-bottom: 5px;
		border-bottom: 1px solid #E0E0E0;
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
				overflow: hidden;
				padding: 5rpx;
				font-size: 25rpx;
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
			border-bottom: 1rpx solid #eeeeee;
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
	button::after {
	  border: none;
	}
	button {
	  border-radius:0;
	}
	uni-toast .uni-toast {
	    font-size: 14px !important;
	}
</style>
