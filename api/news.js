import request from './../utils/request';

export function list() {
	return request({
		url: 'newslist',
		method: 'POST',
	})
}

export function detail(data) {
	return request({
		url: 'newdetail',
		method: 'POST',
		data
	})
}