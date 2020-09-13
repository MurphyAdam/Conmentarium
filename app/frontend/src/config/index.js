import axios from 'axios'; 
import {getCookie} from '../util/Cookies';

// window origin - base url
const origin = window.location.origin;

// Perform a simple handshake with the server to retrieve the
// _csrf_token and use the it as the axios X-CSRFTOKEN header defaults
// also set the axios base url to avoid redefinitions across requests
let csrftoken;
let csrftokenExists;
axios(`${origin}/api/handshake`).then(response => {
  if(response) {
    // get _csrf_token token
    csrftoken = getCookie('_csrf_token');
    csrftokenExists = csrftoken ? true : false
    axios.defaults.baseURL = origin;
    axios.defaults.headers.common['X-CSRFTOKEN'] = csrftoken;
  }
})

export const config = {
  // these are the tokens required for backend 
  Tokens : {
    csrf: {
      exists: csrftokenExists,
      token: csrftoken
    }
  },
};




const config = {
  defaultPaletteColors: {
    primary: {
      light: '#484848',
      main: '#212121',
      dark: '#000000',
    },
    secondary: {
      light: '#ffff6e',
      main: '#009688',
      dark: '#009692',
    },
  },
}

export default config;
