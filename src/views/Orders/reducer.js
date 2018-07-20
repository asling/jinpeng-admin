import { fromJS } from 'immutable';
import { 
	ORDERS_FETCH_ACTION,
	ORDERS_FETCH_SUCCESS_ACTION,
	ORDERS_FETCH_FAIL_ACTION,
 } from "./constants";
const initialState = fromJS({
	orderList: [],
	dataLoading: false,
});

function ordersReducer(state = initialState, action){
	switch(action.type){
		case ORDERS_FETCH_ACTION:
			return state.set("dataLoading",true);
		case ORDERS_FETCH_SUCCESS_ACTION:
			return state.set("orderList",action.data).set("dataLoading",false);
		case ORDERS_FETCH_FAIL_ACTION:
			return state.set("orderList",action.err).set("dataLoading",false);
		default: 
			return state;
	}
}
export const stateName = "orders";
export default ordersReducer;