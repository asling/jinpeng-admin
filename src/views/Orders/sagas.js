/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { ORDERS_INIT_ACTION } from './constants';
import { getInitAction } from './actions';

import request from 'utils/request';

/**
 * Github repos request/response handler
 */
export function* getInit(action) {
  // Select username from store
  


  
}

/**
 * Root saga manages watcher lifecycle
 */
export function* getInitSaga() {
  yield takeLatest(ORDERS_INIT_ACTION, getInitSaga);
}

// Bootstrap sagas
export default [
  getInitSaga,
];
