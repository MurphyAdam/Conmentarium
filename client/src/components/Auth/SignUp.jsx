import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { register } from '../../redux/actions/auth';
import { changeDocumentTitle } from '../../util/methods';
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

  const { isAuthenticated, userSubject, signUp, setCurrentAuthOP } = {...props};
  changeDocumentTitle("Lang&Code - Sign up");
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if(userSubject.success){
      setUsername('');
      setEmail('');
      setPassword('');
    }
  }, [isAuthenticated, userSubject]);

  const performSignUp = e => {
    e.preventDefault();
    signUp({username, email, password});
  };

  const isEnabledToSubmit = () => {
    if(username.length >= 4 &&
      email.length && password.length >= 8) return true;
    else return false;
  }

  return (
    <Grid item xs={12} sm={6} md={6}>
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <Grid container spacing={1}>
            <Grid item xs={12}>
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
              <Button 
                color="secondary"
                variant="body2"
                onClick={() => setCurrentAuthOP("SignIn")}>
                Already have an account? Sign in
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Grid>
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
