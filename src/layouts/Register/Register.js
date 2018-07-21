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
import Validator, { makeCondition } from "utils/formfieldValidator";
import { registerAction,registerErrorCancelAction } from '../actions';
import { makeGlobalAuthLoading, makeGlobalRegisterError, makeGlobalAuthInfo } from "../selectors";
import ErrorDialog from "components/CustomDialogs/ErrorDialog.jsx"; 
function styles(themes){
  return {
    container: {
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
      float: 'left',
    }
  }
}

const LogoWrapper = styled(Link)`
  text-align: center;
`;
const WarnningDialog = (props) => {
  const { content,title, ...others } = props;
  return (
    <ErrorDialog content={content || "Sorry, something wrong."} title="Warnning" {...others}> </ErrorDialog> 
  );
}
export class Register extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    this._errorHandler = this._errorHandler.bind(this);
    this._successHandler = this._successHandler.bind(this);
    this.password = null;
    this.password2 = null;
    this.username = null;
    this.usernameST = null, this.passwordST = null, this.password2ST = null;
    this.state = {
      usernameField: {
        error:false,
        label: null,
        required: true,
        name: 'usernameField',
        id: "username",
        dirty: false,
        value: "",
      },
      passwordField: {
        error: false,
        label: null,
        required:true,
        id: 'password',
        name: 'passwordField',
        dirty: false,
        value: "",
      },
      password2Field: {
        error: false,
        label: null,
        required:true,
        id: 'password2',
        name: 'password2Field',
        dirty: false,
        value: "",
      },
    }
  }


  formSubmit(e){
    // console.log("e",e);
    const formData = {
      user_name: this.username.value,
      password: this.password.value,
      repassword: this.password2.value,
    };
    const { register } = this.props;
    // console.log("formData",formData);
    register && register(formData);
    e.preventDefault();
  }

  _successHandler(str){
    const self = this;
    return function(ele){
      // console.log("_successHandler str",str);
      ele.error = false;
      ele.label = '';
      self.setState({
        [ele.name]: Object.assign({},ele),
      })
    }
  }

  _errorHandler(str){
    
    const self = this;
    return function(ele){
      // console.log("str",str);
      ele.error = true;
      ele.label = str;
      self.setState({
        [ele.name]: Object.assign({},ele),
      })  
    }
  }


  componentWillMount(){
    const { usernameField } = this.state;
    this.textFieldValidator = Validator().at(usernameField);
    const noEmptyCon = makeCondition(function(str){
      return !(str === "");
    },this._errorHandler("Username do not be empty"),this._successHandler(""));
    const allowEmail = makeCondition(function(str){
      return str.indexOf("@") > 0;
    },this._errorHandler("Username is email"),this._successHandler(""));
    this.textFieldValidator.add(noEmptyCon).add(allowEmail);
  }

  componentDidMount(){
   
    // console.log("this.context.auth",this.context.auth);
  }

  componentDidUpdate(){
    // const { auth } = this.context;
    // // console.log("componentDidUpdate auth",auth);
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
      return 'Register Failed.Username or Password Error!';
    }else{
      return false;
    }
  }


  render() {
    const { classes, authLoading, registerError, authInfo, accessTokenUpdate } = this.props;
    const { usernameField, passwordField, password2Field } = this.state;
    const warnningString = this._differLoginStatus(authInfo);
    accessTokenUpdate(authInfo);
    const noEmptyCon = makeCondition(function(str){
      return !(str === "");
    },this._errorHandler("Username do not be empty"),this._successHandler(""));

    const passwordValue = this.password ? this.password.value : "";
    const passwordValue2 = this.password2 ? this.password2.value : "";

    this.passwordValidator  = Validator();
    this.passwordChangeValidator2 = Validator();
    this.passwordValidator.add(noEmptyCon);
    this.passwordChangeValidator2.add(noEmptyCon);

    this.passwordValidator.add(makeCondition(function(str){
        // console.log("str",str);
        // console.log("passwordValue2",passwordValue2);
        return passwordValue2 === "" ? true : (str === passwordValue2);
    },this._errorHandler("two password aren\'t the same"),this._successHandler("")));

    this.passwordChangeValidator2.add(makeCondition(function(str){
        // console.log("str",str);
        // console.log("passwordValue",passwordValue);
        return str === passwordValue;
    },this._errorHandler("two password aren\'t the same"),this._successHandler("")));
    // this.passwordBlurValidator2 = Validator().at(password2Field);
    // this.passwordBlurValidator2.add(makeCondition(function(str){
    //   return !(str === "");
    // },this._errorHandler("Username do not be empty"),this._successHandler("")));
    // this.passwordBlurValidator2.add(makeCondition(function(str){
    //   console.log("str",str);
    //   console.log("passwordValue",passwordValue);
    //   return str === (self.password ? self.password.value : "");
    // },this._errorHandler("two password aren\'t the same"),this._successHandler("")));

    // this.passwordFocusValidator2 = Validator().at(password2Field);
    // this.passwordFocusValidator2.add(makeCondition(function(str){
    //   return str === (self.password ? self.password.value : "");
    // },this._errorHandler("two password aren\'t the same"),this._successHandler("")));
    // console.log("usernameField",usernameField);
    // console.log("password2Field",password2Field);
    // console.log("passwordField",passwordField);
    const submitEnabled = (!(usernameField.dirty && !usernameField.error ) || !(password2Field.dirty && !password2Field.error) || !(passwordField.dirty && !passwordField.error));
    // console.log("!(usernameField.dirty && !usernameField.error )",!(usernameField.dirty && !usernameField.error ));
    // console.log("!(password2Field.dirty && !password2Field.error)",!(password2Field.dirty && !password2Field.error));
    // console.log("!(passwordField.dirty && !passwordField.error)",!(passwordField.dirty && !passwordField.error));
    return (
      <div className={classes.container} >
        <LogoWrapper to="/">
        <Logo className={classes.logoClassName} />
        </LogoWrapper>
        <h1 className={classes.title}>注册账号</h1>
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
                this.textFieldValidator.validate(target.value);
              },250);
              
            }}
            // onBlur={(e)=>{
            //   this.textFieldValidator.validate(e.target.value);
            // }}
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
                const fieldValidator = this.passwordValidator.at(newField);
                fieldValidator.validate(target.value);
              },250);
            }}

            // onBlur={(e)=>{

            //   this.passwordValidator.validate(e.target.value);
            // }}
          />
          <TextField
            inputRef={ e => this.password2 = e}
            required={password2Field.required}
            id={password2Field.id}
            label={password2Field.label}
            error={password2Field.error}
            type="password"
            placeholder="Confirm Password"
            fullWidth
            className={classes.textField}
            margin="normal"
            onChange={(e) => {
              const target = e.target;
              this.password2ST && clearTimeout(this.password2ST);
              this.password2ST = setTimeout(() => {
                const newField = Object.assign(password2Field,{dirty:true});
                this.setState({
                  [password2Field.name] : Object.assign(password2Field,{dirty:true})
                });
                const fieldValidator = this.passwordChangeValidator2.at(newField);
                fieldValidator.validate(target.value);
              },250);
              // console.log("Object.assign(password2Field,{dirty:true})",Object.assign(password2Field,{dirty:true}));
              
            }}
            // onFocus={(e) => {
            //   this.passwordFocusValidator2.validate(e.target.value);
            // }}
            // onBlur={(e)=>{
            //   this.passwordBlurValidator2.validate(e.target.value);
            // }}type="button" onClick={this.formSubmit}
          />

          <Button  disabled={submitEnabled} type="submit" variant="raised" fullWidth color="primary">Register</Button>
          {authLoading && <LinearProgress  /> }
          <Tooltip title="前往登录" className={classes.tooltip}>
            <Link to="/login">我已经有账号了</Link>
          </Tooltip>
           { registerError ? <WarnningDialog content={warnningString} open={!!warnningString} callback={()=>{
            this.props.registerErrorCancel();
          }} defaultOpen={false} /> : null }
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  dispatch: PropTypes.func.isRequired,
  register: PropTypes.func,
  registerError: PropTypes.bool,
  registerErrorCancel: PropTypes.func,
  authInfo: PropTypes.object,
};

Register.contextTypes = {
  auth: PropTypes.object,
}

const mapStateToProps = createStructuredSelector({
  authLoading: makeGlobalAuthLoading(),
  registerError: makeGlobalRegisterError(),
  authInfo: makeGlobalAuthInfo(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    register: (form) => {
      dispatch(registerAction(form));
    },
    registerErrorCancel: () => {
      dispatch(registerErrorCancelAction());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Register));
