import React, {useEffect, useState} from "react"
import {UserStore} from "../../Stores/UserStore";
import {CryptoStore} from "../../Stores/CryptoStore";
import {
    addFavoriteCrypto,
    deleteCrypto,
    deleteFavoriteCrypto,
    findAvailableCryptos
} from "../../Repositories/CryptoRepository";
import {FormControl} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 100
    }
}));

export default function CryptoSelector() {

    const classes = useStyles();
    const userStore = UserStore.useState();
    const cryptoStore = CryptoStore.useState();

    const [value, setValue] = useState(null);

    const handleChange = e => setValue(e.target.value);

    const getAvailable = async () => {
        let res = await findAvailableCryptos(userStore.token);
    }

    const addFav = async () => {
        if (value) {
            await addFavoriteCrypto(value, userStore.token, userStore.id);
        }
    }

    const removeFav = async () => {
        if (value) {
            await deleteFavoriteCrypto(value, userStore.token, userStore.id);
        }
    }

    const removeCryp = async () => {
        if (value) {
            await deleteCrypto(value, userStore.token);

        }
    }

    useEffect(() => {
        getAvailable();
    }, [])

    return (
        <div>
            {cryptoStore.AvailableCryptos &&
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Available</InputLabel>
                        <Select onChange={handleChange}>
                            {cryptoStore.AvailableCryptos.map(cry => <MenuItem value={cry}>{cry}</MenuItem>)}
                        </Select>
                    </FormControl>
                    &nbsp;&nbsp;
                    <Button style={{marginTop: "10px"}} onClick={addFav}>Add</Button>
                    <Button style={{marginTop: "10px"}} onClick={removeFav}>Remove</Button>
                    {userStore.role === "admin" && <Button style={{marginTop: "10px"}} onClick={removeCryp}>Remove from application</Button>}
                </div>
            }
        </div>
    )
}