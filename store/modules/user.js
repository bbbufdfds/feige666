import { login, logout } from '../../api/user';
import { setToken , getToken, removeToken} from '../../utils/auth';
let infoHistory = uni.getStorageSync('userInfo') || {};

const state = {
	hasLogin: Boolean(Object.keys(infoHistory).length),
	info: infoHistory
},
getters = {
	info(state) {
		return state.info;
	},
	hasLogin(state){
		return state.hasLogin;
	}
},
mutations = {
	setUserInfo(state, info) {
		let data = Object.assign(infoHistory, info)
		uni.setStorageSync('userInfo', data)
		state.info = data;
	}, 
	login(state, data) { 
		let reg = /^(\d{3})\d{4}(\d{4})$/
			, phone = data.phone.replace(reg, "$1****$2");
		let info = {
			phone: phone,
			isrealname: data.isrealname,
			isbank: data.isbank,
		}
		state.hasLogin = true;
		state.info = info;
		setToken(data.token)
		uni.setStorageSync('userInfo',info)
		uni.reLaunch({
			url: "/pages/tabBar/index",
		})
	},
	logout(state) {
		logout().then(response => {
			state.info = {};
			state.hasLogin = false;
			removeToken();
			uni.removeStorageSync('userInfo')
			uni.reLaunch({
				url: "/pages/tabBar/index",
			})
		}).catch(error => {
		    console.log(error)
		})
		
	}
}
, actions = {
	login({ commit }, param) {
	    login(param).then(response => {
	    	if(response.status == 0){
	    		const { data } = response
	    			
	    		commit("login",data)
	    	}else{
				uni.showToast({
					title: response.msg,
					icon: 'error',
				}) 
			}
	    }).catch(error => {
	        console.log(error)
	    })
	}
};

export default {
    namespaced: true,
	state,
	getters,
	mutations,
    actions
}
