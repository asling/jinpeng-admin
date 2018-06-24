/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import globalReducer from './layouts/reducer';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@5
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  location: {},
  action: "",
});

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  console.log("action",action);
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      console.log("action.payload",action.payload);
      return state.merge({
        location: action.payload,
      });
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
  console.log("injectedReducers",injectedReducers);
  return combineReducers({
    route: routeReducer,
    global: globalReducer,
    ...injectedReducers,
  });
}
