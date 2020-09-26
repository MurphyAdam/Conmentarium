import { combineReducers } from 'redux';
import auth from './auth';
import notebook from './notebook';
import ui from './ui';
import {reducer as notifications } from 'react-notification-system-redux';

const rootReducer = combineReducers({ui, auth, notebook, notifications});

export default rootReducer;