import { setThemeCookie } from '../../config/ui';
import { SET_APP_THEME } from '../constants/ui';

export function SetAppTheme(theme) {
	setThemeCookie(theme.theme);
	return {
		type: SET_APP_THEME,
		payload: theme
	}
}
