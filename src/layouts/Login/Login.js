/*
 *
 * Sign
 *
 */

import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Logo from "components/Logo";
import { withStyles } from "material-ui/styles";
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import styled from 'styled-components';
import Tooltip from 'material-ui/Tooltip';
import { Link } from "react-router-dom";
import { LinearProgress } from 'material-ui/Progress';
//global data
import { makeGlobalAuthLoading,makeGlobalLoginError, makeGlobalAuthInfo } from '../selectors';
import { loginAction,loginErrorCancelAction } from '../actions';
import ErrorDialog from "components/CustomDialogs/ErrorDialog.jsx"; 
function styles(themes){
  return {
    container:{
      // display: 'flex',
      margin: '20px auto',
      width: '80%',
    },
    logoClassName: {
      width: 72,
      height: 72,
    },
    title: {
      textAlign: 'center',
      fontSize: '1.5em',
    },
    tooltip: {
      marginTop: 16,
      marginBottom: 8,
      float: 'right',
    }
  }
}
const LogoWrapper = styled(Link)`
  text-align: center;
`;
const WarnningDialog = (props) => {
  const { content,title, ...others } = props;
  console.log("props",props);
  return (
    <ErrorDialog content={content || "Sorry, something wrong."} title="Warnning" {...others}> </ErrorDialog> 
  );
}



export class Login extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    this._errorHandler = this._errorHandler.bind(this);
    this._successHandler = this._successHandler.bind(this);
    this.password = null , this.username = null;
    this.usernameST = null, this.passwordST = null;
    this.authContext = null;
    this.state = {
      usernameField: {
        error:false,
        label: null,
        required: true,
        name: 'usernameField',
        id: "username",
        value: "",
        dirty: false
      },
      passwordField: {
        error: false,
        label: null,
        required:true,
        id: 'password',
        name: 'passwordField',
        value: "",
        dirty: false,
      }
    };


  }

  fieldValidator(){
    const _conditionArr = [];
    let root;
    return {
      at: function at(obj){
        if(Object.prototype.toString.apply(obj) !== '[object Object]') return new Error("sorry, param \'obj\' must be Object type");
        root = obj;
        return this;
      },
      add: function add(conditioner){
        if(Object.prototype.toString.apply(conditioner) !== '[object Function]') return false;
        const condition = conditioner(root);
        _conditionArr.push(condition);
        return this;
      },
      validate: function validate(value){
        var result = _conditionArr.some((cond,key) => {
          return !cond || !cond.call(null,value);
        });
        return !result;
      },
    }
  }

  _notEmptyG(failCallback,successCallback){
    failCallback = failCallback != null && Object.prototype.toString.apply(failCallback) === '[object Function]' ? failCallback : typeof failCallback === 'string' ? new Function("return failCallback") : new Function("return \'\'");
    successCallback = successCallback && Object.prototype.toString.apply(successCallback) === '[object Function]' ? successCallback : typeof successCallback === 'string' ? new Function("return successCallback") : new Function("return \'\'");
    return function condition(field){
      if(Object.prototype.toString.apply(field) !== '[object Object]') return new Error("Wrong!");
      return function f(string){
        const result = string === "" ? false : true;
        if(result){
          successCallback(field);
        }else{
          failCallback(field);
        }
        return result
      };
    }
  }

  _emailFormatG(failCallback,successCallback){
    failCallback = failCallback != null && Object.prototype.toString.apply(failCallback) === '[object Function]' ? failCallback : typeof failCallback === 'string' ? new Function("return failCallback") : new Function("return \'\'");
    successCallback = successCallback && Object.prototype.toString.apply(successCallback) === '[object Function]' ? successCallback : typeof successCallback === 'string' ? new Function("return successCallback") : new Function("return \'\'");
    
    return function condition(field){
      if(Object.prototype.toString.apply(field) !== '[object Object]') return new Error("Wrong!");
      return function f(string){
        const result = string.indexOf("@") > 0;
        if(result){
          successCallback(field);
        }else{
          failCallback(field);
        }
        return result;
      };
    };
  }

  _getSize(c) {
    let size = 0;
    if(!c) return size;
    if(typeof c !== 'string') return size + 1;
    for(let i of c){
      size++;
    } 
    return size;
  }

  _invalidSizeG(to,successCallback,failCallback){
    return function(value){
      let size = this._getSize(this._stringFormatter(value));
      if(size < to) return false;
      return true;
    }
  }

  //we can use field obj;
  _errorHandler(str){
    
    const self = this;
    if(typeof str !== 'string') return new Error("sorry must be string data");
    return function(field){
      field.error = true;
      field.label = str;
      self.setState({
        [field.name]:Object.assign({},field),
      });
    }
  }

  _successHandler(){
    const self = this;
    return function(field){
      field.error = false;
      field.label = "";
      self.setState({
        [field.name]:Object.assign({},field),
      });
    }
  }

  formSubmit(event){
    const formData = {
      username: this.username.value,
      password: this.password.value,
    };
    const { login } = this.props;
    // console.log("formData",formData);
    login && login(formData);
    event.preventDefault();


  }

  componentWillMount(){
    const { usernameField, passwordField } = this.state;
    const checkEmpty = this._notEmptyG(this._errorHandler("Please fill in your account's username"),this._successHandler());
    const checkUserFormat = this._emailFormatG(this._errorHandler("Username is email"),this._successHandler());
    const checkPassEmpty = this._notEmptyG(this._errorHandler("Please fill in your password"),this._successHandler());
    this.textFieldValidate = this.fieldValidator().at(usernameField);
    this.passwordFieldValidate = this.fieldValidator().at(passwordField);
    this.textFieldValidate.add(checkEmpty).add(checkUserFormat);
    this.passwordFieldValidate.add(checkPassEmpty);

    // console.log("login",this.props.login);

    // this.props.login();

  }

  componentDidMount(){
 
    // console.log("this.context.auth",this.context.auth);
  }

  componentDidUpdate(){
    // const { auth } = this.context;
    // console.log("componentDidUpdate auth",auth);
    // // console.log("this.authContext",this.authContext);
    // // const auth = this.context.auth && this.context.auth.auth;
    // if(auth){
    //   // console.log("auth",auth);
    //   const authObj = auth.auth;
    //   // console.log("auth.auth",authObj && authObj.status && authObj.status > 0);
    //   if(authObj && authObj.status && authObj.status > 0  && this.authContext == null){
    //     this.authContext = authObj;
    //     const { router } = this.props;
    //     router.replace("/");
    //   }
    //   this.setState({
    //     warnningString: this._differLoginStatus(authObj),
    //   });
    // }
  }

  _differLoginStatus(authInfo){
    if(!authInfo || authInfo.status == null) return false;
    if(authInfo.status === -1){
        return "Login Failed.Username or Password Error!";
    }else{  
        return false;
    } 
  }




  render() {
    const { classes, authLoading, loginError, authInfo, accessTokenUpdate } = this.props;
    console.log("authInfo",authInfo);
    accessTokenUpdate(authInfo);
    // const auth = this.context.auth && this.context.auth.auth;
    // if(auth){
    //   console.log("auth",auth);
    //   const authObj = auth.auth;
    //   console.log("auth.auth",authObj);
    //   if(authObj && authObj.status && authObj.status > 0){
    //     const { router } = this.props;
    //     router.replace("/");
    //   }
    // }
    console.log("loginError",loginError);
    const warnningString = this._differLoginStatus(authInfo);
    console.log("warnningString",warnningString);
    const { usernameField, passwordField } = this.state;
    const submitEnabled = (!(usernameField.dirty && !usernameField.error ) ||  !(passwordField.dirty && !passwordField.error));
    return (
      <div className={classes.container} >
        <LogoWrapper to="/">
        <Logo className={classes.logoClassName} />
        </LogoWrapper>
        <h1 className={classes.title}>Please login</h1>
        <form onSubmit={this.formSubmit} noValidate autoComplete="off" >
          <TextField
            inputRef={(ref)=>this.username = ref}
            required={usernameField.required}
            id={usernameField.id}
            placeholder="Username"
            fullWidth
            error={usernameField.error}
            label={usernameField.label}
            className={classes.textField}
            margin="normal"
            onChange={(e) => {
              const target = e.target;
              this.usernameST && clearTimeout(this.usernameST);
              this.usernameST = setTimeout(()=>{
                this.setState({
                  [usernameField.name] : Object.assign(usernameField,{dirty:true})
                });
                this.textFieldValidate.validate(target.value);
              },250);
            }}
           
          />
          <TextField
            inputRef={ e => this.password = e}
            required={passwordField.required}
            id={passwordField.id}
            label={passwordField.label}
            error={passwordField.error}
            type="password"
            placeholder="Password"
            fullWidth
            className={classes.textField}
            margin="normal"
            onChange={(e) => {
              const target = e.target;
              this.passwordST && clearTimeout(this.passwordST);
              this.passwordST = setTimeout(() => {
                const newField = Object.assign(passwordField,{dirty:true});
                this.setState({
                  [passwordField.name] : newField
                });
                this.passwordFieldValidate.validate(target.value);
              },250);
            }}
            
          />
          <Button disabled={submitEnabled} type="submit" variant="raised" fullWidth color="primary">Login</Button>
          {authLoading && <LinearProgress  />}
          <Tooltip title="GO TO REGISTER" className={classes.tooltip}>
            <Link to="/register">I have no account yet</Link>
          </Tooltip>
        </form>
        { loginError ? <WarnningDialog content={warnningString} open={!!warnningString} callback={()=>{
          this.props.loginErrorCancel();
        }} defaultOpen={false} /> : null }
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  authLoading: PropTypes.bool.isRequired,
  loginError: PropTypes.bool,
  authInfo: PropTypes.object,
};

Login.contextTypes = {
  auth: PropTypes.object,
}

const mapStateToProps = createStructuredSelector({
  authLoading: makeGlobalAuthLoading(),
  loginError: makeGlobalLoginError(),
  authInfo: makeGlobalAuthInfo(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    login: function(formData){
      return dispatch(loginAction(formData));
    },
    loginErrorCancel: function(){
      dispatch(loginErrorCancelAction());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
