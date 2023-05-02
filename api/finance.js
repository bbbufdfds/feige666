import request from './../utils/request';

export function flowlog() {
	return request({
		url: 'flowlog',
		method: 'POST',
	})
}

export function incomelog() {
	return request({
		url: 'incomelog',
		method: 'POST',
	})
}

export function investlog() {
	return request({
		url: 'investlog',
		method: 'POST',
	})
}

export function rechargelog() {
	return request({
		url: 'rechargelog',
		method: 'POST',
	})
}

export function withdrawallog() {
	return request({
		url: 'withdrawallog',
		method: 'POST',
	})
}