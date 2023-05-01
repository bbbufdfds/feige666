import request from './../utils/request';

export function list(data) {
	return request({
		url: 'products',
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