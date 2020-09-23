import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


function DialogWithCallback(props) {

	const { title, body, actionName, actionCallback } = {...props};
	const [open, setOpen] = React.useState(true);

	const handleClose = () => setOpen(false);

	const handleAction = () => actionCallback();

	return (
		<Dialog open={open} onClose={handleClose} 
			disableBackdropClick={true}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>
					{body}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button color="secondary" 
					onClick={handleClose}
					variant="contained">
				 Cancel
				</Button>
				<Button color="secondary" 
					autoFocus="autoFocus" 
					onClick={handleAction}
					variant="contained">
				 {actionName}
				</Button>
			</DialogActions>
		</Dialog>
  );
}
export default DialogWithCallback;