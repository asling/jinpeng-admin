import React from 'react';
import { AuthContext, loadToken, authToken } from "providers/Auth";
import Dashboard from "./Dashboard.jsx";
class DashboardWrapper extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			token: loadToken(),
		}
	}

	shouldComponentUpdate(nextProps,nextState){
		// console.log("nextState.token.code === this.state.code && nextState.token.code === -1",nextState.token.code === this.state.token.code && nextState.token.code === -1);
		if(nextState.token.code === this.state.token.code && nextState.token.code === -1) return false;
		return true;
	}

	render(){
		const props = this.props;
		return (
				<AuthContext.Consumer>
					{accessToken => {
						// console.log("accessToken DashboardPage",accessToken);
						return accessToken && accessToken.code <= 0 ? <Dashboard {...props} /> : <Dashboard accessToken={accessToken.token} {...props} />;
					}}
				</AuthContext.Consumer>
		)
	}
}

export default DashboardWrapper;