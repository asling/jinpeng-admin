import React from "react";
import { Grid } from "material-ui";
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import customerDetailStyle from "asset/jss/material-dashboard-react/customerDetailStyle.jsx";

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import saga from './sagas';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { getCustomerDetailAction } from "./actions";
import { makeSelectCustomerDatail } from "./selectors";

class CustomerDetail extends React.Component{
  constructor(props){
    super(props);
  }

  componentWillMount(){
    const { accessToken, onFetchDatas } = this.props;
    if(onFetchDatas && accessToken && accessToken.jwt) onFetchDatas(accessToken.jwt);
  }

  render(){
    const { customers, classes } = this.props;
    return (
      <div>
        CustomerDetail
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  customers: PropTypes.object,
  accessToken: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    onFetchDatas: (token) => {
      dispatch()
    },
  };
}

const mapStateToProps = createStructuredSelector({
  customers: makeCustomers(),
  dataLoading: makeDataLoading(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'customers', reducer });
const withSaga = injectSaga({ key: 'customers', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(withStyles(customerDetailStyle)(CustomerDetail));

