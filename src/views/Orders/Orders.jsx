import React from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  Grid,
  TableRow,
  TableCell,
  IconButton,
} from "material-ui";
import { Edit } from "@material-ui/icons";
import { RegularCard, Table, ItemGrid } from "components";
import emploeesStyle from "assets/jss/material-dashboard-react/emploeesStyle";  
import ordersStatusName from "assets/json/ordersStatusName.json";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import saga from './sagas';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { getOrdersAction } from "./actions";
import { makeSelectOrders, makeDataLoading } from "./selectors";

class Orders extends React.Component{
  constructor(props){
    super(props);
    const { match } = props;
    const { params } = match;
    this._ordersFormating = this._ordersFormating.bind(this);
    this.state = {
      page: params.page || 0,
    };
  }

  componentWillMount(){
    const { accessToken, onFetchData } = this.props;
    console.log("props",this.props);
    if(onFetchData && accessToken && accessToken.jwt) onFetchData(accessToken.jwt);
  }

  _ordersFormating(orders){
    return orders && orders.status > 0 && orders.data.length > 0 ? orders.data.map( item => {
      return { price: item.price , status: ordersStatusName[item.status] && ordersStatusName[item.status]['name'], customer_id: item.customer_id, created_at: item.created_at.split(".")[0], rebate: item.rebate};
    }) : [];
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
    const { orderList, classes } = this.props;
    const { page } = this.state;
    const orderListFormat = this._ordersFormating(orderList);
    
    const pagination = {
      size: orderListFormat.length,
      rowsPerPage: 10,
      page,
      onChangePage:this.handleChangePage,
    }
    const emptyRows = pagination.rowsPerPage - Math.min(pagination.rowsPerPage, orderListFormat.length - page * pagination.rowsPerPage);

    const _makeOrdersTableData = (data) => {
        return data.slice(page * pagination.rowsPerPage, page * pagination.rowsPerPage + pagination.rowsPerPage).map( item => {
                      return [parseFloat(item.price).toFixed(2), item.status , item.customer_id['name'] ? item.customer_id['name'] : '尚无' , item.created_at, item.rebate ? item.rebate : '无'];
            })
    }
    const ordersTableData = _makeOrdersTableData(orderListFormat);

    console.log("ordersTableData",ordersTableData);
    return (
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
              <RegularCard
                headerColor="blue"
                cardTitle="支出列表"
                content={
                  <Table
                    tableHeaderColor="warning"
                    tableHead={["订单金额","订单状态","付款方", "创建时间", "折扣"]}
                    tableData={ordersTableData}
                    emptyRows={emptyRows}
                    tablePagination={pagination}
                  />
                }
              />
        </ItemGrid>
      </Grid>
    );
  }
}

Orders.propTypes = {
  classes: PropTypes.object.isRequired,
  orderList: PropTypes.object,
  accessToken: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    onFetchData: (token) => {
      dispatch(getOrdersAction({token}));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  orderList: makeSelectOrders(),
  dataLoading: makeDataLoading(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'orders', reducer });
const withSaga = injectSaga({ key: 'orders', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(withStyles(emploeesStyle)(Orders));





