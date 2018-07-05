import { createSelector } from 'reselect';

const selectCustomers = (state) => state.get("customers");

const makeSelectCustomerDetail = () => createSelector(
	selectCustomers,
	(subState) => subState.get("customerDetail")
);

const makeSelectCustomers = () => createSelector(
	selectCustomers,
	(subState) => subState.get("customerList")
);

const makeDataLoading = () => createSelector(
	selectCustomers,
	(subState) => subState.get("dataLoading")
)

const makeSelectEmployeesSuggestion = () => createSelector(
	selectCustomers,
	(subState) => subState.get("employeesSuggestion")
)

export {
	selectCustomers,
	makeSelectCustomerDetail,
	makeSelectCustomers,
	makeDataLoading,
	makeSelectEmployeesSuggestion
}