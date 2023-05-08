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