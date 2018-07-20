import React from 'react';
import { AuthContext, loadToken, authToken } from "providers/Auth";
import Employees from "./Employees.jsx";
import EmployeeDetail from "./EmployeeDetail.jsx";
class EmployeesWrapper extends React.Component{
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

	_renderEmployees(props){
		return <Employees {...props} />;
	}

	_renderEmployeeDetail(props){
		return <EmployeeDetail {...props} />;
	}

	render(){
		const props = this.props;
		const { match } = props;
		const { params } = match;
		return (
				<AuthContext.Consumer>
					{accessToken => {
						let propsFormat = props;
						if(accessToken && accessToken.code > 0){
							propsFormat = Object.assign({},props,{accessToken:accessToken.token});
						}
						if((params && parseInt(params.id,10) > 0) || match.url === '/employee'){
							return this._renderEmployeeDetail(propsFormat);
						}else{
							return this._renderEmployees(propsFormat);
						}
					}}
				</AuthContext.Consumer>
		)
	}
}


export default EmployeesWrapper;