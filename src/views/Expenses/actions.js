import { 
	EXPENSES_FETCH_ACTION,
	EXPENSES_FETCH_SUCCESS_ACTION,
	EXPENSES_FETCH_FAIL_ACTION,
 } from "./constants";

export const getExpensesAction = ({token,page}) => {
	return {
		type: EXPENSES_FETCH_ACTION,
		params:{token,page},
	}
}

export const getExpensesSuccessAction = (data) => {
	return {
		type: EXPENSES_FETCH_SUCCESS_ACTION,
		data,
	}
}

export const getExpensesFailAction = (err) => {
	return {
		type: EXPENSES_FETCH_FAIL_ACTION,
		err,
	}
}

