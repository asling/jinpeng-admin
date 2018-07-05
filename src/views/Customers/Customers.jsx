import React from "react";
import {
  withStyles,
  Grid,
  TableRow,
  TableCell,
  IconButton,
} from "material-ui";
import { Edit } from "@material-ui/icons";
import { RegularCard, Table, ItemGrid } from "components";
import customersStyle from "assets/jss/material-dashboard-react/customersStyle";  


import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import saga from './sagas';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { getCustomersAction } from "./actions";
import { makeSelectCustomers, makeDataLoading } from "./selectors";

class Customers extends React.Component{
  constructor(props){
    super(props);
    this._customersFormating = this._customersFormating.bind(this);
    this._toCustomerDetail = this._toCustomerDetail.bind(this);
  }

  componentWillMount(){
    const { accessToken, onFetchCustomers } = this.props;
    console.log("props",this.props);
    if(onFetchCustomers && accessToken && accessToken.jwt) onFetchCustomers(accessToken.jwt);
  }

  _customersFormating(customers){
    console.log("customers",customers);
    return customers && customers.status > 0 && customers.data.length > 0 ? customers.data.map( item => {
      return {name: item.name, phone: item.phone , employee:item.employee_id ? item.employee_id.name : '暂无', created_at: item.created_at.split(".")[0], id: item.id};
    }) : [];
  }

  _toCustomerDetail(id){
    const { history } = this.props;
    const destinationPath =  `/customers/${id}`;
    history.push(destinationPath);
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  }

  _makeEmptyRows(emptyRows){
    return emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              );
  }

  render(){
    const { customerList, classes } = this.props;
    const { page } = this.state;
    const customersFormat = this._customersFormating(customerList);
   
    const pagination = {
      size: customersFormat.length,
      rowsPerPage: 10,
      page,
      onChangePage:this.handleChangePage,
    }
    const emptyRows = pagination.rowsPerPage - Math.min(pagination.rowsPerPage, customersFormat.length - page * pagination.rowsPerPage);
    const emptyRowNodes = this._makeEmptyRows(emptyRows);

    return (
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
              <RegularCard
                headerColor="purple"
                cardTitle="用户列表"
                cardSubtitle={`一次显示${pagination.rowsPerPage}个用户数据`}
                content={
                  <Table
                    tableHeaderColor="warning"
                    tableHead={[ "用户名", "电话号码","所属员工", "注册时间", "操作"]}
                    tableData={customersFormat.slice(page * pagination.rowsPerPage, page * pagination.rowsPerPage + pagination.rowsPerPage).map( item => {
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
                    }).concat(emptyRowNodes)}
                  />
                }
              />
        </ItemGrid>
      </Grid>
    );
  }
}
export function mapDispatchToProps(dispatch) {
  return {
    onFetchCustomers: (token) => {
      dispatch(getCustomersAction({token}));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  customerList: makeSelectCustomers(),
  dataLoading: makeDataLoading(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'customers', reducer });
const withSaga = injectSaga({ key: 'customers', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(withStyles(customersStyle)(Customers));





