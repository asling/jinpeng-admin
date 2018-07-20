import { createSelector } from 'reselect';

const selectEmployees = (state) => state.get("employees");

const makeSelectEmployeeDetail = () => createSelector(
	selectEmployees,
	(subState) => subState.get("employeeDetail")
);

const makeSelectEmployees = () => createSelector(
	selectEmployees,
	(subState) => subState.get("employeeList")
);

const makeDataLoading = () => createSelector(
	selectEmployees,
	(subState) => subState.get("dataLoading")
)

const makeSelectCreating = () => createSelector(
	selectEmployees,
	(subState) => subState.get("creating")
)

const makeSelectUpdating = () => createSelector(
	selectEmployees,
	(subState) => subState.get("updating")
);

const makeSelectEmployeeCreated = () => createSelector(
	selectEmployees,
	(subState) => subState.get("employeeCreated")
)

export {
	selectEmployees,
	makeSelectEmployeeDetail,
	makeSelectEmployees,
	makeDataLoading,
	makeSelectUpdating,
	makeSelectCreating,
	makeSelectEmployeeCreated,
}