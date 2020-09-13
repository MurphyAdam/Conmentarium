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

	RELOAD_USER_SUCCESS
	 } from '../constants/auth';


const INITIAL_STATE = {
	currentUser: {
		authenticated: false,
		user: null,
		fresh: false,
		isLoading: false,
		isLoaded: false,
		isError: false,
		errors: [],
		error: ''
	},
	userSubject: {
		success: false,
		isLoading: false,
		isLoaded: false,
		isError: false,
		errors: [],
		error: ''
	}
};

function auth(state=INITIAL_STATE, action) {

	switch (action.type){

		case LOAD_CURRENT_USER: {
			return {...state, 
				currentUser: {...INITIAL_STATE.currentUser, 
					isLoading: true
				}
			}
		}
		case LOAD_CURRENT_USER_SUCCESS: {
			return {...state, 
				currentUser: {...state.currentUser,
					authenticated: true, 
					user: action.payload.user,
					isLoaded: true, 
					isLoading: false, 
					fresh: true,
					isError: false,
					errors: []
				}
			}
		}
		case LOAD_CURRENT_USER_FAILURE: {
			return {...state, 
				currentUser: {...INITIAL_STATE.currentUser,
				}
			}
		}
		case RELOAD_USER_SUCCESS: {
			return {...state, 
				currentUser: {...state.currentUser,
					authenticated: true, 
					user: action.payload.currentUser,
					isLoaded: true, 
					isLoading: false, 
					fresh: true,
					isError: false,
					errors: []
				}
			}
		}
		case USER_LOGIN: {
			return {...state, 
				currentUser: {...state.currentUser, 
					isLoading: true, 
					isLoaded: false,
					fresh: false,
					isError: false,
					error: '',
					errors: []
				}
			}
		}
		case USER_LOGIN_SUCCESS: {
			return {...state, 
				currentUser: {...state.currentUser,
					authenticated: true, 
					user: action.payload.user,
					isLoaded: true, 
					isLoading: false, 
					fresh: true,
					isError: false,
					errors: []
				}
			}
		}
		case USER_LOGIN_FAILURE: {
			return {...state, 
				currentUser: {...state.currentUser,
					authenticated: false, 
					user: null,
					isLoaded: true, 
					isLoading: false, 
					fresh: false,
					isError: true,
					errors: action.payload.response?.data?.errors || [],
					error: action.payload.request.statusText || action.payload.message
				}
			}
		}
		case USER_SIGNUP: {
			return {...state, 
				userSubject: {...INITIAL_STATE.userSubject, 
					isLoading: true, 
				}
			}
		}
		case USER_SIGNUP_SUCCESS: {
			return {...state, 
				userSubject: {...INITIAL_STATE.userSubject,
					success: true,
					isLoaded: true, 
					isLoading: false, 
				}
			}
		}
		case USER_SIGNUP_FAILURE: {
			return {...state, 
				userSubject: {...INITIAL_STATE.userSubject,
					success: false, 
					isLoaded: true, 
					isLoading: false, 
					isError: true,
					errors: action.payload.response?.data?.errors || [],
					error: action.payload?.request?.statusText || action.payload?.message
				}
			}
		}

		case USER_LOGOUT: {
			return {...state, 
				currentUser: {...state.currentUser, 
					isLoading: true, 
					isLoaded: false,
					fresh: false,
					isError: false
				}
			}
		}
		case USER_LOGOUT_SUCCESS: {
			return {...INITIAL_STATE,
				currentUser:{...INITIAL_STATE.currentUser, 
					authenticated: false,
					user: null
				}
			}
		}
		case USER_LOGOUT_FAILURE: {
			return {...INITIAL_STATE,
				currentUser:{...INITIAL_STATE.currentUser, 
					authenticated: false,
					user: null
				}
			}
		}
		default:
			return state;
	}
}

export default auth;