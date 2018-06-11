import { fromJS } from 'immutable';
import { EMPLOYEES_INIT_ACTION } from "./constants";
const initialState = fromJS({
	employees: [],
	employeesLoading: false,
});

function employeesReducer(state = initialState, action){
	switch(action.type){
		case EMPLOYEES_INIT_ACTION:
			return state.set("employeesLoading",true);
		default: 
			return state;
	}
}
export const stateName = "employees";
export default employeesReducer;