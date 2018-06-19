import React from 'react';
import { AuthContext } from "providers/Auth";
import { Redirect } from "react-router-dom";
import Login from "./Login";
class LoginWrapper extends React.PureComponent{

	render(){
		const props = this.props;
		return (
			<AuthContext.Consumer>
				{accessToken => {
					console.log("accessToken",accessToken);
					return accessToken && accessToken.token ?  <Redirect to="/" /> : <Login {...props} />
				}}
			</AuthContext.Consumer>
		)
	}
}

export default LoginWrapper;