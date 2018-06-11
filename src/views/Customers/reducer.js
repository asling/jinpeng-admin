import { fromJS } from 'immutable';
import { EMPLOYEES_INIT_ACTION } from "./constants";
const initialState = fromJS({
	customers: [],
	customersLoading: false,
});

function employeesReducer(state = initialState, action){
	switch(action.type){
		case EMPLOYEES_INIT_ACTION:
			return state.set("customersLoading",true);
		default: 
			return state;
	}
}
export const stateName = "customers";
export default employeesReducer;