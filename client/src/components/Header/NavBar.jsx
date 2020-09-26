import React from 'react';
import {makeStyles} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/auth';
import { SetAppTheme } from '../../redux/actions/ui';

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

  const { isAuthenticated, logout, toggleDarkMode, darkModeOn } = props;
  const classes = useStyles();

  const handleThemeChange = e => {
    if(e.target.checked) toggleDarkMode({theme:'dark', darkModeOn:true});
    else toggleDarkMode({theme:'light', darkModeOn:false});
  }

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
          <Switch
            checked={darkModeOn}
            color="secondary"
            onChange={handleThemeChange}
            name="theme"
            icon={<Brightness4Icon />}
            inputProps={{ 'aria-label': 'set them (default: light)' }}
          />
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
    darkModeOn: state.ui.darkModeOn,
    currentUser: state.auth.currentUser,
    isAuthenticated: state.auth.currentUser.authenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    toggleDarkMode: payload => dispatch(SetAppTheme(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryAppBar);