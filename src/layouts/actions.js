/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_REPOS,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS_ERROR,
  AUTH,
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOGIN_ACTION,
  LOGIN_SUCCESS_ACTION,
  LOGIN_FAIL_ACTION,
  REGISTER_ACTION,
  REGISTER_SUCCESS_ACTION,
  REGISTER_FAIL_ACTION,

  LOGOFF_ACTION,
  LOGOFF_SUCCESS_ACTION,
  LOGOFF_FAIL_ACTION,

  LOGIN_ERROR_CANCEL_ACTION,
  REGISTER_ERROR_CANCEL_ACTION
} from './constants';

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function loadRepos() {
  return {
    type: LOAD_REPOS,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function reposLoaded(repos, username) {
  return {
    type: LOAD_REPOS_SUCCESS,
    repos,
    username,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}

export function loginAction(form){
  return {
    type: LOGIN_ACTION,
    username: form.username,
    password: form.password,
  }
}

export function loginSuccessAction(token){
  return {
    type: LOGIN_SUCCESS_ACTION,
    token,
  }
}

export function loginFailAction(err){
  return {
    type: LOGIN_FAIL_ACTION,
    err
  }
}

export function authAction(){
  return {
    type: AUTH,
  }
}

export function authSuccessAction(isAuthed){
  return {
    type: AUTH_SUCCESS,
    isAuthed,
  }
}

export function authFailAction(err){
  return {
    type: AUTH_FAIL,
    err
  }
}

export function registerAction(form){
  return {
    type: REGISTER_ACTION,
    user_name: form.user_name,
    password: form.password,
    repassword: form.repassword,
  }
}

export function registerSuccessAction(token){
  return {
    type: REGISTER_SUCCESS_ACTION,
    token,
  }
}

export function registerFailAction(err){
  return {
    type: REGISTER_FAIL_ACTION,
    err
  }
}

export function logoffAction(){
  return {
    type: LOGOFF_ACTION,
  }
}

export function logoffSuccessAction(){
  return {
    type: LOGOFF_SUCCESS_ACTION,
  }
}

export function logoffFailAction(err){
  return {
    type: LOGOFF_FAIL_ACTION,
    err,
  }
}

export function loginErrorCancelAction(){
  return {
    type: LOGIN_ERROR_CANCEL_ACTION
  }
}

export function registerErrorCancelAction(){
  return {
    type: REGISTER_ERROR_CANCEL_ACTION,
  }
} 
