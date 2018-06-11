import { createSelector } from 'reselect';

const selectOrders = (state) => state.get("orders");

export {
	selectOrders,
}