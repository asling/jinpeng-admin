import React from "react";
import {
  withStyles,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TablePagination,
  TableFooter,
  IconButton
} from "material-ui";
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import PropTypes from "prop-types";
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import tableStyle from "assets/jss/material-dashboard-react/tableStyle";
import Pagination from "./Pagination";
class CustomTable extends React.Component {
  
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  }

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  }

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  }

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  }

  render(){
    const { classes, tableHead, tableData, tableHeaderColor, tablePagination, theme } = this.props;
    return (
      <div className={classes.tableResponsive}>
        <Table className={classes.table}>
          {tableHead !== undefined ? (
            <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
              <TableRow>
                {tableHead.map((prop, key) => {
                  return (
                    <TableCell
                      className={classes.tableCell + " " + classes.tableHeadCell}
                      key={key}
                    >
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
          ) : null}
          <TableBody>
            {tableData.map((prop, key) => {
              return (
                <TableRow key={key}>
                  {prop.map((prop, key) => {
                    return (
                      <TableCell className={classes.tableCell} key={key}>
                        {prop}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            {tablePagination ? <TablePagination
                    colSpan={2}
                    count={tablePagination.size}
                    rowsPerPage={tablePagination.rowsPerPage}
                    page={tablePagination.page}
                    onChangePage={tablePagination.onChangePage}
                    ActionsComponent={(<div className={classes.root}>
                      <IconButton
                        onClick={this.handleFirstPageButtonClick}
                        disabled={tablePagination.page === 0}
                        aria-label="First Page"
                      >
                        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                      </IconButton>
                      <IconButton
                        onClick={this.handleBackButtonClick}
                        disabled={tablePagination.page === 0}
                        aria-label="Previous Page"
                      >
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                      </IconButton>
                      <IconButton
                        onClick={this.handleNextButtonClick}
                        disabled={tablePagination.page >= Math.ceil(tablePagination.size / tablePagination.rowsPerPage) - 1}
                        aria-label="Next Page"
                      >
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                      </IconButton>
                      <IconButton
                        onClick={this.handleLastPageButtonClick}
                        disabled={tablePagination.page >= Math.ceil(tablePagination.size / tablePagination.rowsPerPage) - 1}
                        aria-label="Last Page"
                      >
                        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                      </IconButton>
                    </div>)} ></TablePagination> : false }
          </TableFooter>
        </Table>
      </div>
    );
  }
  
}



CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string,PropTypes.object]))),
  tablePagination: PropTypes.instanceOf(Pagination)
};

export default withStyles(tableStyle, { withTheme: true })(CustomTable);
