import { Store } from "pullstate";

export const UserStore = new Store({
    token: null,
    email: null,
    role: null,
    id : null,
    favorites: null,
});