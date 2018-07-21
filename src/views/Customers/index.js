import React from 'react';
import { AuthContext, loadToken, authToken } from "providers/Auth";
import Customers from "./Customers.jsx";
import CustomerDetail from "./CustomerDetail.jsx";
class CustomersWrapper extends React.Component{
	constructor(props){
		console.log("CustomersWrapper");
		super(props);
		this.state = {
			token: loadToken(),
		}
	}

	shouldComponentUpdate(nextProps,nextState){
		console.log("nextState.token.code === this.state.code && nextState.token.code === -1",nextState.token.code === this.state.token.code && nextState.token.code === -1);
		if(nextState.token.code === this.state.token.code && nextState.token.code === -1) return false;
		return true;
	}

	_renderCustomers(props){
		return <Customers {...props} />;
	}

	_renderCustomerDetail(props){
		return <CustomerDetail {...props} />;
	}

	render(){
		const props = this.props;
		const { match } = props;
		const { params } = match;
		return (
				<AuthContext.Consumer>
					{accessToken => {
						console.log("accessToken Customers",accessToken);
						console.log("Customers params",params);
						let propsFormat = props;
						if(accessToken && accessToken.code > 0){
							propsFormat = Object.assign({},props,{accessToken:accessToken.token});
						}
						if(params && parseInt(params.id,10) > 0){
							return this._renderCustomerDetail(propsFormat);
						}else{
							return this._renderCustomers(propsFormat);
						}
						// return accessToken && accessToken.code <= 0 ? params.id && params.id > 0 ?  : <Customers {...props} /> : <Customers accessToken={accessToken.token} {...props} />;
					}}
				</AuthContext.Consumer>
		)
	}
}


export default CustomersWrapper;