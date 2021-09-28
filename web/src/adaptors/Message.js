import axios from "axios";

import { MESSAGE_URL } from "../constants";

export const messageList = async params => {
    try {
        // can be 400 (if params are invalid) or empty reponse
        const response = await axios.get(MESSAGE_URL, { params: params })
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const messageRetrieve = async id => {
    try {
        const response = await axios.get(MESSAGE_URL + `${id}/`)
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}