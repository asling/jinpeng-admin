import { createSelector } from 'reselect';

const selectEmployees = (state) => state.get("employees");

export {
	selectEmployees,
}