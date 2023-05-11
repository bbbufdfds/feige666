import request from './../utils/request';

export function message(data) {
	return request({
		url: 'my/msglist',
		method: 'POST',
		data
	})
}

export function msgStatus(data) {
	return request({
		url: 'my/msgread',
		method: 'POST',
		data
	})
}

export function msgDel(data) {
	return request({
		url: 'my/msgdel',
		method: 'POST',
		data
	})
}

export function kefu() {
	return request({
		url: 'my/kefu',
		method: 'POST',
	})
}

export function aboutList() {
	return request({
		url: 'about',
		method: 'POST',
	})
}

export function aboutDetail(data) {
	return request({
		url: 'aboutdetail',
		method: 'POST',
		data
	})
}
export function prizeList(data) {
	return request({
		url: 'my/wheellist',
		method: 'POST',
		data
	})
}