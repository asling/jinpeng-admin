import { createSelector } from 'reselect';

const selectExpenses = (state) => state.get("expenses");

const makeSelectExpenses = () => createSelector(
	selectExpenses,
	(subState) => subState.get("expenseList")
)

const makeDataLoading = () => createSelector(
	selectExpenses,
	(subState) => subState.get("dataLoading")
)


export {
	selectExpenses,
	makeSelectExpenses,
	makeDataLoading,
}