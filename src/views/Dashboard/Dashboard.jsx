import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
import {
  ContentCopy,
  Store,
  InfoOutline,
  Warning,
  DateRange,
  LocalOffer,
  Update,
  ArrowUpward,
  AccessTime,
  Accessibility
} from "@material-ui/icons";
import { withStyles, Grid } from "material-ui";
import { AuthContext, loadToken, authToken } from "providers/Auth";
import {
  StatsCard,
  ChartCard,
  TasksCard,
  RegularCard,
  Table,
  ItemGrid
} from "components";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts";

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import saga from './sagas';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import dashboardStyle from "assets/jss/material-dashboard-react/dashboardStyle";

import { getDashboardCustomersAction, getDashboardExpensesAction } from "./actions";

import { makeDashboardLoading, makeDashboardCustomers, makeDashboardExpenses } from "./selectors";


class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this._customersFormating = this._customersFormating.bind(this);
    this._expensesFormating = this._expensesFormating.bind(this);
    this.token = false;
  }

  componentWillMount(){
    console.log("this.token",this.token);
    // const { onLoad } = this.props;
    // onLoad && onLoad();
  }

  _customersFormating(customers){
    console.log("customers",customers);
    return  [];
  }

  _expensesFormating(expenses){
    console.log("expenses",expenses);
    return [];
  }

  _getToken(accessToken){
    return accessToken && accessToken.code > 0 ?  accessToken.token : false;
  }
  
  render() {
    const { customers, expenses } = this.props;
    const numbers = 1;
    const customersFormat = this._customersFormating(customers);
    const expensesFormat = this._expensesFormating(expenses);
    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={6}>
            <RegularCard
              headerColor="purple"
              cardTitle="近期新增用户"
              cardSubtitle={`显示最近个${numbers}`}
              content={
                <Table
                  tableHeaderColor="warning"
                  tableHead={[ "用户名", "电话号码", "注册时间"]}
                  tableData={customersFormat.map( item => {
                    return [item.name, item.phone, item.created_at];
                  })}
                />
              }
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={6}>
            <RegularCard
              headerColor="orange"
              cardTitle="近期新增支出"
              cardSubtitle={`显示最近个${numbers}`}
              content={
                <Table
                  tableHeaderColor="warning"
                  tableHead={["支付金额", "支出类型", "支出时间"]}
                  tableData={expensesFormat.map( item => {
                    return [item.price, item.type, item.created_at];
                  })}
                />
              }
            />
          </ItemGrid>
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  expenses: PropTypes.object,
  customers: PropTypes.object,
};

Dashboard.contextTypes = {
  router: PropTypes.object,
}

export function mapDispatchToProps(dispatch) {
  return {
    onLoad: (token) => {
      dispatch(getDashboardCustomersAction(token));
      dispatch(getDashboardExpensesAction(token));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  expenses: makeDashboardExpenses(),
  customers: makeDashboardCustomers(),
  dataLoading: makeDashboardLoading(),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'dashboard', reducer });
const withSaga = injectSaga({ key: 'dashboard', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(withStyles(dashboardStyle)(Dashboard));
// export default connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Dashboard));

 