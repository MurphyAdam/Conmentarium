import { getCookie, setCookie } from '../util/Cookies';


const getTheme = () => {
	const theme = getCookie('AppTheme');
	return theme ? theme : 'light';
};


const setThemeCookie = theme => setCookie('AppTheme', theme, 30);

const darkModeOn = getTheme() === 'dark';
const theme = getTheme();

export { theme, setThemeCookie, darkModeOn };
