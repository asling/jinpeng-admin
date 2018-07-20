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
import expensesTypeName from "assets/json/expensesTypeName.json";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import saga from './sagas';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { getExpensesAction } from "./actions";
import { makeSelectExpenses, makeDataLoading } from "./selectors";

class Expenses extends React.Component{
  constructor(props){
    super(props);
    const { match } = props;
    const { params } = match;
    this._expensesFormating = this._expensesFormating.bind(this);
    this.state = {
      page: params.page || 0,
    };
  }

  componentWillMount(){
    const { accessToken, onFetchData } = this.props;
    console.log("props",this.props);
    if(onFetchData && accessToken && accessToken.jwt) onFetchData(accessToken.jwt);
  }

  _expensesFormating(expenses){
    return expenses && expenses.status > 0 && expenses.data.length > 0 ? expenses.data.map( item => {
      return {type: expensesTypeName[item.type]['name'], price: item.price , customer_id: item.customer_id, created_at: item.created_at.split(".")[0], message: item.message};
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
    const { expenseList, classes } = this.props;
    const { page } = this.state;
    const expenseListFormat = this._expensesFormating(expenseList);
    
    const pagination = {
      size: expenseListFormat.length,
      rowsPerPage: 10,
      page,
      onChangePage:this.handleChangePage,
    }
    const emptyRows = pagination.rowsPerPage - Math.min(pagination.rowsPerPage, expenseListFormat.length - page * pagination.rowsPerPage);

    const _makeExpensesTableData = (data) => {
        return data.slice(page * pagination.rowsPerPage, page * pagination.rowsPerPage + pagination.rowsPerPage).map( item => {
                      return [item.type, parseFloat(item.price).toFixed(2), item.customer_id['name'] ? item.customer_id['name'] : '尚无' , item.created_at, item.message];
            })
    }
    const expensesTableData = _makeExpensesTableData(expenseListFormat);

    console.log("expensesTableData",expensesTableData);
    return (
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
              <RegularCard
                headerColor="blue"
                cardTitle="支出列表"
                content={
                  <Table
                    tableHeaderColor="warning"
                    tableHead={[ "支出类型", "支出金额","收方", "创建时间", "附加消息"]}
                    tableData={expensesTableData}
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

Expenses.propTypes = {
  classes: PropTypes.object.isRequired,
  expenseList: PropTypes.object,
  accessToken: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    onFetchData: (token) => {
      dispatch(getExpensesAction({token}));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  expenseList: makeSelectExpenses(),
  dataLoading: makeDataLoading(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'expenses', reducer });
const withSaga = injectSaga({ key: 'expenses', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(withStyles(emploeesStyle)(Expenses));





