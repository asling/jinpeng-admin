import { fromJS } from 'immutable';
import { ORDERS_INIT_ACTION } from "./constants";
const initialState = fromJS({
	orders: [],
	ordersLoading: false,
});

function ordersReducer(state = initialState, action){
	switch(action.type){
		case ORDERS_INIT_ACTION:
			return state.set("ordersLoading",true);
		default: 
			return state;
	}
}
export const stateName = "orders";
export default ordersReducer;