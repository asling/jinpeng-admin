/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => {
  console.log("selectGlobal",state.get('global'));
  return state.get('global');
}

const makeSelectCurrentUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('currentUser')
);

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectRepos = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData', 'repositories'])
);

const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

const makeGlobalAuthInfo = () => createSelector(
  selectGlobal,
  (globalState) => {
    console.log("globalState",globalState);
    return globalState.get("authInfo");
  }
);

const makeGlobalAuthLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get("authLoading")
);

const makeGlobalRegisterError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get("registerError")
);

const makeGlobalLoginError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get("loginError")
);

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocationState,
  makeGlobalAuthInfo,
  makeGlobalAuthLoading,
  makeGlobalRegisterError,
  makeGlobalLoginError,
};
