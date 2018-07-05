import { 
	CUSTOMERS_FETCH_ACTION,
	CUSTOMERS_FETCH_SUCCESS_ACTION,
	CUSTOMERS_FETCH_FAIL_ACTION,
	CUSTOMERDETAIL_FETCH_ACTION,
	CUSTOMERDETAIL_FETCH_SUCCESS_ACTION,
	CUSTOMERDETAIL_FETCH_FAIL_ACTION,
	EMPLOYEES_SUGGESTION_FETCH_ACTION,
	EMPLOYEES_SUGGESTION_FETCH_SUCCESS_ACTION,
	EMPLOYEES_SUGGESTION_FETCH_FAIL_ACTION,
 } from "./constants";

export const getCustomersAction = ({token,page}) => {
	return {
		type: CUSTOMERS_FETCH_ACTION,
		params:{token,page},
	}
}

export const getCustomersSuccessAction = (data) => {
	return {
		type: CUSTOMERS_FETCH_SUCCESS_ACTION,
		data,
	}
}

export const getCustomersFailAction = (err) => {
	return {
		type: CUSTOMERS_FETCH_FAIL_ACTION,
		err,
	}
}

export const getCustomerDetailAction = ({token,id}) => {
	return {
		type: CUSTOMERDETAIL_FETCH_ACTION,
		params:{token,id},
	}
}

export const getCustomerDetailSuccessAction = (data) => {
	return {
		type: CUSTOMERDETAIL_FETCH_SUCCESS_ACTION,
		data,
	}
}

export const getCustomerDetailFailAction = (err) => {
	return {
		type: CUSTOMERDETAIL_FETCH_FAIL_ACTION,
		err,
	}
}

export const getEmployeesSuggestion = (token) => {
	return {
		type: EMPLOYEES_SUGGESTION_FETCH_ACTION,
		params: token
	}
}

export const getEmployeesSuggestionSuccessAction = (data) => {
	return {
		type: EMPLOYEES_SUGGESTION_FETCH_SUCCESS_ACTION,
		data,
	}
}

export const getEmployeesSuggestionFailAction = (err) => {
	return {
		type: EMPLOYEES_SUGGESTION_FETCH_FAIL_ACTION,
		err,
	}
}
