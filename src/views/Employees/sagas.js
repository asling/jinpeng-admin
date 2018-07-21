/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { 
	EMPLOYEES_FETCH_ACTION,
	EMPLOYEEDETAIL_FETCH_ACTION,
	EMPLOYEEDETAIL_CREATE_ACTION,
	EMPLOYEEDETAIL_UPDATE_ACTION
 } from './constants';
import { 
	getEmployeesSuccessAction,
	getEmployeesFailAction,
	getEmployeeDetailSuccessAction,
	getEmployeeDetailFailAction,
	createEmployeeSuccessAction,
	createEmployeeFailAction,
	updateEmployeeSuccessAction,
	updateEmployeeFailAction
 } from './actions';
import { employeesRequest } from "../../apis";
import request from 'utils/request';

/**
 * Github repos request/response handler
 */
export function* getEmployees(action) {
  // Select username from store
  const { token, page } = action.params || {};
	try{
		const employeesData = yield call(request,employeesRequest,{
			method: 'GET',
			mode: 'cors',
			headers: {
				'content-type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		});
		console.log("employeesData",employeesData);
		yield put(getEmployeesSuccessAction({
			status: 1,
			data: employeesData,
		}));
	}catch(err){
		yield put(getEmployeesFailAction({
			status: -1,
			data: {err},
		}));
	}
}

export function* getEmployeeDetail(action){
	const { token, id } = action.params || {};
	try{
		const employeeDetailData = yield call(request,`${employeesRequest}/${id}`,{
			method: 'GET',
			mode: 'cors',
			headers: {
				'content-type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		});
		console.log("saga employeeDetailData",employeeDetailData);
		yield put(getEmployeeDetailSuccessAction({
			status: 1,
			data: employeeDetailData,
		}));
	}catch(err){
		yield put(getEmployeeDetailFailAction({
			status: -1,
			data: {err},
		}));
	}
}

export function* createEmployee(action){
	const { formData, token } = action.params || {};
	try{
		const createEmployeeResult = yield call(request,employeesRequest,{
			method: 'POST',
			mode: 'cors',
			headers: {
				'content-type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify(formData),
		});
		console.log("saga createEmployeeResult",createEmployeeResult);
		yield put(createEmployeeSuccessAction({
			status: 1,
			data: createEmployeeResult,
		}));
	}catch(err){
		yield put(createEmployeeFailAction({
			status: -1,
			data: {err},
		}));
	}
}

export function* updateEmployee(action){
	const { formData, token, id } = action.params || {}; 
	try{
		const updateEmployeeResult = yield call(request,`${employeesRequest}/${id}`,{
			method: 'PUT',
			mode: 'cors',
			headers: {
				'content-type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify(formData),
		});
		yield put(updateEmployeeSuccessAction({
			status: 1,
			data: updateEmployeeResult,
		}));
	}catch(err){
		yield put(updateEmployeeFailAction({
			status: -1,
			data: {err},
		}));
	}
}


/**
 * Root saga manages watcher lifecycle
 */
export default function* () {
  yield takeLatest(EMPLOYEES_FETCH_ACTION, getEmployees);
  yield takeLatest(EMPLOYEEDETAIL_FETCH_ACTION, getEmployeeDetail);
  yield takeLatest(EMPLOYEEDETAIL_UPDATE_ACTION, updateEmployee);
  yield takeLatest(EMPLOYEEDETAIL_CREATE_ACTION, createEmployee);
}

