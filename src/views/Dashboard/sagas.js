import { take, call, put, select, cancel, takeLatest,takeEvery } from 'redux-saga/effects';
import {
	CUSTOMERS_FETCH_ACTION,
	CUSTOMERS_FETCH_SUCCESS_ACTION,
	CUSTOMERS_FETCH_FAIL_ACTION,
	EXPENSES_FETCH_ACTION,
	EXPENSES_FETCH_SUCCESS_ACTION,
	EXPENSES_FETCH_FAIL_ACTION,
} from "./constants";
import {
	getDashboardCustomersSuccessAction,
	getDashboardCustomersFailAction,
	getDashboardExpensesSuccessAction,
	getDashboardExpensesFailAction,
} from './actions';
import request from "utils/request";

export function* getCustomers(action){
	const { token } = action;
	try{
		const customersData = yield call(request,"//localhost:1337/customers?recent=1&recentNum=10",{
			method: 'GET',
			mode: 'cors',
			headers: {
				'content-type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		});
		yield put(getDashboardCustomersSuccessAction({
			status: 1,
			data: customersData,
		}));
	}catch(err){
		yield put(getDashboardCustomersFailAction({
			status: -1,
			data: {err},
		}));
	}
}

export function* getCustomersSaga(){
	yield takeLatest(CUSTOMERS_FETCH_ACTION, getCustomers);
}

export function* getExpenses(action){
	const { token } = action;
	try{
		const expensesData = yield call(request,"//localhost:1337/expenses?recent=1&recentNum=10",{
			method: 'GET',
			mode: 'cors',
			headers: {
				'content-type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		});
		yield put(getDashboardExpensesSuccessAction({
			status: 1,
			data: expensesData,
		}));
	}catch(err){
		yield put(getDashboardExpensesFailAction({
			status: -1,
			data: {err},
		}));
	}
}

export function* getExpensesSaga(){
	yield takeLatest(EXPENSES_FETCH_ACTION,getExpenses);
}

export default [
	getExpensesSaga,
	getCustomersSaga,
];