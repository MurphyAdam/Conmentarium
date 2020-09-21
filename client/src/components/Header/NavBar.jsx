import React from 'react';
import {makeStyles} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    margin: theme.spacing(0),
  },
  appBar: {
    zIndex: 200,
  },
  Toolbar: {
    zIndex: 200,
  },
  title: {
    fontSize: 15,
    textTransform: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  }
}));

function PrimaryAppBar(props) {

  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar variant="dense" className={classes.Toolbar}>
          <Typography variant="h4" noWrap>
              <Button 
                color="inherit" 
                variant="text"
                className={classes.title}>
                  Conmentarium
              </Button>
          </Typography>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default PrimaryAppBar;