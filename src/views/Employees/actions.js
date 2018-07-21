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

export const getEmployeesAction = ({token,page}) => {
	return {
		type: EMPLOYEES_FETCH_ACTION,
		params:{token,page},
	}
}

export const getEmployeesSuccessAction = (data) => {
	return {
		type: EMPLOYEES_FETCH_SUCCESS_ACTION,
		data,
	}
}

export const getEmployeesFailAction = (err) => {
	return {
		type: EMPLOYEES_FETCH_FAIL_ACTION,
		err,
	}
}

export const getEmployeeDetailAction = ({token,id}) => {
	return {
		type: EMPLOYEEDETAIL_FETCH_ACTION,
		params:{token,id},
	}
}

export const getEmployeeDetailSuccessAction = (data) => {
	return {
		type: EMPLOYEEDETAIL_FETCH_SUCCESS_ACTION,
		data,
	}
}

export const getEmployeeDetailFailAction = (err) => {
	return {
		type: EMPLOYEEDETAIL_FETCH_FAIL_ACTION,
		err,
	}
}

export const createEmployeeAction = ({token,formData}) => {
	return {
		type: EMPLOYEEDETAIL_CREATE_ACTION,
		params:{token,formData},
	}
}

export const createEmployeeSuccessAction = (data) => {
	return {
		type: EMPLOYEEDETAIL_CREATE_SUCCESS_ACTION,
		data,
	}
}

export const createEmployeeFailAction = (err) => {
	return {
		type: EMPLOYEEDETAIL_CREATE_FAIL_ACTION,
		err,
	}
}

export const updateEmployeeAction = ({token,formData,id}) => {
	return {
		type: EMPLOYEEDETAIL_UPDATE_ACTION,
		params:{token,formData,id},
	}
}

export const updateEmployeeSuccessAction = (data) => {
	return {
		type: EMPLOYEEDETAIL_UPDATE_SUCCESS_ACTION,
		data,
	}
}

export const updateEmployeeFailAction = (err) => {
	return {
		type: EMPLOYEEDETAIL_UPDATE_FAIL_ACTION,
		err,
	}
}

export const cancelCreatedAction = () => {
	return {
		type: CANCEL_CREATED_ACTION,
	}
}

export const cancelUpdatedAction = () => {
	return {
		type: CANCEL_UPDATED_ACTION,
	}
}