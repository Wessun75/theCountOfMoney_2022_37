import React from "react";
import { UserStore } from "../Stores/UserStore";
import {GetUserInfos, UserLogin} from "../Services/UserService";

export async function Login(email, password) {

    let res = await UserLogin(email, password);

    if (res == null) { return null; }

    await UserStore.update(us => {us.token = res.token});
    await UserStore.update(us => {us.favorites = res.user.favorites});
    await UserStore.update(us => {us.id = res.user._id});
    await UserStore.update(us => {us.role = res.user.role});
    await UserStore.update(us => {us.email = res.user.email});

    return true;
}

export async function updateUserInfos(id, accessToken)
{
    let res = await GetUserInfos(id, accessToken);
    await UserStore.update(us => {us.favorites = res.user.favorites});
}

export function Logout() {
    UserStore.update(us => {us.token = null});
}