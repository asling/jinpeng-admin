import { take, call, put, select, cancel, takeLatest,takeEvery } from 'redux-saga/effects';
import { 
	authAction, 
	authSuccessAction, 
	authFailAction, 
	loginAction, 
	loginSuccessAction, 
	loginFailAction,
	registerSuccessAction,
	registerFailAction,
	logoffSuccessAction,
	logoffFailAction
	 } from "./actions";
import { AUTH, LOGIN_ACTION, REGISTER_ACTION, LOGOFF_ACTION, LOGOFF_SUCCESS_ACTION, LOGOFF_FAIL_ACTION } from "./constants";
import request from "utils/request";

export function* goLogin(action){
	const { username, password } = action;
	console.log("action",action);
	try{
		// const timeout = yield call(delay,function(){return 1;},1500);
		const loginResult = yield call(request,"//localhost:1337/auth/local",{
			method: 'POST',
			mode: 'cors',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({identifier:username,password})
		});
		yield put(loginSuccessAction({
			status: 1,
			data: loginResult,
		}));
	}catch(err){
		yield put(loginFailAction({
			status: -1,
			data: {err},
		}));
	}
}
export function* goLoginSaga(){
	// console.log("goLoginSaga",LOGIN_ACTION);
	yield takeLatest(LOGIN_ACTION,goLogin);
	// console.log("11111",watcher);
	// const watcher = yield* goLogin(LOGIN_ACTION); 
}

export function* goRegister(action){
	const { user_name, password, repassword } = action;
	try{
		// const timeout = yield call(delay,function(){return 1;},1500);
		const data = yield call(request,'//localhost:1337/auth/local/register',{
			method: 'POST',
			mode: 'cors',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({"username":user_name,"email":user_name, password})
		});
		yield put(registerSuccessAction({
				status: 1,
				data,
		}));
	}catch(err){
		yield put(registerFailAction({
			status: -1,
			user: {err},
		}));
	}
}

export function* goRegisterSaga(){
	yield takeLatest(REGISTER_ACTION,goRegister);
}


export default  [
	goLoginSaga,
	goRegisterSaga,
]