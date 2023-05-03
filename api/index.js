import request from './../utils/request';

export function banner() {
	return request({
		url: 'banner',
		method: 'POST',
	})
}

export function homepopups() {
	return request({
		url: 'homepopups',
		method: 'GET',
	})
}

export function menu() {
	return request({
		url: 'menu',
		method: 'POST',
	})
}

export function placard() {
	return request({
		url: 'placard',
		method: 'POST',
	})
}


export function video() {
	return request({
		url: 'video',
		method: 'POST',
	})
}

export function qiandao() {
	return request({
		url: 'my/qiandao',
		method: 'POST',
	})
}
