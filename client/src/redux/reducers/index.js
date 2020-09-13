import { combineReducers } from 'redux';
import auth from './auth';
import notebook from './notebook';

const rootReducer = combineReducers({auth, notebook});

export default rootReducer;