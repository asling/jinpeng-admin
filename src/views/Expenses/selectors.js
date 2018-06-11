import { createSelector } from 'reselect';

const selectExpenses = (state) => state.get("expenses");

export {
	selectExpenses,
}