import React from "react";
import {CryptoStore} from "../Stores/CryptoStore";
import {AddCrypto, AddFavorite, DeleteCrypto, DeleteFavorite, GetAvailableCryptos} from "../Services/CryptoService";
import {updateUserInfos} from "./UserRepository";

export async function findAvailableCryptos(accessToken)
{
    let res = await GetAvailableCryptos(accessToken);

    CryptoStore.update(cr => {cr.AvailableCryptos = res});
}

export async function addFavoriteCrypto(name, accessToken, id)
{
    let res = await AddFavorite(name, accessToken);
    if (res === true  && res.status != 400) {
        updateUserInfos(id, accessToken);
    }
}

export async function deleteFavoriteCrypto(name, accessToken, id)
{
    let res = await DeleteFavorite(name, accessToken);
    if (res === true && res.status != 400) {
        updateUserInfos(id, accessToken);
    }
}

export async function addCrypto(name, accessToken)
{
    let res = await AddCrypto(name, accessToken);
    if (res === true  && res.status != 400) {
        findAvailableCryptos(accessToken);
        return true
    }
    return false;
}

export async function deleteCrypto(name, accessToken)
{
    let res = await DeleteCrypto(name, accessToken);
    if (res === true && res.status != 400) {
        findAvailableCryptos(accessToken);
    }
}