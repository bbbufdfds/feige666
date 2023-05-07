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