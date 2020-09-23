import { LOAD_CURRENT_USER,
	LOAD_CURRENT_USER_SUCCESS,
	LOAD_CURRENT_USER_FAILURE, 

	USER_LOGIN,
	USER_LOGIN_SUCCESS, 
	USER_LOGIN_FAILURE,

	USER_SIGNUP,
	USER_SIGNUP_SUCCESS,
	USER_SIGNUP_FAILURE,

	USER_LOGOUT,
	USER_LOGOUT_SUCCESS,
	USER_LOGOUT_FAILURE,

	INITIATE_AUTH_CLEANUP } from '../constants/auth';

import { login, createUser, logoutCurrentUser, fetchCurrentUser } from '../../services/auth-api';
import { error as notificationError, 
removeAll as notificationRemoveAll } from 'react-notification-system-redux';
import { notificationTemplate } from '../methods';


const ActionCreatorFactory = (type, payload=null) => {
	return {
		type: type,
		payload: payload
	}
}

const loadUserRequest = () => ActionCreatorFactory(LOAD_CURRENT_USER);
const loadUserSuccess = data => ActionCreatorFactory(LOAD_CURRENT_USER_SUCCESS, data);
const loadUserError = () => ActionCreatorFactory(LOAD_CURRENT_USER_FAILURE);

const userLoginRequest = () => 	ActionCreatorFactory(USER_LOGIN);
const userLoginSuccess = data => ActionCreatorFactory(USER_LOGIN_SUCCESS, data);
const userLoginError = error => ActionCreatorFactory(USER_LOGIN_FAILURE, error);

const userSignupRequest = () => ActionCreatorFactory(USER_SIGNUP);
const userSignupSuccess = data => ActionCreatorFactory(USER_SIGNUP_SUCCESS, data);
const userSignupError = error => ActionCreatorFactory(USER_SIGNUP_FAILURE, error);

const userLogoutRequest = () => ActionCreatorFactory(USER_LOGOUT);
const userLogoutError = error => ActionCreatorFactory(USER_LOGOUT_FAILURE, error);
const userLogoutSuccess = data => ActionCreatorFactory(USER_LOGOUT_SUCCESS, data);

const initiateAuthCleanup = () => ActionCreatorFactory(INITIATE_AUTH_CLEANUP);

export function getCurrentUser(){
	return (dispatch) => {
		const currentUserId = JSON.parse(localStorage.getItem('currentUser'));
		if (currentUserId !== null && 
			currentUserId !== undefined && 
			!isNaN(parseInt(currentUserId))
			) {
			dispatch(loadUserRequest());
			fetchCurrentUser(currentUserId)
			.then((response) => {
				if (response.status !== 200) {
					dispatch(loadUserError());
				}
				return response
			})
			.then((response) => {
				dispatch(loadUserSuccess(response.data));
				dispatch(initiateAuthCleanup());
			})
			.catch(() => {
				dispatch(loadUserError());
			})

		}
	};
}

export function authenticate(formData) {
	return (dispatch) => {
		dispatch(userLoginRequest());
		login(formData)
		.then((response) => {
			if (response.status !== 200) {
				dispatch(userLoginError(response));
			}
			return response;
		})
		.then((response) => {
			dispatch(userLoginSuccess(response.data));
			dispatch(initiateAuthCleanup());
			dispatch(notificationRemoveAll());
			localStorage.setItem('currentUser', JSON.stringify(response.data.user.id));
		})
		.catch((error) => {
			dispatch(userLoginError(error));
			dispatch(notificationError({'title': error.response.data.message || 
				error.request.statusText,
				'message': `Failed to sign in`,
				'children': notificationTemplate.renderArray(error.response?.data?.errors),
			}));
		})
	};
}

export function register(formData) {
	return (dispatch) => {
		dispatch(userSignupRequest());
		createUser(formData)
		.then((response) => {
			if (response.status !== 200) {
				dispatch(userSignupError(response));
			}
			return response;
		})
		.then((response) => {
			dispatch(userSignupSuccess(response.data));
			dispatch(notificationRemoveAll());
		})
		.catch((error) => {
			dispatch(userSignupError(error));
			dispatch(notificationError({'title': error.response.data.message || 
				error.request.statusText,
				'message': `Failed to sign up`,
				'children': notificationTemplate.renderArray(error.response?.data?.errors),
			}));
		})
	};
}

export function logout() {
	return (dispatch) => {
		dispatch(userLogoutRequest());
		logoutCurrentUser()
		.then((response) => {
			if (response.status !== 200) {
				dispatch(userLogoutError(response));
			}
			return response;
		})
		.then((response) => {
			localStorage.removeItem('currentUser');
			dispatch(userLogoutSuccess(response.data));
			dispatch(notificationRemoveAll());
			dispatch(initiateAuthCleanup());
		})
		.catch((error) => {
			dispatch(userLogoutError(error));
			dispatch(notificationError({'title': error.response.data.message || 
				error.request.statusText,
				'message': `Failed to logout up`,
			}));
		})
	};
}
