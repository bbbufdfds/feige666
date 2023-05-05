import request from './../utils/request';

export function message() {
	return request({
		url: 'my/msglist',
		method: 'POST',
	})
}
