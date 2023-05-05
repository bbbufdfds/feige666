import request from './../utils/request';

export function list(data) {
	return request({
		url: 'products',
		method: 'POST',
		data
	})
}

export function detail(data) {
	return request({
		url: 'my/productbuy',
		method: 'POST',
		data
	})
}

export function pay(data) {
	return request({
		url: 'my/nowtomoney',
		method: 'POST',
		data
	})
}



export function classify() {
	return request({
		url: 'classify',
		method: 'POST',
	})
}