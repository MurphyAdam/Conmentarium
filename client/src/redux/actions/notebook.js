import {
	FETCH_NOTE,
	FETCH_NOTE_SUCCESS,
	FETCH_NOTE_FAILURE,
	REFETCH_NOTE,
	REFETCH_NOTE_SUCCESS,
	REFETCH_NOTE_FAILURE,
} from '../constants/notebook';
import { error as notificationError } from 'react-notification-system-redux';
import { fetchNotebook, fetchNote } from '../../services/note-api';
import { concatArrayOfObjectsAndSortWithDateAsc } from '../methods';

const ActionCreatorFactory = (type, payload=null) => {
	return {
		type: type,
		payload: payload
	}
}

const fetchNotes = page => ActionCreatorFactory(FETCH_NOTE);
const fetchNotesSuccess = data => ActionCreatorFactory(FETCH_NOTE_SUCCESS, data);
const fetchNotesError = error => ActionCreatorFactory(FETCH_NOTE_FAILURE, error);

const refetchNotes = page => ActionCreatorFactory(REFETCH_NOTE);
const refetchNotesSuccess = data => ActionCreatorFactory(REFETCH_NOTE_SUCCESS, data);
const refetchNotesError = error => ActionCreatorFactory(REFETCH_NOTE_FAILURE, error);

export function getNotes() {
	return (dispatch, getState) => {
		dispatch(fetchNotes());
		fetchNotebook()
		.then((response) => {
			if (response.status !== 200) {
				dispatch(fetchNotesError(response));
			}
			return response;
		})
		.then((response) => {
			const notes = concatArrayOfObjectsAndSortWithDateAsc(response.data.notes);
			dispatch(fetchNotesSuccess({notes}))
		})
		.catch((error) => {
			console.log("error =>", error)
			dispatch(fetchNotesError(error));
			dispatch(notificationError({'title': error.response.data.message || 
				error.request.statusText,
				'message': `Failed to load notebooks`,
			}));
		})
	};
}

export const setNote = (note) => {
	return (dispatch, getState) => {
		if(note) {
			let notes = getState().notebook.notebook;
			notes = concatArrayOfObjectsAndSortWithDateAsc(notes, [note])
			dispatch(fetchNotesSuccess({notes}));
			return;
		}
	}
}

export const refetchNote = id => {
	return (dispatch, getState) => {
		let notes = getState().notebook.notebook.filter( note => note.id !== id );
		dispatch(refetchNotes());
		fetchNote(id)
		.then((response) => {
			if (response.status !== 200) {
				dispatch(refetchNotesError(response));
			}
			return response;
		})
		.then((response) => {
			notes = concatArrayOfObjectsAndSortWithDateAsc(notes, [response.data?.note])
			dispatch(refetchNotesSuccess({notes}));
		})
		.catch((error) => {
			dispatch(refetchNotesError(error));
			dispatch(notificationError({'title': error.response.data.message || 
				error.request.statusText,
				'message': `Failed to refetch note`,
			}));
		})
	}
}
