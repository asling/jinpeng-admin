import React from 'react';
import { AuthContext, loadToken, authToken } from "providers/Auth";
import { Redirect } from "react-router-dom";
import Login from "./Login";
class LoginWrapper extends React.Component{
	constructor(props){
		super(props);
		this._accessTokenUpdate = this._accessTokenUpdate.bind(this);
		this.state = {
			token: loadToken(),
		}
	}
	_accessTokenUpdate(authInfo){
		console.log("_accessTokenUpdate authInfo",authInfo);
		if(authInfo && authInfo.status >= 1){
			this.setState({
				token: authInfo.data
			});
		}
	}

	shouldComponentUpdate(nextProps,nextState){
		console.log("nextState.token.code === this.state.code && nextState.token.code === -1",nextState.token.code === this.state.token.code && nextState.token.code === -1);
		if(nextState.token.code === this.state.token.code && nextState.token.code === -1) return false;
		return true;
	}

	render(){
		const props = this.props;
		console.log("this.state.token",this.state.token);
		console.log("auth",authToken(this.state.token));
		return (
			<AuthContext.Provider value={authToken(this.state.token)}>
			<AuthContext.Consumer>
				{accessToken => {
					console.log("accessToken",accessToken && accessToken.code <= 0);
					return accessToken && accessToken.code > 0 ?  <Redirect to="/" /> : <Login accessTokenUpdate={this._accessTokenUpdate} accessToken={accessToken.token} {...props} />
				}}
			</AuthContext.Consumer>
			</AuthContext.Provider>
		)
	}
}

export default LoginWrapper;