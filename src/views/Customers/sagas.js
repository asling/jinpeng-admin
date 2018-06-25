/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { CUSTOMERS_INIT_ACTION } from './constants';
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
export default function* () {
  yield takeLatest(CUSTOMERS_INIT_ACTION, getInitSaga);
}

