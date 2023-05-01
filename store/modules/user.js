import { login } from '../../api/user';
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
	login(state, info) { 
		login(info).then(response => {
			if(response.status == 0){
				const { data } = response
					, info = {phone: data.phone};
				state.hasLogin = true;
				state.info = info;
				setToken(data.token)
				uni.setStorageSync('userInfo',info)
				uni.reLaunch({
					url: "/pages/tabBar/index",
				})
				return
			}
			uni.showToast({
				title: response.msg,
				icon: 'error',
			}) 
			
		}).catch(error => {
		    console.log(error)
		})
	},
	logout(state) {
		state.info = {};
		state.hasLogin = false;
		removeToken();
	}
}
, actions = {
	login({ commit }, param) {
	    
	}
};

export default {
    namespaced: true,
	state,
	getters,
	mutations,
    actions
}
