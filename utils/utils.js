import env from './env';
import * as userApi from "@/api/user.js"
export function handleFile(data, field) {
	if(data instanceof Array){
		data.forEach(item=>{
			item[field] = env.fileUrl + item[field];
		})
	}else{
		data[field] = env.fileUrl + data[field];
	}
	
	return data;
}

export function handleProduct(data, text) {
	data = handleFile(data, "pic")
	data["hkfs"] = text[data["hkfs"]]
	return data;
}

export function handleShowToast(data) {
	uni.showToast({
		title: data.msg,
		icon: data.status == 1?'error': "success",
	})
}

export function handleCurrentYMD(data) {
	let date =  new Date()
		, year = date.getFullYear()
		, month = date.getMonth() + 1
		, day = date.getDate()
		, hours = date.getHours()
		, minutes = date.getMinutes()
		, seconds = date.getSeconds();

	return year + "-" + month + "-" + day + "-" + hours + "-" + minutes + "-" + seconds
}

export function handleNavigateTo(url) {
	setTimeout(function(){
		uni.navigateTo({
			url:url
		})
	}, 1000)
}

export function handleUserInfo(url) {
	return userApi.info()
}

export function handleVerifyPath(obj) {
	let infoHistory = uni.getStorageSync('userInfo') || {}
		, verify = true
		, url = obj.url
		, redirect = "/pages/member/realnameAuth"
	if(obj.isrealname){
		if(infoHistory.isrealname == 0){
			verify = false
		}
	}
	if(obj.isbank){
		if(infoHistory.isbank == 0){
			verify = false
		}
		redirect = "/pages/member/bankcardAuth"
	}
	if(!verify){
		url = redirect
	}
	uni.navigateTo({
		url: url
	})
}

export function handleClickCount(name) {
	let clickCount = Number(uni.getStorageSync(name))
	if (clickCount >= 3) {
		handleShowToast({
			msg:"您的操作频繁,请稍后再试",
			status: 1
		}) 
		throw "您的操作频繁,请稍后再试"
	}
}

export function handleSaveClickCount(name) {
	let clickCount = Number(uni.getStorageSync(name))
	uni.setStorageSync(name, clickCount + 1)
}