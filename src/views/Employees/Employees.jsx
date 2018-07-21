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
import employeesTitleName from "assets/json/employeesTitleName.json";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import saga from './sagas';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { getEmployeesAction } from "./actions";
import { makeSelectEmployees, makeDataLoading } from "./selectors";

class Emploees extends React.Component{
  constructor(props){
    super(props);
    const { match } = props;
    const { params } = match;
    this._employeesFormating = this._employeesFormating.bind(this);
    this._toEmployeeDetail = this._toEmployeeDetail.bind(this);
    this.state = {
      page: params.page || 0,
    };
  }

  componentWillMount(){
    const { accessToken, onFetchCustomers } = this.props;
    console.log("props",this.props);
    if(onFetchCustomers && accessToken && accessToken.jwt) onFetchCustomers(accessToken.jwt);
  }

  _employeesFormating(employees){
    return employees && employees.status > 0 && employees.data.length > 0 ? employees.data.map( item => {
      return {name: item.name, phone: item.phone , title: employeesTitleName[item.title] && employeesTitleName[item.title]['name'], created_at: item.created_at.split(".")[0], id: item.id};
    }) : [];
  }

  _toEmployeeDetail(id){
    const { history } = this.props;
    const destinationPath =  `/employees/${id}`;
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
    const { employeeList, classes } = this.props;
    const { page } = this.state;
    const employeesFormat = this._employeesFormating(employeeList);
    
    const pagination = {
      size: employeesFormat.length,
      rowsPerPage: 10,
      page,
      onChangePage:this.handleChangePage,
    }
    const emptyRows = pagination.rowsPerPage - Math.min(pagination.rowsPerPage, employeesFormat.length - page * pagination.rowsPerPage);

    const _makeEmployeesTableData = (data) => {
        return data.slice(page * pagination.rowsPerPage, page * pagination.rowsPerPage + pagination.rowsPerPage).map( item => {
                      return [item.name, item.phone, item.title, item.created_at,(<IconButton
                      aria-label="Edit"
                      className={classes.tableActionButton}
                      href={`/employees/${item.id}`}
                      onClick={(e) => {this._toEmployeeDetail(item.id)}}
                    >
                      <Edit
                        className={
                          classes.tableActionButtonIcon + " " + classes.edit
                        }
                      />
                    </IconButton>)];
            })
    }
    console.log("data.slice(page * pagination.rowsPerPage, page * pagination.rowsPerPage + pagination.rowsPerPage)",employeesFormat.slice(page * pagination.rowsPerPage, page * pagination.rowsPerPage + pagination.rowsPerPage));
    const employeesTableData = _makeEmployeesTableData(employeesFormat);

    console.log("employeesTableData",employeesTableData);
    return (
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
              <RegularCard
                headerColor="orange"
                cardTitle="员工列表"
                content={
                  <Table
                    tableHeaderColor="warning"
                    tableHead={[ "员工名", "电话号码","公司职位", "注册时间", "操作"]}
                    tableData={employeesTableData}
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

Emploees.propTypes = {
  classes: PropTypes.object.isRequired,
  employeeList: PropTypes.object,
  accessToken: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    onFetchCustomers: (token) => {
      dispatch(getEmployeesAction({token}));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  employeeList: makeSelectEmployees(),
  dataLoading: makeDataLoading(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'employees', reducer });
const withSaga = injectSaga({ key: 'employees', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(withStyles(emploeesStyle)(Emploees));





