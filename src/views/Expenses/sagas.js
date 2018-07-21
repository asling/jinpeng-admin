/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { 
	EXPENSES_FETCH_ACTION
 } from './constants';
import { 
	getExpensesSuccessAction,
	getExpensesFailAction
 } from './actions';
import { expensesRequest } from "../../apis";
import request from 'utils/request';

/**
 * Github repos request/response handler
 */
export function* getExpenses(action) {
  // Select username from store
  const { token, page } = action.params || {};
	try{
		const expensesData = yield call(request,expensesRequest,{
			method: 'GET',
			mode: 'cors',
			headers: {
				'content-type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		});
		console.log("expensesData",expensesData);
		yield put(getExpensesSuccessAction({
			status: 1,
			data: expensesData,
		}));
	}catch(err){
		yield put(getExpensesFailAction({
			status: -1,
			data: {err},
		}));
	}
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* () {
  yield takeLatest(EXPENSES_FETCH_ACTION, getExpenses);
}

