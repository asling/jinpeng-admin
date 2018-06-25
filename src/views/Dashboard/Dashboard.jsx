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
  Accessibility,
  Edit,
} from "@material-ui/icons";
import { withStyles, Grid, IconButton } from "material-ui";
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
    this._toExpenseDetail = this._toExpenseDetail.bind(this);
    this._toCustomerDetail = this._toCustomerDetail.bind(this);
    this.expenseType = {
      1: '红包',
      2: '企业结账',
    };
  }  

  componentWillMount(){
    const { accessToken, onFetchDatas } = this.props;
    console.log("props",this.props);
    if(onFetchDatas && accessToken && accessToken.jwt) onFetchDatas(accessToken.jwt);
  }

  _toExpenseDetail(id){
    const { history } = this.props;
    const destinationPath =  `/customers/${id}`;
    console.log("destinationPath",destinationPath);
    history.push(destinationPath);
  }

  _toCustomerDetail(id){
    const { history } = this.props;
    const destinationPath =  `/expenses/${id}`;
    history.push(destinationPath);
  }

  _expensesFormating(customers){
    console.log("customers",customers);
    return customers && customers.status > 0 && customers.data.length > 0 ? customers.data.map(item => {
      return {price: parseFloat(item.price).toFixed(2),type: this.expenseType[parseInt(item.type,10)],created_at: item.created_at.split(".")[0], id: item.id};
    }) : [];
  }

  _customersFormating(expenses){
    console.log("expenses",expenses);
    return expenses && expenses.status > 0 && expenses.data.length > 0 ? expenses.data.map( item => {
      return {name: item.name, phone: item.phone , employee:item.employee_id ? item.employee_id.name : '暂无', created_at: item.created_at.split(".")[0], id: item.id};
    }) : [];
  }

  _getToken(accessToken){
    return accessToken && accessToken.code > 0 ?  accessToken.token : false;
  }

  componentWillReceiveProps(nextProps){
    // console.log("nextProps",nextProps);
    // const { accessToken } = nextProps;
    // if(accessToken && accessToken.jwt){
    //   this.setState({
    //     token: accessToken.jwt,
    //   });
    // }
  }
  
  render() {
    const { customers, expenses, classes } = this.props;
    const numbers = 1;
    const customersFormat = this._customersFormating(customers);
    const expensesFormat = this._expensesFormating(expenses);

    console.log("customersFormat",customersFormat);
    console.log("expensesFormat",expensesFormat);

    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={6}>
            <RegularCard
              headerColor="purple"
              cardTitle="近期新增用户"
              cardSubtitle={`显示最近个${expensesFormat.length}`}
              content={
                <Table
                  tableHeaderColor="warning"
                  tableHead={[ "用户名", "电话号码","所属员工", "注册时间", "操作"]}
                  tableData={customersFormat.map( item => {
                    return [item.name, item.phone, item.employee, item.created_at,(<IconButton
                    aria-label="Edit"
                    className={classes.tableActionButton}
                    href={`/customers/${item.id}`}
                    // onClick={(e) => {this._toCustomerDetail(item.id)}}
                  >
                    <Edit
                      className={
                        classes.tableActionButtonIcon + " " + classes.edit
                      }
                    />
                  </IconButton>)];
                  })}
                />
              }
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={6}>
            <RegularCard
              headerColor="orange"
              cardTitle="近期新增支出"
              cardSubtitle={`显示最近个${expensesFormat.length}`}
              content={
                <Table
                  tableHeaderColor="warning"
                  tableHead={["支付金额", "支出类型", "支出时间", "操作"]}
                  tableData={expensesFormat.map( item => {
                    return [""+item.price, item.type, item.created_at, (<IconButton
                    aria-label="Edit"
                    className={classes.tableActionButton}
                    href={`/expenses/${item.id}`}
                    // onClick={(e)=>{this._toExpenseDetail(item.id)}}
                  >
                    <Edit
                      className={
                        classes.tableActionButtonIcon + " " + classes.edit
                      }
                    />
                  </IconButton>)];
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
  accessToken: PropTypes.object,
};

Dashboard.contextTypes = {
  router: PropTypes.object,
}

export function mapDispatchToProps(dispatch) {
  return {
    onFetchDatas: (token) => {
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

 