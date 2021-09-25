import axios from "axios";
import Cookies from "js-cookie";

import { USERS_URL } from "../constants";

export const userList = async () => {
    try {
        const response = await axios.get(USERS_URL)
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const userRetrieve = async id => {
    try {
        const response = await axios.get(USERS_URL + `${id}/`)
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}