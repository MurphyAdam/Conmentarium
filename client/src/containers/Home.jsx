import React, { useState, lazy, useEffect } from 'react';
import Notebookz from '../components/Notebookz';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import MailIcon from '@material-ui/icons/Mail';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import CodeIcon from '@material-ui/icons/Code';
import IconButton from '@material-ui/core/IconButton';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import {fetchNotebook} from '../services/note-api';
import { connect } from 'react-redux';
import { getCurrentUser } from '../redux/actions/auth';

const SingIn = lazy(() => import('../components/Auth/SignIn'));

export const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    margin: theme.spacing(1)
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width: 160,
  },
  a: {
    textDecoration: 'none',
    color: theme.palette.secondary.main
  }
}));

const defaultNotebook = [
  {
    id: 1,
    title: 'Gotta Get Up',
    body: 'Harry Nilsson',
    color: "rgb(76 175 80 / 22%)",
    date: new Date(),
    tags: "daily, work"
  },
  {
    id: 2,
    title: 'Brush teeth',
    body: `Minimalistic notebook app built with React + Material-UI, and served with Flask. Star, 
              fork or contribute if you wish so. Minimalistic notebook app built with React + Material-UI, and served with Flask. Star, 
              fork or contribute if you wish so. `,
    color: "rgb(156 39 176 / 33%)",
    date: new Date(),
    tags: "daily, teeth"
  },
  {
    id: 3,
    title: 'Have breakfast',
    body: 'Have breakfast with bluh',
    color: "rgb(233 30 99 / 53%)",
    date: new Date(),
    tags: "daily, food"
  },
  {
    id: 4,
    title: 'Code project',
    body: 'Add new features and bugs',
    color: "rgb(0 150 136 / 35%)",
    date: new Date(),
    tags: "code, work"
  },
  {
    id: 5,
    title: 'Kill myself',
    body: 'The end',
    color: "#ff572275",
    date: new Date(),
    tags: "plans, goals"
  },
];

const Home = (props) => {
	
  const { isAuthenticated } = {...props};
	const classes = useStyles();
  const [notebook, setNotebook] = useState([]);

  useEffect(() => {
    try {
      const response = fetchNotebook();
      setNotebook(response.data.notes)
    } catch (error) {
      console.log(error)
      setNotebook(defaultNotebook);
    }
  }, [])

	return (
		<React.Fragment>
        {isAuthenticated
          ?
          <React.Fragment>
            <div className={classes.cardDetails}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography 
                    variant="h5" 
                    gutterBottom
                  >
                    Notebookz, a simple notebook for all ideas.
                  </Typography>
                  <Typography 
                    variant="subtitle2" 
                    color="textSecondary"
                    paragraph>
                    Minimalistic notebook app built with React + Material-UI, and served with Flask. Star, 
                    fork or contribute if you wish so. 
                    <a href="https://github.com/MurphyAdam" 
                      target="_blank"
                      rel="noopener noreferrer" 
                      className={classes.a}> By: @GitHub/MurphyAdam (Majdi)
                    </a>
                  </Typography>
                  <IconButton 
                    component="a"
                    title="GitHub" 
                    aria-label="GitHub" 
                    color="inherit"
                    href="https://github.com/MurphyAdam"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    <GitHubIcon />
                  </IconButton>
                  <IconButton 
                    component="a"
                    title="Source code" 
                    aria-label="Source code" 
                    color="inherit"
                    href="https://github.com/MurphyAdam/Notebookz"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    <CodeIcon />
                  </IconButton>
                  <IconButton 
                    component="a"
                    title="LinkedIn" 
                    aria-label="LinkedIn" 
                    color="inherit"
                    href="https://www.linkedin.com/in/majdi-mahfoud-258461198/"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    <LinkedInIcon />
                  </IconButton>
                  <IconButton 
                    component="a"
                    title="Email" 
                    aria-label="Email" 
                    color="inherit"
                    href="mailto:langandcode@gmail.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    <MailIcon />
                  </IconButton>
                </CardContent>
                <CardMedia
                  className={classes.cardMedia}
                  image="https://res.cloudinary.com/lang-code/image/upload/v1599217214/images/music_icon_tkqdsq.png"
                  title="Notebookz"
                />
              </Card>
            </div>
          </React.Fragment>
          :
          <React.Fragment>
            <WatchLaterIcon />
            <Notebookz notebook={notebook}/>
            <FavoriteIcon />
            <Notebookz notebook={notebook}/>
            <DeleteIcon />
            <Notebookz notebook={[]}/>
          </React.Fragment>
        }
		</React.Fragment>
	);
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.currentUser.authenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  loadUser: () => dispatch(getCurrentUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);