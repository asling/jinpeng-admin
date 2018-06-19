import { take, call, put, select, cancel, takeLatest,takeEvery } from 'redux-saga/effects';
import { loginSuccessAction, loginFailAction } from "./actions";
import { LOGIN_ACTION } from "./constants";
import request from "utils/request";

export function* goLogin(action){
	console.log("goLogin",action);
	const requestURL = '//localhost:8989/login/';
	try{
		const loginResult = yield call(request,requestURL,{
		method: 'get',
		mode: 'cors',
		cache: 'default',
	});
		if(loginResult && loginResult.code){
			yield put(loginSuccessAction(loginResult.isAuthed));
			return loginResult;
		}
	}catch(err){
		yield put(loginFailAction(err));
	}
	return true;
}
export function* goLoginSaga(){
	console.log("goLoginSaga",LOGIN_ACTION);

	yield takeLatest(LOGIN_ACTION,goLogin);
	// console.log("11111",watcher);
	// const watcher = yield* goLogin(LOGIN_ACTION);
}


export default  [
	goLoginSaga,
]