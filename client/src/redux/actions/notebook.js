import {
	FETCH_NOTE,
	FETCH_NOTE_SUCCESS,
	FETCH_NOTE_FAILURE,
	REFETCH_NOTE,
	REFETCH_NOTE_SUCCESS,
	REFETCH_NOTE_FAILURE,
	DELETE_NOTE,
	DELETE_NOTE_SUCCESS,
	DELETE_NOTE_FAILURE,
	FETCH_TRASHED_NOTES,
	FETCH_TRASHED_NOTES_SUCCESS,
	FETCH_TRASHED_NOTES_FAILURE,
	EMPTY_TRASH,
	DELETE_TRASHED_NOTE,
	DELETE_TRASHED_NOTE_SUCCESS,
	DELETE_TRASHED_NOTE_FAILURE,
	RESTORE_TRASHED_NOTE,
	RESTORE_TRASHED_NOTE_SUCCESS,
	RESTORE_TRASHED_NOTE_FAILURE,
} from '../constants/notebook';
import { error as notificationError } from 'react-notification-system-redux';
import { fetchNotebookService, fetchNoteService, 
	deleteNoteService, fetchTrashedNotesService, 
	emptyTrashService, purgeTrashedNoteService, 
	restoreTrashedNoteService } from '../../services/note-api';
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

export function getNotes() {
	return (dispatch) => {
		dispatch(fetchNotes());
		fetchNotebookService()
		.then((response) => {
			if (response.status !== 200) {
				dispatch(fetchNotesError(response));
			}
			return response;
		})
		.then((response) => {
			dispatch(fetchNotesSuccess(response.data))
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

const refetchNotes = page => ActionCreatorFactory(REFETCH_NOTE);
const refetchNotesSuccess = data => ActionCreatorFactory(REFETCH_NOTE_SUCCESS, data);
const refetchNotesError = error => ActionCreatorFactory(REFETCH_NOTE_FAILURE, error);

export const refetchNote = id => {
	return (dispatch) => {
		dispatch(refetchNotes());
		fetchNoteService(id)
		.then((response) => {
			if (response.status !== 200) {
				dispatch(refetchNotesError(response));
			}
			return response;
		})
		.then((response) => {
			dispatch(refetchNotesSuccess(response.data));
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

const removeNote = page => ActionCreatorFactory(DELETE_NOTE);
const removeNoteSuccess = data => ActionCreatorFactory(DELETE_NOTE_SUCCESS, data);
const removeNoteError = error => ActionCreatorFactory(DELETE_NOTE_FAILURE, error);

export const deleteNote = id => {
	return (dispatch) => {
		dispatch(removeNote());
		deleteNoteService(id)
		.then((response) => {
			if (response.status !== 200) {
				dispatch(removeNoteError(response));
			}
			return response;
		})
		.then((response) => {
			dispatch(removeNoteSuccess({note: response.data?.note, note_id: id}));
		})
		.catch((error) => {
			dispatch(removeNoteError(error));
			dispatch(notificationError({'title': error.response.data.message || 
				error.request.statusText,
				'message': `Failed to delete note`,
			}));
		})
	}
}

const fetchTrashedNotes = page => ActionCreatorFactory(FETCH_TRASHED_NOTES);
const fetchTrashedNotesSuccess = data => ActionCreatorFactory(FETCH_TRASHED_NOTES_SUCCESS, data);
const fetchTrashedNotesError = error => ActionCreatorFactory(FETCH_TRASHED_NOTES_FAILURE, error);

export function getTrashedNotes() {
	return (dispatch) => {
		dispatch(fetchTrashedNotes());
		fetchTrashedNotesService()
		.then((response) => {
			if (response.status !== 200) {
				dispatch(fetchTrashedNotesError(response));
			}
			return response;
		})
		.then((response) => {
			const notes = concatArrayOfObjectsAndSortWithDateAsc(response.data.notes || []);
			dispatch(fetchTrashedNotesSuccess({notes}))
		})
		.catch((error) => {
			console.log("error =>", error)
			dispatch(fetchTrashedNotesError(error));
			dispatch(notificationError({'title': error.response.data.message || 
				error.request.statusText,
				'message': `Failed to load notebooks`,
			}));
		})
	};
}

const emptyTrashSuccess = data => ActionCreatorFactory(EMPTY_TRASH, data);

export const emptyTrash = () => {
	return (dispatch) => {
		dispatch(removeNote());
		emptyTrashService()
		.then((response) => {
			return response;
		})
		.then((response) => {
			dispatch(emptyTrashSuccess(response.data));
		})
		.catch((error) => {
			dispatch(notificationError({'title': error.response.data.message || 
				error.request.statusText,
				'message': `Failed to delete note`,
			}));
		})
	}
}

const purgeTrashedNote = page => ActionCreatorFactory(DELETE_TRASHED_NOTE);
const purgeTrashedNoteSuccess = data => ActionCreatorFactory(DELETE_TRASHED_NOTE_SUCCESS, data);
const purgeTrashedNoteError = error => ActionCreatorFactory(DELETE_TRASHED_NOTE_FAILURE, error);

export const purgeNote = id => {
	return (dispatch) => {
		dispatch(purgeTrashedNote());
		purgeTrashedNoteService(id)
		.then((response) => {
			if (response.status !== 200) {
				dispatch(purgeTrashedNoteError(response));
			}
			return response;
		})
		.then((response) => {
			dispatch(purgeTrashedNoteSuccess(response.data));
		})
		.catch((error) => {
			dispatch(purgeTrashedNoteError(error));
			dispatch(notificationError({'title': error.response.data.message || 
				error.request.statusText,
				'message': `Failed to purge note`,
			}));
		})
	}
}

const restoreNote = page => ActionCreatorFactory(RESTORE_TRASHED_NOTE);
const restoreNoteSuccess = data => ActionCreatorFactory(RESTORE_TRASHED_NOTE_SUCCESS, data);
const restoreNoteError = error => ActionCreatorFactory(RESTORE_TRASHED_NOTE_FAILURE, error);

export function restoreTrashedNote(id) {
	return (dispatch) => {
		dispatch(restoreNote());
		restoreTrashedNoteService(id)
		.then((response) => {
			if (response.status !== 200) {
				dispatch(restoreNoteError(response));
			}
			return response;
		})
		.then((response) => {
			dispatch(restoreNoteSuccess({note: response.data?.note, note_id: id}));
		})
		.catch((error) => {
			dispatch(restoreNoteError(error));
			dispatch(notificationError({'title': error.response.data.message || 
				error.request.statusText,
				'message': `Failed to refetch note`,
			}));
		})
	}
}