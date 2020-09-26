import { theme, darkModeOn } from '../../config/ui'
import { SET_APP_THEME } from '../constants/ui'

const INITIAL_STATE = {
		theme: theme,
		darkModeOn: darkModeOn,
};

function app(state=INITIAL_STATE, action) {
	switch (action.type){
		// app theme
		case SET_APP_THEME: {
			return {...state, 
					theme: action.payload.theme, 
					darkModeOn: action.payload.darkModeOn
				};
		}
		default:
			return state;
	}
}

export default app;