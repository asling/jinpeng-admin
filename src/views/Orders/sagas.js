/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { 
	ORDERS_FETCH_ACTION
 } from './constants';
import { 
	getOrdersSuccessAction,
	getOrdersFailAction
 } from './actions';
import { ordersRequest } from "../../apis";
import request from 'utils/request';

/**
 * Github repos request/response handler
 */
export function* getOrders(action) {
  // Select username from store
  const { token, page } = action.params || {};
	try{
		const ordersData = yield call(request, ordersRequest,{
			method: 'GET',
			mode: 'cors',
			headers: {
				'content-type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		});
		console.log("ordersData",ordersData);
		yield put(getOrdersSuccessAction({
			status: 1,
			data: ordersData,
		}));
	}catch(err){
		yield put(getOrdersFailAction({
			status: -1,
			data: {err},
		}));
	}
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* () {
  yield takeLatest(ORDERS_FETCH_ACTION, getOrders);
}

