import Base64 from './base64';
/*
在URL前(去除域名)加上p,后加上o
比如：https://ehkrd.danarupiah.id/harbor/userbase/register/verifycode?b=10&c=2&ch=1070200004 
需要加密的字符串变为 pharbor/userbase/register/verifycode?b=10&c=2&ch=1070200004o 

该字符串加密后:
变成：cGhhcmJvci91c2VyYmFzZS9yZWdpc3Rlci92ZXJpZnljb2RlP2I9MTAmYz0yJmNoPTEwNzAyMDAwMDRv

加密再加appid在加密URL的前面：Uang Plus的app_id为wz01m
wz01mcGhhcmJvci91c2VyYmFzZS9yZWdpc3Rlci92ZXJpZnljb2RlP2I9MTAmYz0yJmNoPTEwNzAyMDAwMDRv

最终URL变成：
https://ehkrd.danarupiah.id/wz01mcGhhcmJvci91c2VyYmFzZS9yZWdpc3Rlci92ZXJpZnljb2RlP2I9MTAmYz0yJmNoPTEwNzAyMDAwMDRv
*/

function encryptUrl(url,encryptConfig) {
	//console.log(encryptConfig)
	if(!encryptConfig)return url
	let reg = /^http(s)?:\/\/(.*?)\//
	let m = Base64.encodeUrl(encryptConfig.pre + url.replace(reg, '') + encryptConfig.next)
	url = reg.exec(url)[0] + encryptConfig.app_id + m
	return url
};

export default encryptUrl