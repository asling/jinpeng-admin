import { fromJS } from 'immutable';
import { 
	EMPLOYEES_FETCH_ACTION,
	EMPLOYEES_FETCH_SUCCESS_ACTION,
	EMPLOYEES_FETCH_FAIL_ACTION,
	EMPLOYEEDETAIL_FETCH_ACTION,
	EMPLOYEEDETAIL_FETCH_SUCCESS_ACTION,
	EMPLOYEEDETAIL_FETCH_FAIL_ACTION,
	EMPLOYEEDETAIL_CREATE_ACTION,
	EMPLOYEEDETAIL_CREATE_SUCCESS_ACTION,
	EMPLOYEEDETAIL_CREATE_FAIL_ACTION,
	EMPLOYEEDETAIL_UPDATE_ACTION,
	EMPLOYEEDETAIL_UPDATE_SUCCESS_ACTION,
	EMPLOYEEDETAIL_UPDATE_FAIL_ACTION,
	CANCEL_CREATED_ACTION,
	CANCEL_UPDATED_ACTION
 } from "./constants";
const initialState = fromJS({
	employeeList: [],
	dataLoading: false,
	employeeDetail: {},
	updating: false,
	creating: false,
	employeeCreated: false,
	employeeUpdated: false,
});

function employeesReducer(state = initialState, action){
	switch(action.type){
		case EMPLOYEES_FETCH_ACTION:
		case EMPLOYEEDETAIL_FETCH_ACTION:
			return state.set("dataLoading",true);
		case EMPLOYEES_FETCH_SUCCESS_ACTION:
			return state.set("employeeList",action.data).set("dataLoading",false);
		case EMPLOYEES_FETCH_FAIL_ACTION:
			return state.set("employeeList",action.err).set("dataLoading",false);
		case EMPLOYEEDETAIL_FETCH_SUCCESS_ACTION:
			return state.set("employeeDetail",action.data).set("dataLoading",false);
		case EMPLOYEEDETAIL_FETCH_FAIL_ACTION:
			return state.set("employeeDetail",action.err).set("dataLoading",false);
		case EMPLOYEEDETAIL_UPDATE_ACTION: 
			return state.set("updating",true);
		case EMPLOYEEDETAIL_UPDATE_SUCCESS_ACTION:
			return state.set("employeeDetail",action.data).set("employeeUpdated",true).set("updating",false);
		case EMPLOYEEDETAIL_UPDATE_FAIL_ACTION:
			return state.set("employeeDetail",action.data).set("employeeUpdated",false).set("updating",false);
		case EMPLOYEEDETAIL_CREATE_ACTION:
			return state.set("creating",true);
		case EMPLOYEEDETAIL_CREATE_SUCCESS_ACTION:
			return state.set("creating",false).set("employeeCreated",true);
		case EMPLOYEEDETAIL_CREATE_FAIL_ACTION:
			return state.set("creating",false).set("employeeCreated",false);
		case CANCEL_CREATED_ACTION:
			return state.set("employeeCreated",false);
		case CANCEL_UPDATED_ACTION:
			return state.set("employeeUpdated",false);
		default: 
			return state;
	}
}
export const stateName = "employees";
export default employeesReducer;