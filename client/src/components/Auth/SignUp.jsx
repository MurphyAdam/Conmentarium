import React, { useState, useEffect, useCallback } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { register } from '../../redux/actions/auth';
import { changeDocumentTitle } from '../../util/methods';
import logo from '../../assets/images/logo.png';
import PropTypes from 'prop-types';

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
    margin: theme.spacing(2, 0),
  },
}));

const SignUp = (props) => {

  const { isAuthenticated, userSubject, signUp } = {...props};
  changeDocumentTitle("Lang&Code - Sign-up");
  const history = useHistory();
  const classes = useStyles();
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirect = useCallback((where) => history.push(where)
  , [history]
  );

  useEffect(() => {
    if(isAuthenticated) redirect('/');
    if(userSubject.success){
      setFullname('');
      setUsername('');
      setEmail('');
      setPassword('');
    }
  }, [isAuthenticated, userSubject, redirect]);

  const performSignUp = e => {
    e.preventDefault();
    signUp({fullname, username, email, password});
  };

  const isEnabledToSubmit = () => {
    if(fullname.length >= 3 && username.length >= 4 &&
      email.length && password.length >= 8) return true;
    else return false;
  }

  return (
    <div className={classes.root}>
      <Grid item xs={12} sm={8} md={5}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar} src={logo} >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  style={{ margin: 5 }}
                  variant="outlined"
                  required
                  fullWidth
                  id="firstname"
                  label="Fullname"
                  autoComplete="firstname"
                  name="firstname"
                  value={fullname}
                  onChange={({ target: { value } }) => setFullname(value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  style={{ margin: 5 }}
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  value={username}
                  onChange={({ target: { value } }) => setUsername(value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  style={{ margin: 5 }}
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  value={email}
                  onChange={({ target: { value } }) => setEmail(value)}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  style={{ margin: 5 }}
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
              onClick={performSignUp}
              disabled={!isEnabledToSubmit()  || userSubject.isLoading}
              color="secondary"
              className={classes.submit}
            >
            {!userSubject.isLoading
              ? "Sign up" : "Signing up..."
            }
            </Button>
            <Grid container>
              <Grid item>
                <Button component={RouterLink} 
                  color="secondary" to="/auth/signin" variant="body2">
                  Already have an account? Sign in
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </div>
  );
}

SignUp.propTypes = {
  userSubject: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  signUp: PropTypes.func.isRequired
};


const mapStateToProps = (state) => {
  return {
    userSubject: state.auth.userSubject,
    isAuthenticated: state.auth.currentUser.authenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (payload) => dispatch(register(payload))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
