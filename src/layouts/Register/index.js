import React from 'react';
import { AuthContext } from "providers/Auth";
import { Redirect } from "react-router-dom";
import Register from "./Register";
class RegisterWrapper extends React.PureComponent{

	render(){
		const props = this.props;
		return (
			<AuthContext.Consumer>
				{accessToken => {
					console.log("accessToken",accessToken);
					return accessToken && accessToken.token ?  <Redirect to="/" /> : <Register {...props} />
				}}
			</AuthContext.Consumer>
		)
	}
}

export default RegisterWrapper;