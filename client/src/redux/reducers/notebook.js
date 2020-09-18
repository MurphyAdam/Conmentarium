import { FETCH_NOTE,
	FETCH_NOTE_SUCCESS, 
	FETCH_NOTE_FAILURE,
	DELETE_NOTE,
	DELETE_NOTE_SUCCESS,
	DELETE_NOTE_FAILURE,
	 } from '../constants/notebook';
import { INITIATE_AUTH_CLEANUP } from '../constants/auth';
import { removeItemFromArray } from '../methods';

export function concatArrayOfObjectsAndSortWithDate(array, newArrayOfObjects=[]) {
	const newArray = [...array, ...newArrayOfObjects]
	newArray.sort((a, b) => new Date(b.date) - new Date(a.date))
	return newArray
}

const INITIAL_STATE = {
		notebook: [],
		count: 0,
		isLoading: false,
		isLoaded: false,
		isError: false,
		error: ''
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
					notebook: concatArrayOfObjectsAndSortWithDate(state.notebook, action.payload?.notes),
					count: state.notebook.concat(action.payload?.notebook || []).length,
					isLoading: false,
					isLoaded: true, 
					isError: false, 
					error: ''

				}
			}
		case FETCH_NOTE_FAILURE: {
			return {...state, 
					isLoading: false,
					isLoaded: true, 
					isError: true, 
					error: ''

				}
			}
		case DELETE_NOTE: {
			return {...INITIAL_STATE, 
					isLoading: true
				}
			}
		case DELETE_NOTE_SUCCESS: {
			return {...state,
					notebook: removeItemFromArray(state.notebook, action.payload?.note_id),
					count: state.notebook.concat(action.payload?.notebook || []).length,
					isLoading: false,
					isLoaded: true, 
					isError: false, 
					error: ''

				}
			}
		case DELETE_NOTE_FAILURE: {
			return {...state, 
					isLoading: false,
					isLoaded: true, 
					isError: true, 
					error: ''

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
