import { 
	CUSTOMERS_FETCH_ACTION,
	CUSTOMERS_FETCH_SUCCESS_ACTION,
	CUSTOMERS_FETCH_FAIL_ACTION,
	CUSTOMERDETAIL_FETCH_ACTION,
	CUSTOMERDETAIL_FETCH_SUCCESS_ACTION,
	CUSTOMERDETAIL_FETCH_FAIL_ACTION,
 } from "./constants";

export const getCustomersAction = ({token,id}) => {
	return {
		type: CUSTOMERS_FETCH_ACTION,
		params:{token,id},
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

