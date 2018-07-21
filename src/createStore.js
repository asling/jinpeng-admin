import history from "./createBrowserHistory";
import configureStore from './configureStore';

const initialState = {};
export default configureStore(initialState, history);