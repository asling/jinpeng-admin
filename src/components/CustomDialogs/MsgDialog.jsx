import React from "react";
import PropTypes from 'prop-types';
import { Dialog, Button } from "material-ui";
import DialogActions from 'material-ui/Dialog/DialogActions';
import DialogContent from 'material-ui/Dialog/DialogContent';
import DialogContentText from 'material-ui/Dialog/DialogContentText';
import DialogTitle from 'material-ui/Dialog/DialogTitle';
function MsgDialog({...props}){
	return (
		<Dialog
          open={props.open}
          onClose={props.handleClose}
     >
          <DialogTitle>通知：</DialogTitle>
          <DialogContent>
            <DialogContentText>
             {props.msg}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} color="primary">
              确认
            </Button>
          </DialogActions>
        </Dialog>
		);
}

export default MsgDialog;

