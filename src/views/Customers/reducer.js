import { fromJS } from 'immutable';
import { 
	CUSTOMERDETAIL_FETCH_ACTION,
	CUSTOMERDETAIL_FETCH_SUCCESS_ACTION,
	CUSTOMERDETAIL_FETCH_FAIL_ACTION,

	CUSTOMERS_FETCH_ACTION,
	CUSTOMERS_FETCH_SUCCESS_ACTION,
	CUSTOMERS_FETCH_FAIL_ACTION,
	EMPLOYEES_SUGGESTION_FETCH_SUCCESS_ACTION,
	EMPLOYEES_SUGGESTION_FETCH_FAIL_ACTION,

 } from "./constants";
const initialState = fromJS({
	customerList: [],
	customerDetail: {},
	dataLoading: false,
	employeesSuggestion:[],
});

function customersReducer(state = initialState, action){
	switch(action.type){
		case CUSTOMERS_FETCH_ACTION:
		case CUSTOMERDETAIL_FETCH_ACTION:
			return state.set("dataLoading",true);
		case CUSTOMERDETAIL_FETCH_SUCCESS_ACTION:
			return state.set("customerDetail",action.data).set("dataLoading",false);
		case CUSTOMERDETAIL_FETCH_SUCCESS_ACTION:
			return state.set("customerDetail",action.err).set("dataLoading",false);
		case EMPLOYEES_SUGGESTION_FETCH_SUCCESS_ACTION:
			return state.set("employeesSuggestion",action.data);
		case EMPLOYEES_SUGGESTION_FETCH_FAIL_ACTION:
			return state.set("employeesSuggestion",action.err);
		default: 
			return state;
	}
}
export const stateName = "customers";
export default customersReducer;