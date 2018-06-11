import { fromJS } from 'immutable';
import { ADMINUSERS_INIT_ACTION } from "./constants";
const initialState = fromJS({
	adminUsers: [],
	adminUsersLoading: false,
});

function employeesReducer(state = initialState, action){
	switch(action.type){
		case ADMINUSERS_INIT_ACTION:
			return state.set("adminUsersLoading",true);
		default: 
			return state;
	}
}
export const stateName = "adminUsers";
export default employeesReducer;