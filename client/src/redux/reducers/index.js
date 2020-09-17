import { combineReducers } from 'redux';
import auth from './auth';
import notebook from './notebook';
import {reducer as notifications } from 'react-notification-system-redux';

const rootReducer = combineReducers({auth, notebook, notifications});

export default rootReducer;