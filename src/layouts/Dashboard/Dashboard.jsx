import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { withStyles } from "material-ui";
import { Header, Footer, Sidebar } from "components";
import dashboardRoutes from "routes/dashboard.jsx";
import appStyle from "assets/jss/material-dashboard-react/appStyle.jsx";
import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";
import { injectReducer, injectSagas } from "../../getInjectors";
import { AuthContext } from "providers/Auth";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { authAction, logoffAction } from "../actions";
import { makeGlobalAuthInfo } from "../selectors";

// function styles(themes){
//   return {}
// }

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const makeSwitchRoutes = () => {
  return {
    dashboardRoutes: new Array(...dashboardRoutes.filter(item => !item.exclude)),
    switchRoutes:(
      <Switch>
      {dashboardRoutes.map((prop, key) => {
        // console.log("prop",prop);
        
        if (prop.redirect)
          return <Redirect from={prop.path} to={prop.to} key={key} />;
        return <Route path={prop.path} render={(props)=>{
          const Component = prop.component;
          if (prop.saga && prop.reducer){
            // console.log("prop.reducer",prop.reducer);
            // console.log("prop.saga",prop.saga);
            const importModules = Promise.all([prop.reducer, prop.saga]);
            importModules.then(([reducer,sagas]) => {
              // console.log("reducer",reducer);
              injectReducer(reducer.stateName, reducer.default);
              injectSagas(sagas.default);
            }).catch(errorLoading);
          }
          return <Component {...props} />
        }} key={key} />;
      })}
    </Switch>
    ),
  }
}
const switchRoutesWrapper = makeSwitchRoutes();

class App extends React.Component {
  state = {
    mobileOpen: false
  };
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/maps";
  }
  componentDidMount() {
    if(navigator.platform.indexOf('Win') > -1){
      // eslint-disable-next-line
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
  }
  componentDidUpdate() {
    this.refs.mainPanel.scrollTop = 0;
  }
  render() {
    const { classes, authInfo, ...rest } = this.props;
    console.log("authInfo",authInfo);
    return (
      <AuthContext.Provider value={authInfo}>
      <div className={classes.wrapper}>
        <Sidebar
          routes={switchRoutesWrapper.dashboardRoutes}
          logoText={"TEST"}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <Header
            routes={switchRoutesWrapper.dashboardRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutesWrapper.switchRoutes}</div>
            </div>
          ) : (
            <div className={classes.map}>{switchRoutesWrapper.switchRoutes}</div>
          )}
          {this.getRoute() ? <Footer /> : null}
        </div>
      </div>
      </AuthContext.Provider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};
export function mapDispatchToProps(dispatch) {
  return {
    onLoad: () => {
      dispatch(authAction());
    },
    onLogoff: () => {
      dispatch(logoffAction());
    }
  };
}

const mapStateToProps = createStructuredSelector({
  authInfo: makeGlobalAuthInfo(),
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(appStyle)(App));

