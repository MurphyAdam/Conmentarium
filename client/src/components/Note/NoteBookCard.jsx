import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { truncate } from '../../util/methods';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import NoteIcon from '@material-ui/icons/Note';
import LabelIcon from '@material-ui/icons/Label';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import DeleteIcon from '@material-ui/icons/Delete';
import EditNote from './EditNote';
import DialogWithCallback from '../Common/DialogWithCallback';
import { deleteNote, purgeNote, restoreTrashedNote } from '../../redux/actions/notebook';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  icon: {
    margin: theme.spacing(1, 1, 0, 0),
    width: 20,
    height: 20,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
}));

function NoteBookCard(props) {

	const { note, type, deleteNote, purgeNote, restoreTrashedNote } = {...props};
	const classes = useStyles();
	const [toggleDisplay, setToggleDisplay] = useState(false);
	const [toggleEdit, setToggleEdit] = useState(false);
	const [toggleDelete, setToggleDelete] = React.useState(false);

	const handleToggleActions = (action) => {
		if(action === "toggleEdit") {
			setToggleEdit(!toggleEdit);
			if(toggleDisplay) {
				setToggleDisplay(false);
			}
		}
		if(action === "toggleDisplay") {
			setToggleDisplay(!toggleDisplay);
			if(toggleEdit) {
				setToggleEdit(false);
			}
		}
		if(action === "toggleDelete") {
			setToggleDelete(!toggleDelete);
			if(toggleEdit) {
				setToggleEdit(false);
			}
		}
	}

	return (
		<Grid item key={note.id} xs={12} sm={6} md={4}>
			{!toggleEdit
				?
				<Card className={classes.card} style={{background: note.color ? note.color : null}}>
					<CardContent className={classes.cardContent}>
						<Typography gutterBottom 
						variant="h6" 
						component="h6">
						{note.title}
						</Typography>
						<Typography>
						{toggleDisplay 
							?
							note.body
							:
							truncate(note.body, 20)
						}
						</Typography>
						<Typography  
						variant="body2" 
						component="body2">
							<LabelIcon className={classes.icon} />
							{note.tags}
						</Typography>
					</CardContent>
					<CardActions>
						<IconButton onClick={() => handleToggleActions("toggleDisplay")} title="Display note">
							<NoteIcon />
						</IconButton>
						{type === "Trash"
							?
							<React.Fragment>
								<IconButton onClick={() => restoreTrashedNote(note.id)} title="Restore note">
									<RestoreFromTrashIcon />
								</IconButton>
								<IconButton onClick={() => purgeNote(note.id)} title="Purge note">
									<DeleteForeverIcon />
								</IconButton>
							</React.Fragment>
							:
							<React.Fragment>
								<IconButton onClick={() => handleToggleActions("toggleDelete")} title="Delete note">
									<DeleteIcon  onClick={() => handleToggleActions("toggleDelete")}/>
								</IconButton>
								<IconButton onClick={() => handleToggleActions("toggleEdit")} title="Edit note">
									<EditIcon />
								</IconButton>
							</React.Fragment>
						}
					</CardActions>
				</Card>
				:
					<EditNote note={note} 
						handleToggleActions={handleToggleActions} />
			}
			{toggleDelete &&
				<DialogWithCallback 
          actionCallback={() => deleteNote(note.id)}
          actionName="Delete"
          title="Delete note"
          body={`Click delete to delete this note`}
				/>
			}
		</Grid>
	);
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.currentUser.authenticated,
    notebook: state.notebook,
    trashedNotes: state.notebook.trashedNotes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteNote: id => dispatch(deleteNote(id)),
    purgeNote: id => dispatch(purgeNote(id)),
    restoreTrashedNote: id => dispatch(restoreTrashedNote(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteBookCard);