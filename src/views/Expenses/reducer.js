import { fromJS } from 'immutable';
import { EXPENSES_INIT_ACTION } from "./constants";
const initialState = fromJS({
	expenses: [],
	expensesLoading: false,
});

function employeesReducer(state = initialState, action){
	switch(action.type){
		case EXPENSES_INIT_ACTION:
			return state.set("expensesLoading",true);
		default: 
			return state;
	}
}
export const stateName = "expenses";
export default employeesReducer;