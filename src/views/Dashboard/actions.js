import {
	CUSTOMERS_FETCH_ACTION,
	CUSTOMERS_FETCH_SUCCESS_ACTION,
	CUSTOMERS_FETCH_FAIL_ACTION,
	EXPENSES_FETCH_ACTION,
	EXPENSES_FETCH_SUCCESS_ACTION,
	EXPENSES_FETCH_FAIL_ACTION,
} from './constants';

export const getDashboardCustomersAction = (token) => {
	return {
		type: CUSTOMERS_FETCH_ACTION,
		token,
	}
}

export const getDashboardCustomersSuccessAction = (data) => {
	return {
		type: CUSTOMERS_FETCH_SUCCESS_ACTION,
		data,
	}
}

export const getDashboardCustomersFailAction = (err) => {
	return {
		type: CUSTOMERS_FETCH_FAIL_ACTION,
		err,
	}
}

export const getDashboardExpensesAction = (token) => {
	return {
		type: EXPENSES_FETCH_ACTION,
		token,
	}
}

export const getDashboardExpensesSuccessAction = (data) => {
	return {
		type: EXPENSES_FETCH_SUCCESS_ACTION,
		data,
	}
}

export const getDashboardExpensesFailAction = (err) => {
	return {
		type: EXPENSES_FETCH_FAIL_ACTION,
		err,
	}
}