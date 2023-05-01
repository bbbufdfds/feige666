import env from './env';
export function handleFile(data, field) {
	if(data instanceof Array){
		data.forEach(item=>{
			item[field] = env.fileUrl + item[field];
		})
	}else{
		data[field] = env.fileUrl + data[field];
	}
	
	return data;
}

export function handleProduct(data, text) {
	data = handleFile(data, "pic")
	data["hkfs"] = text[data["hkfs"]]
	return data;
}
