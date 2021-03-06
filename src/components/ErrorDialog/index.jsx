
/**
*
* FlowDialog
*
*/

import React from 'react';
import { PropTypes } from 'prop-types';
// import styled from 'styled-components';
import Dialog, { DialogTitle, DialogActions,DialogContent,DialogContentText } from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
const styles = () => {
	return {
		"container": {
			minWidth: 250,
			minHeight: 60,
 		}
	}
}
 
class ErrorDialog extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    console.log('this.props.',props);
  	super(props);
  	this.state = {
  		open: this.props.open || this.props.defaultOpen || false,
  	}
  	this.handleClose = this.handleClose.bind(this);
  }
  handleClose(callback){
    console.log("handleClose");
  	this.setState({
  		open: !this.state.open,
  	});
    console.log("callback",callback);
  	callback && callback();
  }

  componentWillReceiveProps(next){
    console.log("next",next);
  	this.setState({
  		open: next.open,
  	});
  }

  shouldComponentUpdate(nextProps,nextState){
    console.log("nextProps",nextProps);
    console.log("nextState",nextState);
  	if(nextState.open != null && nextState.open !== this.state.open) return true;
  	return false;

  }
  render() {
  	const { title,content,classes, callback } = this.props;
    return (
      <div className={classes.container}><Dialog open={this.state.open} onClose={this.handleClose}  style={classes} >
      	<DialogTitle >{title}</DialogTitle>
      	<DialogContent><DialogContentText>{content}</DialogContentText></DialogContent>
      	<DialogActions>
      		<Button onClick={(e) => {this.handleClose(callback)}} color="primary">
              OK
            </Button>
      	</DialogActions>
      </Dialog></div>
    );
  }
}

ErrorDialog.propTypes = {
	title: PropTypes.string,
	content: PropTypes.string,
	classes: PropTypes.object,
	callback: PropTypes.func,
};

export default withStyles(styles)(ErrorDialog);
