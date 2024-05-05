import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const httpCLient = axios.create({
    baseURL: "http://localhost:5164/api",
    headers: {
        "Content-type": "application/json"
    }
});


export function getDecodedAccessToken(token: string) {
    return jwtDecode(token);
}

export default httpCLient;
