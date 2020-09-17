import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Switch from '@material-ui/core/Switch';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { authenticate } from '../../redux/actions/auth';
import { changeDocumentTitle } from '../../util/methods';
import PropTypes from 'prop-types';

import logo from '../../assets/images/logo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paper: {
    margin: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    border: '1px solid #009688',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 0),
  },
}));

const SignIn = (props) => {

  changeDocumentTitle("Lang&Code - Sign-in");
  const { currentUser, login } = {...props};
  const classes = useStyles();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');

  const performLogin = e => {
    e.preventDefault();
    login({emailOrUsername, password});
  };

  const isEnabledToSubmit = emailOrUsername.length >= 4 && password.length >= 8;

  return (
    <Grid item xs={12} sm={6} md={6}>
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="emailOrUsername"
                label="Email or Username"
                name="emailOrUsername"
                value={emailOrUsername}
                onChange={({ target: { value } }) => setEmailOrUsername(value)}
                autoComplete="email"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={({ target: { value } }) => setPassword(value)}
                id="password"
                autoComplete="current-password"
              />
            </Grid>
        </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={performLogin}
            disabled={!isEnabledToSubmit || currentUser.isLoading}
            color="secondary"
            className={classes.submit}
          >
          {!currentUser.isLoading
            ? "Sign in" : "Signing in..."
          }
          </Button>

        </form>
      </div>
    </Grid>
  );
}

SignIn.propTypes = {
  currentUser: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
    isAuthenticated: state.auth.currentUser.authenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (payload) => dispatch(authenticate(payload))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
