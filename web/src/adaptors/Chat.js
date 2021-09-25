import axios from "axios";
import Cookies from "js-cookie";

import { CHAT_URL } from "../constants";

export const chatList = async () => {
    try {
        const response = await axios.get(CHAT_URL)
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const chatCreate = async data => {
    try {
        const csrftoken = Cookies.get('csrftoken');
        const response = await axios.post(CHAT_URL, data, {
            headers: { 'X-CSRFToken': csrftoken }
        })
        if (response.status === 201) {
            return true;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const chatRetrieve = async id => {
    try {
        const response = await axios.get(CHAT_URL + `${id}/`)
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const chatUpdate = async (id, data) => {
    try {
        const csrftoken = Cookies.get('csrftoken');
        const response = await axios.patch(CHAT_URL + `${id}/`, data, {
            headers: { 'X-CSRFToken': csrftoken }
        })
        if (response.status === 200) {
            return true;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const chatDestroy = async id => {
    try {
        const csrftoken = Cookies.get('csrftoken');
        const response = await axios.delete(CHAT_URL + `${id}/`, {
            headers: { 'X-CSRFToken': csrftoken }
        })
        if (response.status === 204) {
            return true;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}