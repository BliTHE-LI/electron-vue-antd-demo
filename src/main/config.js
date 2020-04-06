export const APP_SCHEME = 'app';
export const LOAD_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:9080' : `${APP_SCHEME}://./index.html`;
export const LOGIN_URL = `${LOAD_URL}#user/login`;
