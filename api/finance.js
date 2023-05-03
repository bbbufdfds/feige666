import request from './../utils/request';

export function flowlog(data) {
	return request({
		url: 'flowlog',
		method: 'POST',
		data
	})
}

export function incomelog(data) {
	return request({
		url: 'my/shouyi',
		method: 'POST',
		data
	})
}

export function investlog(data) {
	return request({
		url: 'investlog',
		method: 'POST',
		data
	})
}

export function rechargelog(data) {
	return request({
		url: 'my/recharges',
		method: 'POST',
		data
	})
}

export function withdrawallog(data) {
	return request({
		url: 'my/withdraws',
		method: 'POST',
		data
	})
}

export function bankcardbinding(data) {
	return request({
		url: 'my/bankcardbinding',
		method: 'POST',
		data
	})
}

export function withdraw(data) {
	return request({
		url: 'my/withdraw',
		method: 'POST',
		data
	})
}