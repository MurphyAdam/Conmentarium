import React from 'react';
import {makeStyles} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/auth';

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
  AppBarButtons: {
    textTransform: 'none',
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

  const { isAuthenticated, logout } = props;
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
          {isAuthenticated &&
            <div>
              <Button
                color="inherit" 
                className={classes.AppBarButtons}
                onClick={logout} >
                Logout
              </Button>
            </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
    isAuthenticated: state.auth.currentUser.authenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryAppBar);