import { FETCH_NOTE,
	FETCH_NOTE_SUCCESS, 
	FETCH_NOTE_FAILURE,
	REFETCH_NOTE_SUCCESS,
	DELETE_NOTE_SUCCESS,
	FETCH_TRASHED_NOTES_SUCCESS,
	EMPTY_TRASH,
	DELETE_TRASHED_NOTE_SUCCESS,
	RESTORE_TRASHED_NOTE_SUCCESS,
	 } from '../constants/notebook';
import { INITIATE_AUTH_CLEANUP } from '../constants/auth';
import { filterArrayWithId, concatArrayOfObjectsAndSortWithDateAsc } from '../methods';

const INITIAL_STATE = {
		trashedNotes: {
			notes: [],
			isLoading: false,
			isLoaded: false,
			count: 0,
		},
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
					notebook: concatArrayOfObjectsAndSortWithDateAsc(state.notebook, action.payload.notes),
					count: state.notebook.length,
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
					notebook: concatArrayOfObjectsAndSortWithDateAsc(state.notebook, action.payload.notes),
					count: state.notebook.length,
			}
		}
		case DELETE_NOTE_SUCCESS: {
			return {...state,
					notebook: filterArrayWithId(state.notebook, action.payload.note_id),
					count: state.notebook.length,
					isLoading: false,
					isLoaded: true,
					trashedNotes: {
						notes: concatArrayOfObjectsAndSortWithDateAsc(state.trashedNotes.notes, [action.payload?.note]),
						count: state.trashedNotes.notes.length,
						isLoading: false,
						isLoaded: true
					}
				}
			}
		case FETCH_TRASHED_NOTES_SUCCESS: {
			return {...state,
					trashedNotes: {
						notes: action.payload?.notes || state.trashedNotes.notes,
						count: state.trashedNotes.notes.length,
						isLoading: false,
						isLoaded: true
					}
				}
			}
		case DELETE_TRASHED_NOTE_SUCCESS: {
			return {...state,
					trashedNotes: {
						notes: filterArrayWithId(state.trashedNotes.notes, action.payload.note_id),
						count: state.trashedNotes.notes.length,
						isLoading: false,
						isLoaded: true
					}
				}
			}
		case RESTORE_TRASHED_NOTE_SUCCESS: {
			return {...state,
					notebook: concatArrayOfObjectsAndSortWithDateAsc(state.notebook, [action.payload.note]),
					count: state.notebook.length,
					isLoading: false,
					isLoaded: true, 
					trashedNotes: {
						notes: filterArrayWithId(state.trashedNotes.notes, action.payload.note_id),
						count: state.trashedNotes.notes.length,
						isLoading: false,
						isLoaded: true
					}
				}
			}
		case EMPTY_TRASH: {
			return {...state, 
				trashedNotes: {...INITIAL_STATE.trashedNotes}
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
