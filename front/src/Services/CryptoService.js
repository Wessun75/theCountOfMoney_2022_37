import Config from "../Config";
import axios from "axios";

export async function GetCrypto(crypto, time, accessToken)
{
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    };

    try {
        if (crypto && time) {
            let res = await axios.get(Config.API_URL + "/cryptos/" + crypto + "/history/" + time, config);
            return res.data.Data.Data;
        }
    } catch {
        return null;
    }
    return null;
}

export async function GetAvailableCryptos(accessToken)
{
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    };

    try {
        let res = await axios.get(Config.API_URL + "/cryptos/length", config);
        return res.data;
    } catch {
        return null;
    }
}

export async function AddFavorite(name, accessToken)
{
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    };

    const payload = {
        favorites: name
    }

    try {
        let res = await axios.post(Config.API_URL + "/favorites", payload, config);
        return true;
    } catch {
        return null;
    }
}

export async function DeleteFavorite(name, accessToken)
{

    const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
        data: {
            favorites: name
        }
    };

    try {
        let res = await axios.delete(Config.API_URL + "/favorites", config);
        return true;
    } catch {
        return null;
    }
}

export async function AddCrypto(name, accessToken)
{
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    };

    const payload = {
        crypto_length: name
    }

    try {
        let res = await axios.post(Config.API_URL + "/cryptos", payload, config);
        return true;
    } catch {
        return false;
    }
}

export async function DeleteCrypto(name, accessToken)
{

    const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
        data: {
            crypto_length: name
        }
    };

    try {
        let res = await axios.delete(Config.API_URL + "/cryptos", config);
        return true;
    } catch {
        return null;
    }
}