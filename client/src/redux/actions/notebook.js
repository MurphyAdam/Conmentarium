import {
	FETCH_NOTE,
	FETCH_NOTE_SUCCESS,
	FETCH_NOTE_FAILURE,
} from '../constants/notebook';
import { error as notificationError } from 'react-notification-system-redux';
import { fetchNotebook } from '../../services/note-api';

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
		fetchNotebook()
		.then((response) => {
			if (response.status !== 200) {
				dispatch(fetchNotesError(response));
			}
			return response;
		})
		.then((response) => dispatch(fetchNotesSuccess(response.data)))
		.catch((error) => {
			dispatch(fetchNotesError(error));
			dispatch(notificationError({'title': error.response.data.message || 
				error.request.statusText,
				'message': `Failed to load posts - auto-refresh every 10s`,
			}));
		})
	};
}