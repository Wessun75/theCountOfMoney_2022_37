import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import {Button} from "@material-ui/core";
import {addCrypto} from "../../Repositories/CryptoRepository";
import {UserStore} from "../../Stores/UserStore";
import { store } from 'react-notifications-component';

export default function AdminCryptoSelector() {

    const [addValue, setAddValue] = useState(null);
    const userStore = UserStore.useState();

    const handleAddChange = e => setAddValue(e.target.value);

    const add = async () => {
        if (addValue) {
            let res = await addCrypto(addValue, userStore.token);
            if (res === true) {
                store.addNotification({
                    title: "Success!",
                    message: addValue + " was added to the database",
                    type: "success",
                    insert: "top",
                    container: "top-center",
                    dismiss: {
                        duration: 3000,
                        onScreen: true
                    }
                });
            } else {
                store.addNotification({
                    title: "Success!",
                    message: addValue + " was added to the database",
                    type: "Error",
                    insert: "top",
                    container: "top-center",
                    dismiss: {
                        duration: 3000,
                        onScreen: true
                    }
                });
            }
        }
    }

    return (
        <div>
            <TextField onChange={handleAddChange} id="outlined-basic" label="Ex: BTC, ETH..." variant="outlined" />
            <Button onClick={add} style={{marginTop: "10px"}}>Add to application</Button>
        </div>
    )
}