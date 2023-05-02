import request from './../utils/request';

export function jifen(data) {
	return request({
		url: 'jifen',
		method: 'POST',
		data
	})
}

export function exchangelog() {
	return request({
		url: 'exchangelog',
		method: 'POST',
	})
}
