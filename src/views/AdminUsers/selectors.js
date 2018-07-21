import { createSelector } from 'reselect';

const selectAdminUsers = (state) => state.get("adminUsers");

export {
	selectAdminUsers,
}