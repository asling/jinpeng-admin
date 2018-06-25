import { createSelector } from 'reselect';

const selectCustomers = (state) => state.get("customers");

const makeSelectCustomerDatail = createSelector(
	selectCustomers,
	(subState) => subState.get("customerDetail")
);

export {
	selectCustomers,
	makeSelectCustomerDatail
}