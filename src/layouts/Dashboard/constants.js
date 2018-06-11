/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR';
export const DEFAULT_LOCALE = 'en';

export const LOGIN_ACTION = 'app/App/LOGIN_ACTION';
export const LOGIN_SUCCESS_ACTION = 'app/App/LOGIN_SUCCESS_ACTION';
export const LOGIN_FAIL_ACTION = 'app/App/LOGIN_FAIL_ACTION';

export const AUTH = "boilerplate/App/AUTH";
export const AUTH_SUCCESS = "boilerplate/App/AUTH_SUCCESS";
export const AUTH_FAIL = "boilerplate/App/AUTH_FAIL";

export const LOGOFF_ACTION = 'boilerplate/App/LOGOFF_ACTION';
export const LOGOFF_SUCCESS_ACTION = 'boilerplate/App/LOGOFF_ACTION';
export const LOGOFF_FAIL_ACTION = 'boilerplate/App/LOGOFF_FAIL_ACTION';