import React from "react";
import { Grid, withStyles, InputLabel } from "material-ui";
import PropTypes from 'prop-types';

import {
  RegularCard,
  Button,
  CustomInput,
  ItemGrid
} from "components";

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import saga from './sagas';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { getCustomerDetailAction, getEmployeesSuggestion } from "./actions";
import { makeSelectCustomerDetail, makeDataLoading, makeSelectEmployeesSuggestion } from "./selectors";

import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import customerDetailStyle from "assets/jss/material-dashboard-react/customerDetailStyle.jsx";
import AutoComplete from "components/AutoComplete";

class CustomerDetail extends React.Component{
  constructor(props,context){
    super(props,context);
  }

  componentWillMount(){
    const { accessToken, onFetchDatas } = this.props;
    const { router } = this.context || {};
    const { route } = router || {};
    const { match } = route || {};
    const { params } = match || {};
    const { id } = params || {};
    if(id > 0 && onFetchDatas && accessToken && accessToken.jwt){
      onFetchDatas(accessToken.jwt,id);
    }
  }

  render(){
    const { customerDetail, classes, employeesSuggestion } = this.props;
    console.log("employeesSuggestion",employeesSuggestion);
    console.log("customerDetail",customerDetail);
    const customerData = (customerDetail && parseInt(customerDetail.status, 10) === 1 && customerDetail.data) || {};
    const employee = customerData.employee_id ? customerData.employee_id.name : "";
    const employeesSuggestionData = (employeesSuggestion && parseInt(employeesSuggestion.status, 10) === 1 && employeesSuggestion.data) || null;
    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <RegularCard
              cardTitle={`Edit Customer ${customerData.name}`}
              content={
                <div>
                  <Grid container>
                    <ItemGrid xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="用户名"
                        id="name"
                        formControlProps={{
                          fullWidth: true
                        }}
                        labelProps={{
                          shrink: !!customerData.name
                        }}
                        inputProps={{
                          autoComplete: 'off',
                          value: customerData.name
                        }}
                      />
                    </ItemGrid>
                    
                  </Grid>
                  <Grid container>
                    <ItemGrid xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="电话号码"
                        id="phone"
                        formControlProps={{
                          fullWidth: true
                        }}
                        labelProps={{
                          shrink: !!customerData.phone
                        }}
                        inputProps={{
                          autoComplete: 'off',
                          value: customerData.phone
                        }}
                      />
                    </ItemGrid>
                  </Grid>
                  <Grid container>
                    <ItemGrid xs={12} sm={12} md={12}>
                      {employeesSuggestionData && <AutoComplete suggestions={employeesSuggestionData} selectedValue={employee} />}
                    </ItemGrid>
                  </Grid> 
                </div>
              }
              footer={<Button color="primary">Update Profile</Button>}
            />
          </ItemGrid>
        </Grid>
        
      </div>
    );
  }
}

CustomerDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  customers: PropTypes.object,
  accessToken: PropTypes.object,
};

CustomerDetail.contextTypes = {
  router: PropTypes.object,
}

export function mapDispatchToProps(dispatch) {
  return {
    onFetchDatas: (token,id) => {
      dispatch(getCustomerDetailAction({token,id}));
      dispatch(getEmployeesSuggestion(token));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  customerDetail: makeSelectCustomerDetail(),
  dataLoading: makeDataLoading(),
  employeesSuggestion: makeSelectEmployeesSuggestion(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'customers', reducer });
const withSaga = injectSaga({ key: 'customers', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(withStyles(customerDetailStyle)(CustomerDetail));

