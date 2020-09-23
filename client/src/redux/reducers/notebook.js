import { FETCH_NOTE,
	FETCH_NOTE_SUCCESS, 
	FETCH_NOTE_FAILURE,
	REFETCH_NOTE_SUCCESS,
	DELETE_NOTE_SUCCESS,
	 } from '../constants/notebook';
import { INITIATE_AUTH_CLEANUP } from '../constants/auth';
import { filterArrayWithId } from '../methods';

const INITIAL_STATE = {
		notebook: [],
		count: 0,
		isLoading: false,
		isLoaded: false,
};

function notebook(state=INITIAL_STATE, action) {

	switch (action.type){
		case FETCH_NOTE: {
			return {...INITIAL_STATE, 
					isLoading: true
				}
			}
		case FETCH_NOTE_SUCCESS: {
			return {...state,
					notebook: action.payload?.notes,
					count: (action.payload?.notebook || []).length,
					isLoading: false,
					isLoaded: true, 
				}
			}
		case FETCH_NOTE_FAILURE: {
			return {...state, 
					isLoading: false,
					isLoaded: true, 
				}
			}
		case REFETCH_NOTE_SUCCESS: {
			return {...state, 
					notebook: action.payload?.notes || state.notebook,
					count: (action.payload?.notes || state.notebook).length,
			}
		}
		case DELETE_NOTE_SUCCESS: {
			return {...state,
					notebook: filterArrayWithId(state.notebook, action.payload.note_id),
					count: state.notebook.length,
					isLoading: false,
					isLoaded: true,
				}
			}
		case INITIATE_AUTH_CLEANUP: {
			return INITIAL_STATE
		}
		default:
			return state;
	}
}

export default notebook;
