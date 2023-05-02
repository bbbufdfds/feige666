import request from './../utils/request';

export function message() {
	return request({
		url: 'flowlog',
		method: 'POST',
	})
}
