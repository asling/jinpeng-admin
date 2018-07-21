import React from 'react';
const key = "accessToken";
const defaultExpire = 86400000; // will expire in 1 day.
/**
 * [auth description]
 * @param  {[Object]} token  []
 * @param  {[Number]} expire [ timestamp ]
 * @return {[Object]}        [description]
 */
export const authToken = function(token,expire){
	if(!window.localStorage) return {status: 'localStorage.disabled',code: -1};
	if(!token || !token.jwt) return token;
	const now = Date.now();
	const result = {
		'expire': expire ? expire : now+defaultExpire,
		token,
		code: 1,
	};
	// console.log("result",result);
	window.localStorage.setItem(key,JSON.stringify(result));
	return result;
}
export const loadToken = function(){
	if(!window.localStorage) return {status: 'localStorage.disabled',code: -1};
	if(!window.localStorage.getItem(key)) return {code: -1, token: {}};
	// console.log("window.localStorage.getItem(key)",window.localStorage.getItem(key));
	const result = JSON.parse(window.localStorage.getItem(key));
	const now = Date.now();
	const expire = result.expire;
	// console.log("expire",expire);
	const expireDate = new Date(expire);
	if(expireDate.getTime() < now){
		window.localStorage.removeItem(key);
		return {status: 'login.expired',code: -1,token:{}};
	}
	return result.token;
}
const accessToken = {};
export const AuthContext = React.createContext(accessToken);