import axios from "axios";
import Cookies from "js-cookie";

import { CSRF_URL } from "../constants";

// Ensure csrftoken cookie is set
export const ensureCsrfCookie = async () => {
    const csrftoken = Cookies.get('csrftoken')
    if (!csrftoken) {
        await setCsrfCookie();
    }
}

export const setCsrfCookie = async () => {
    try {
        // Set csrftoken cookie
        await axios.get(CSRF_URL);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
