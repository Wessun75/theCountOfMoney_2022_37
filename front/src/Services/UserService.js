import Config from "../Config";
import axios from "axios";

export async function UserLogin(email, password)
{
    const payload = {
        email: email,
        password: password
    };

    try {
        if (email && password) {
            let res = await axios.post(Config.API_URL + "/users/login", payload);
            return res.data;
        }
    } catch {
        return null;
    }
    return null;
}

export async function GetUserInfos(id, accessToken)
{

    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    };

    try {
        let res = await axios.get(Config.API_URL + "/users/" + id, config);
        return res.data;
    } catch {
        return null;
    }
}