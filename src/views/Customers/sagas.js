/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { 
	CUSTOMERS_FETCH_ACTION,
	CUSTOMERDETAIL_FETCH_ACTION,
	EMPLOYEES_SUGGESTION_FETCH_ACTION
 } from './constants';
import { 
	getCustomersSuccessAction,
	getCustomersFailAction,
	getCustomerDetailSuccessAction,
	getCustomerDetailFailAction,
	getEmployeesSuggestionSuccessAction,
	getEmployeesSuggestionFailAction
 } from './actions';

import {
	customersRequest,
	employeesRequest
} from "../../apis";

import request from 'utils/request';

/**
 * Github repos request/response handler
 */
export function* getCustomers(action) {
  // Select username from store
  const { token, page } = action.params || {};
	try{
		const customersData = yield call(request,`${customersRequest}?page=${page}`,{
			method: 'GET',
			mode: 'cors',
			headers: {
				'content-type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		});
		yield put(getCustomersSuccessAction({
			status: 1,
			data: customersData,
		}));
	}catch(err){
		yield put(getCustomersFailAction({
			status: -1,
			data: {err},
		}));
	}
}

export function* getCustomerDetail(action){
	const { token, id } = action.params || {};
	try{
		const customerDetailData = yield call(request,`${customersRequest}/${id}`,{
			method: 'GET',
			mode: 'cors',
			headers: {
				'content-type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		});
		console.log("saga customerDetailData",customerDetailData);
		yield put(getCustomerDetailSuccessAction({
			status: 1,
			data: customerDetailData,
		}));
	}catch(err){
		yield put(getCustomerDetailFailAction({
			status: -1,
			data: {err},
		}));
	}
}

export function* getEmployeesSuggestion(action){
	const { token } = action.params || {};
	try{
		const employeesResult = yield call(request,`${employeesRequest}/employees`,{
			method: 'GET',
			mode: 'cors',
			headers: {
				'content-type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		});
		console.log("saga employeesResult",employeesResult);
		yield put(getEmployeesSuggestionSuccessAction({
			status: 1,
			data: employeesResult,
		}));
	}catch(err){
		yield put(getEmployeesSuggestionFailAction({
			status: -1,
			data: {err},
		}));
	}
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* () {
  yield takeLatest(CUSTOMERS_FETCH_ACTION, getCustomers);
  yield takeLatest(CUSTOMERDETAIL_FETCH_ACTION, getCustomerDetail);
  yield takeLatest(EMPLOYEES_SUGGESTION_FETCH_ACTION, getEmployeesSuggestion);
}

