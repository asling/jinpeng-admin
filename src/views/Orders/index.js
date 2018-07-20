import React from 'react';
import { AuthContext, loadToken, authToken } from "providers/Auth";
import Orders from "./Orders.jsx";
class OrdersWrapper extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			token: loadToken(),
		}
	}

	shouldComponentUpdate(nextProps,nextState){
		if(nextState.token.code === this.state.token.code && nextState.token.code === -1) return false;
		return true;
	}

	render(){
		const props = this.props;
		return (
				<AuthContext.Consumer>
					{accessToken => {
						return accessToken && accessToken.code <= 0 ? <Orders {...props} /> : <Orders accessToken={accessToken.token} {...props} />;
					}}
				</AuthContext.Consumer>
		)
	}
}

export default OrdersWrapper;