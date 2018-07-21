/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  LOGIN_ACTION,
  LOGIN_SUCCESS_ACTION,
  LOGIN_FAIL_ACTION,
  AUTH,
  AUTH_SUCCESS,
  AUTH_FAIL,
  REGISTER_ACTION,
  REGISTER_SUCCESS_ACTION,
  REGISTER_FAIL_ACTION,
  LOGOFF_SUCCESS_ACTION,
  LOGOFF_FAIL_ACTION,
  REGISTER_ERROR_CANCEL_ACTION,
  LOGIN_ERROR_CANCEL_ACTION,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
  authInfo: null,
  authLoading: false,
  registerError: false,
  loginError: false,
});

/**
 * code: [
 *   -1: authError,
 *   -2: loginError,
 *   -3: registerError,
 *   1: authSuccess,
 *   2: loginSuccess,
 *   3: reigsterSuccess,
 * ]
 * authInfo: {user-id:String; name:String; code:[1,-1]; msg:String;}
 */

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REPOS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'repositories'], false);
    case LOAD_REPOS_SUCCESS:
      return state
        .setIn(['userData', 'repositories'], action.repos)
        .set('loading', false)
        .set('currentUser', action.username);
    case LOAD_REPOS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case LOGIN_ACTION:
        // console.log("this.state. ",state);
        return state.set("authLoading",true);
    case LOGIN_SUCCESS_ACTION:
        return state.set("authInfo",action.token).set("authLoading",false);
    case LOGIN_FAIL_ACTION:
        return state.set("authInfo",action.err).set("authLoading",false).set("loginError",true);
    case REGISTER_ACTION:
        // console.log("REGISTER_ACTION",action);
        return state.set("authLoading",true);
    case REGISTER_SUCCESS_ACTION:
        // console.log("REGISTER_SUCCESS_ACTION",action);
        return state.set("authInfo",action.token).set("authLoading",false);
    case REGISTER_FAIL_ACTION: 
        // console.log("REGISTER_FAIL_ACTION",action);
        return state.set("authInfo",action.err).set("authLoading",false).set("registerError",true);
    case LOGIN_ERROR_CANCEL_ACTION:
        return state.set("loginError",false);
    case REGISTER_ERROR_CANCEL_ACTION:
        return state.set("registerError",false);
    default:
      return state;
  }
}


export default appReducer;
