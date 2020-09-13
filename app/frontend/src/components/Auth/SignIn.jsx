import React, { useState, useEffect, useCallback } from 'react';
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
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { authenticate } from '../../redux/actions/auth';
import { changeDocumentTitle } from '../../util/methods';
import PropTypes from 'prop-types';

import logo from '../../assets/images/logo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paper: {
    margin: theme.spacing(4, 4),
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
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = (props) => {

  changeDocumentTitle("Lang&Code - Sign-in");
  const { currentUser, isAuthenticated, login } = {...props};
  const classes = useStyles();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const performLogin = e => {
    e.preventDefault();
    login({emailOrUsername, password, rememberMe});
  };

  const handleSwithButtonChange = e => setRememberMe(e.target.checked);

  const isEnabledToSubmit = emailOrUsername.length >= 4 && password.length >= 8;

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={4} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar} src={logo} >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
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
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={rememberMe}
                      color="secondary"
                      onChange={handleSwithButtonChange}
                      name="Remember me"
                      inputProps={{ 'aria-label': 'Remember (default: false)' }}
                    />
                  }
                  label="Remember Me"
                  labelPlacement="start"
                  value={rememberMe}
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
            <Grid container>
              <Grid item xs>
                <a component={RouterLink} color="secondary"
                  to="/auth/reset_password_request" variant="body2">
                  Forgot password?
                </a>
              </Grid>
              <Grid item>
                <a component={RouterLink} color="secondary"
                  to="/auth/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </a>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
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
