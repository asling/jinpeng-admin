/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { connectRouter, routerMiddleware } from 'connected-react-router/immutable';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';

import { getAsyncInjectors } from 'utils/asyncInjectors';
import AppSaga from "layouts/sagas";
const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}, history) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // TODO Try to remove when `react-router-redux` is out of beta, LOCATION_CHANGE should not be fired more than once after hot reloading
        // Prevent recomputing reducers for `replaceReducer`
        shouldHotReload: false,
      })
      : compose;
  /* eslint-enable */
  const reducers = createReducer();
  const store = createStore(
    connectRouter(history)(reducers),
    fromJS(initialState),
    composeEnhancers(...enhancers)
  );

  // console.log("store1",store.getState().toJS());

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.asyncReducers = {}; // Async reducer registry

  const { injectSagas, injectReducer } = getAsyncInjectors(store);
  injectSagas(AppSaga);
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      // console.log("111");
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
}
