<script>
	export default {
		onLaunch: function(options) {
			if(!this.$store.state.user.hasLogin){
				uni.reLaunch({
					url: "/pages/auth/login",
				})
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

<style>
	@import url("static/iconfont/iconfont.css");
	/*每个页面公共css */
	.viewFlex{
		display: flex;
	}
	.flag{
		color: #fe8113;
	}
</style>
