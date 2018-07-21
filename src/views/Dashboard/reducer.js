import { fromJS } from 'immutable';
import {
	CUSTOMERS_FETCH_ACTION,
	CUSTOMERS_FETCH_SUCCESS_ACTION,
	CUSTOMERS_FETCH_FAIL_ACTION,
	EXPENSES_FETCH_ACTION,
	EXPENSES_FETCH_SUCCESS_ACTION,
	EXPENSES_FETCH_FAIL_ACTION,
} from './constants';

const initialState = fromJS({
	customers: null,
	dataLoading: false,
	expenses: null,
});

function dashboardReducer(state = initialState, action){
	switch(action.type){
		case CUSTOMERS_FETCH_ACTION:
			return state.set("dataLoading",true);
		case CUSTOMERS_FETCH_SUCCESS_ACTION:
			return state.set("customers",action.data).set("dataLoading",false);
		case CUSTOMERS_FETCH_FAIL_ACTION:
			return state.set("customers",action.err).set("dataLoading",false);
		case EXPENSES_FETCH_ACTION:
			return state.set("dataLoading",false);
		case EXPENSES_FETCH_SUCCESS_ACTION:
			return state.set("expenses",action.data).set("dataLoading",false);
		case EXPENSES_FETCH_FAIL_ACTION:
			return state.set("expenses",action.err).set("dataLoading",false);
		default :
			return state;
	}
}

export const stateName = 'dashboard';
export default dashboardReducer;