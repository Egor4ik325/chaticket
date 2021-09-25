import { API_URL } from "./Api";

const AUTH_URL = API_URL + 'auth/';
export const CSRF_URL = AUTH_URL + 'set-csrf-cookie/';
export const USER_URL = AUTH_URL + 'user/';
export const LOGIN_URL = AUTH_URL + 'login/';
export const REGISTER_URL = AUTH_URL + 'register/';
export const LOGOUT_URL = AUTH_URL + 'logout/';