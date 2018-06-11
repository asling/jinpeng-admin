import { createSelector } from 'reselect';

const selectCustomers = (state) => state.get("customers");

export {
	selectCustomers,
}