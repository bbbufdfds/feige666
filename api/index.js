import request from './../utils/request';

export function banner() {
	return request({
		url: 'banner',
		method: 'POST',
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

