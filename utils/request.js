import {getToken, removeToken} from '../utils/auth';
import env from '../utils/env';

function service(options = {}) {
	options.url = `${env.baseUrl}${options.url}`;
	// 判断本地是否存在token，如果存在则带上请求头
	let header = options.header
	if (getToken()) {
		options.header = {
			'content-type': 'application/json',
			'Authtoken': `${getToken()}`	// 这里是token(可自行修改)
		};
	}
	if(header){
		Object.assign(options.header, header)
	}

	return new Promise((resolved, rejected) => {
		options.success = (res) => {
			
			uni.hideLoading()
			if (res.data.status !== 0) {
				
				if (res.data.status === 401) {
					removeToken()
					uni.removeStorageSync('userInfo')
					uni.reLaunch({
						url: '/pages/auth/login'
					})
					return
				}
			} 
			resolved(res.data)
		};
		options.fail = (err) => {
			uni.hideLoading()
			uni.showToast({
				icon: 'none',
				duration: 3000,
				title: '服务器错误,请稍后再试'
			});
			rejected(err);
		};
		uni.request(options);
	});
}

export default service;
