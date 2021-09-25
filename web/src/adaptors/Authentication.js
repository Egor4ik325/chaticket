import axios from "axios";
import Cookies from "js-cookie";

import { USER_URL, LOGIN_URL, REGISTER_URL, LOGOUT_URL } from "../constants";
import { setCsrfCookie } from "./Api";


export const getUser = async () => {
    try {
        const response = await axios.get(USER_URL, { withCredentials: true });
        if (response.status === 200) {
            return response.data;
        }
        return null;
    } catch (errors) {
        console.error(errors);
        return null;
    }
}

export const login = async data => {
    try {
        await setCsrfCookie();
        const csrftoken = Cookies.get('csrftoken');
        const response = await axios.post(LOGIN_URL, data, { headers: { 'X-CSRFToken': csrftoken } });
        if (response.status === 200) {
            return true;
        }
        return false;
    } catch (err) {
        console.error(err);
        return false;
    }
}

export const register = async data => {
    try {
        const csrftoken = Cookies.get('csrftoken');
        const response = await axios.post(REGISTER_URL, data, { headers: { 'X-CSRFToken': csrftoken } });
        if (response.status === 200) {
            return true;
        }
        return false;
    } catch (err) {
        console.error(err);
        return false;
    }
}

export const logout = async () => {
    try {
        await setCsrfCookie();
        const csrftoken = Cookies.get('csrftoken');
        const response = await axios.post(LOGOUT_URL, null, {
            headers: { 'X-CSRFToken': csrftoken }, withCredentials: true
        });
        if (response.status === 200) {
            return true;
        }
        return false;
    } catch (err) {
        console.error(err);
        return false;
    }
}