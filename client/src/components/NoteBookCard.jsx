import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { truncate } from '../util/methods';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import NoteIcon from '@material-ui/icons/Note';
import LabelIcon from '@material-ui/icons/Label';
import EditNote from './EditNote';

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

export default function NoteBookCard(props) {

	const { note } = {...props};
	const classes = useStyles();
	const [toggleDisplay, setToggleDisplay] = useState(false);
	const [toggleEdit, setToggleEdit] = useState(false);

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
						<IconButton onClick={() => handleToggleActions("toggleDisplay")}>
							<NoteIcon />
						</IconButton>
						<IconButton>
							<DeleteForeverIcon />
						</IconButton>
						<IconButton onClick={() => handleToggleActions("toggleEdit")}>
							<EditIcon />
						</IconButton>
					</CardActions>
				</Card>
				:
					<EditNote note={note} 
						handleToggleActions={handleToggleActions} />
			}
		</Grid>
	);
}