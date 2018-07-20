import { 
	ORDERS_FETCH_ACTION,
	ORDERS_FETCH_SUCCESS_ACTION,
	ORDERS_FETCH_FAIL_ACTION,
 } from "./constants";

export const getOrdersAction = ({token,page}) => {
	return {
		type: ORDERS_FETCH_ACTION,
		params:{token,page},
	}
}

export const getOrdersSuccessAction = (data) => {
	return {
		type: ORDERS_FETCH_SUCCESS_ACTION,
		data,
	}
}

export const getOrdersFailAction = (err) => {
	return {
		type: ORDERS_FETCH_FAIL_ACTION,
		err,
	}
}

