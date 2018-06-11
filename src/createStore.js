import history from "./createBrowserHistory";
import configureStore from './store';

const initialState = {};
export default configureStore(initialState, history);