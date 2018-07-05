/**
 * The Dashboard state selectors
 */
import { createSelector } from 'reselect';

const selectDashboard = (state) => {
  // console.log("state",state);
  console.log("yyyyyyy",state.get('dashboard'));
  return state.get('dashboard');
};

const makeDashboardLoading = () => createSelector(
  selectDashboard,
  (subState) => {
    // console.log("subState1",subState);
    return subState.get('dataLoading');
  }
);

const makeDashboardCustomers = () => createSelector(
	selectDashboard,
	(subState) => {
    // console.log("subState2",subState);
    return subState.get("customers");
  }
);

const makeDashboardExpenses = () => createSelector(
	selectDashboard,
	(subState) => {
    // console.log("subState3",subState);
    return subState.get("expenses");
  }
);

export {
  selectDashboard,
  makeDashboardLoading,
  makeDashboardCustomers,
  makeDashboardExpenses,
}