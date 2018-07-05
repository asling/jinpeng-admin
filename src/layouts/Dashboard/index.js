import React from 'react';
import { AuthContext, loadToken, authToken } from "providers/Auth";
import { Redirect } from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
class DashboardWrapper extends React.Component{
	constructor(props){
		super(props);
		this._accessTokenUpdate = this._accessTokenUpdate.bind(this);
		this.state = {
			token: loadToken(),
		}
	}
	_accessTokenUpdate(authInfo){
		// console.log("_accessTokenUpdate authInfo",authInfo);
		if(authInfo && authInfo.status >= 1){
			this.setState({
				token: authInfo.data
			});
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
			<AuthContext.Provider value={authToken(this.state.token)}>
				<AuthContext.Consumer>
					{accessToken => {
						// console.log("accessToken Dashboard",accessToken);
						return accessToken && accessToken.code <= 0 ?  <Redirect to="/login" /> : <Dashboard accessTokenUpdate={this._accessTokenUpdate} accessToken={accessToken.token} {...props} />
					}}
				</AuthContext.Consumer>
			</AuthContext.Provider>
		)
	}
}

export default DashboardWrapper;