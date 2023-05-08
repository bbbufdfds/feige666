import request from './../utils/request';

export function login(data) {
	return request({
		url: 'login',
		method: 'POST',
		data
	})
}

export function logout() {
	return request({
		url: 'my/logout',
		method: 'POST'
	})
}

export function register(data) {
	return request({
		url: 'register',
		method: 'POST',
		data
	})
}

export function captcha() {
	return request({
		url: 'captcha',
		method: 'GET',
	})
}

export function yuebao(data) {
	return request({
		url: 'my/yuamount',
		method: 'POST',
		data
	})
}
export function yeboperation(data) {
	return request({
		url: 'my/yeboperation',
		method: 'POST',
		data
	})
}
export function addbank(data) {
	return request({
		url: 'my/addbank',
		method: 'POST',
		data
	})
}

export function info(data) {
	return request({
		url: 'my/user',
		method: 'POST',
		data
	})
}

export function coupon(data) {
	return request({
		url: 'my/coupon',
		method: 'POST',
		data
	})
}

export function shiming(data) {
	return request({
		url: 'my/shiming',
		method: 'POST',
		data
	})
}

export function mymsg(data) {
	return request({
		url: 'my/mymsg',
		method: 'POST',
	})
}

export function changePassword(data) {
	let url = "my/changePassword"
	if(data.passwordType == 2){
		url = "my/jyPassword"
	}
	return request({
		url: url,
		method: 'POST',
		data
	})
}

export function bankcardDetail(data) {
	return request({
		url: 'my/bankcarddetail',
		method: 'POST',
		data
	})
}