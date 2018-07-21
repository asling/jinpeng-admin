import { fromJS } from 'immutable';
import { 
	EXPENSES_FETCH_ACTION,
	EXPENSES_FETCH_SUCCESS_ACTION,
	EXPENSES_FETCH_FAIL_ACTION,
 } from "./constants";
const initialState = fromJS({
	expenseList: [],
	dataLoading: false,
});

function expensesReducer(state = initialState, action){
	switch(action.type){
		case EXPENSES_FETCH_ACTION:
			return state.set("dataLoading",true);
		case EXPENSES_FETCH_SUCCESS_ACTION:
			return state.set("expenseList",action.data).set("dataLoading",false);
		case EXPENSES_FETCH_FAIL_ACTION:
			return state.set("expenseList",action.err).set("dataLoading",false);
		default: 
			return state;
	}
}
export const stateName = "expenses";
export default expensesReducer;