import { createSelector } from 'reselect';

const selectOrders = (state) => state.get("orders");

const makeSelectOrders = () => createSelector(
	selectOrders,
	(subState) => subState.get("orderList")
)

const makeDataLoading = () => createSelector(
	selectOrders,
	(subState) => subState.get("dataLoading")
)


export {
	selectOrders,
	makeSelectOrders,
	makeDataLoading,
}