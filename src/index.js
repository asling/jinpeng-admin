import React from "react";
import { AppContainer } from 'react-hot-loader'
import ReactDOM from "react-dom";
import { Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import "assets/css/material-dashboard-react.css?v=1.2.0";
// Import selector for `syncHistoryWithStore`
import history from "./createBrowserHistory";
import rootRoute from "routes/index.jsx";
import store from './createStore';
// const hist = createBrowserHistory();
ReactDOM.render(
	<AppContainer>
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Switch>
				{rootRoute.map( (item,key) => {
					return (
					    <Route key={key} path={item.path} component={item.component} />
					)
				})}
		   </Switch>  
		</ConnectedRouter>
	</Provider>
	</AppContainer>
  ,
  document.getElementById("root")
);
