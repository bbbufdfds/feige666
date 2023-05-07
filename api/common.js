import request from './../utils/request';

export function message() {
	return request({
		url: 'my/msglist',
		method: 'POST',
	})
}

export function msgStatus() {
	return request({
		url: 'my/msgStatus',
		method: 'POST',
	})
}

export function msgDel() {
	return request({
		url: 'my/msgStatus',
		method: 'POST',
	})
}