import React from "react";
import { Grid, withStyles, InputLabel, Select } from "material-ui";
import PropTypes from 'prop-types';

import {
  RegularCard,
  Button,
  CustomInput,
  ItemGrid,
} from "components";
import { Cached } from "@material-ui/icons";
import MsgDialog from "components/CustomDialogs/MsgDialog";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import saga from './sagas';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { getEmployeeDetailAction, createEmployeeAction, updateEmployeeAction,cancelCreatedAction, cancelUpdatedAction } from "./actions";
import { makeSelectEmployeeDetail, makeDataLoading, makeSelectUpdating, makeSelectCreating, makeSelectEmployeeCreated } from "./selectors";

import MenuItem from 'material-ui/Menu/MenuItem';
import FormControl from 'material-ui/Form/FormControl';
import TextField from 'material-ui/TextField';
import employeesDetailStyle from "assets/jss/material-dashboard-react/employeesDetailStyle.jsx";
import employeesTitleName from "assets/json/employeesTitleName.json";


class EmployeeDetail extends React.Component{
  constructor(props,context){
    super(props,context);
    const { match } = props;
    const { params } = match;
    this.state = {
      name: '',
      phone: '',
      title: '',
      _id: params.id,
    };
    this.handleChange = this.handleChange.bind(this);
    this.createHandler = this.createHandler.bind(this);
    this.updateHandler = this.updateHandler.bind(this);
  }

  componentWillMount(){
    const { accessToken, onFetchDatas } = this.props;
    // const { router } = this.context || {};
    // const { route } = router || {};
    // const { match } = route || {};
    // const { params } = match || {};
    // const { id } = params || {};
    if(this.state._id > 0 && onFetchDatas && accessToken && accessToken.jwt){
      onFetchDatas(accessToken.jwt,this.state._id);
    }
  }

  componentWillReceiveProps(next){
    const { employeeDetail } = next;
    const employeeData = (employeeDetail && parseInt(employeeDetail.status, 10) === 1 && employeeDetail.data) || {};
    this.setState({
      name: employeeData.name,
      phone: employeeData.phone,
      title: employeeData.title,
    });
  }

  createHandler(event){
    const { createEmployee, accessToken } = this.props;
    const { name, phone, title } = this.state;
    const formData = {
      name,
      phone,
      title,
    };
    createEmployee(accessToken.jwt, formData);
  }

  handleChange(event){
    const newValue = event.target.value;
    this.setState({
      title: newValue
    });
  }


  updateHandler(event){
    const { updateEmployee, accessToken } = this.props;
    const { _id, name, phone, title } = this.state;
    const formData = {
      name,
      phone,
      title,
    };

    updateEmployee(accessToken.jwt,  _id, formData);
  }


  render(){
    const { classes, updating, employeeUpdated, creating, employeeCreated, cancelUpdated, cancelCreated } = this.props;
    const { name, phone, title, _id } = this.state;
    console.log("employeeUpdated", employeeUpdated);
    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <RegularCard
              cardTitle={_id ? `修改员工 ${name} 信息` : '添加员工'}
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
                          shrink: !!name
                        }}
                        inputProps={{
                          autoComplete: 'off',
                          value: name,
                          onChange: (e) => {
                            this.setState({
                              name: e.target.value,
                            });
                          }
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
                          shrink: !!phone
                        }}
                        inputProps={{
                          autoComplete: 'off',
                          value: phone,
                          onChange: (e) => {
                            this.setState({
                              phone: e.target.value,
                            });
                          }
                        }}
                      />
                    </ItemGrid>
                  </Grid>
                  <Grid container>
                    <ItemGrid xs={12} sm={12} md={12}>
                      <FormControl fullWidth={true} className={classes.formControl}>
                        <InputLabel htmlFor="age-simple">公司职位</InputLabel>
                        <Select
                          value={title+""}
                          onChange={this.handleChange}
                          inputProps={{
                            name: 'title',
                            id: 'title-simple',
                          }}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {Object.keys(employeesTitleName).map( item => {
                            return <MenuItem key={item} value={item}>{employeesTitleName[item]['name']}</MenuItem>
                          })}
                        </Select>
                      </FormControl>
                    </ItemGrid>
                  </Grid> 
                </div>
              }
              footer={_id ? 
                <Button disabled={updating} onClick={this.updateHandler} color="primary">{updating ? <Cached /> : 'Update Employee'}</Button> : 
                <Button disabled={creating} onClick={this.createHandler} color="primary">{creating ? <Cached /> : 'Create Employee'}</Button>
                }
            />
          </ItemGrid>
        </Grid>
        {employeeCreated && <MsgDialog msg="新增成功!可以点击员工管理进行查看" open={employeeCreated} handleClose={() => {
          cancelCreated();
        }} />}
        {employeeUpdated && <MsgDialog msg="修改成功！" open={true} handleClose={()=>{
          cancelUpdated();
        }} /> }
      </div>
    );
  }
}

EmployeeDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  employeeDetail: PropTypes.object,
  accessToken: PropTypes.object,
  creating: PropTypes.bool,
  updating: PropTypes.bool,
};

EmployeeDetail.contextTypes = {
  router: PropTypes.object,
}

export function mapDispatchToProps(dispatch) {
  return {
    onFetchDatas: (token,id) => {
      dispatch(getEmployeeDetailAction({token,id}));
    },
    updateEmployee: (token,id,formData) => {
      dispatch(updateEmployeeAction({token,id,formData}));
    },
    createEmployee: (token, formData) => {
      dispatch(createEmployeeAction({token,formData}));
    },
    cancelCreated: () => {
      dispatch(cancelCreatedAction());
    },
    cancelUpdated: () => {
      dispatch(cancelUpdatedAction());
    }
  };
}

const mapStateToProps = createStructuredSelector({
  employeeDetail: makeSelectEmployeeDetail(),
  dataLoading: makeDataLoading(),
  updating: makeSelectUpdating(),
  creating: makeSelectCreating(),
  employeeCreated: makeSelectEmployeeCreated(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'employees', reducer });
const withSaga = injectSaga({ key: 'employees', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(withStyles(employeesDetailStyle)(EmployeeDetail));

