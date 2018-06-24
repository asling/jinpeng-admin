/**
 * Create the store with asynchronously loaded reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
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
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
  /* eslint-enable */

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers)
  );

  //run the app sagas
  // AppSaga.map(sagaMiddleware.run);

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
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }
  // injectReducer('global', AppReducer);
  // globalSaga.then(sagas => {
  //   console.log("sagas");
    
  // }).catch(err => {
  //   console.log("err",err);
  // });

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  // if (module.hot) {
  //   module.hot.accept('./reducers', () => {
  //     import('./reducers').then((reducerModule) => {
  //       const createReducers = reducerModule.default;
       
  //       const nextReducers = createReducers(store.asyncReducers);

  //       store.replaceReducer(nextReducers);
  //     });
  //   });
  // }

  return store;
}