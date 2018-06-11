import { getAsyncInjectors } from './utils/asyncInjectors';
import store from './createStore';
const asyncInjectors = getAsyncInjectors(store);

export const injectReducer = asyncInjectors.injectReducer;
export const injectSagas =  asyncInjectors.injectSagas;
