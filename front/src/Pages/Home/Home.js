import React, {useEffect} from "react";
import { Grid } from "@material-ui/core";
import CryptoGraph from "../../UIComponents/Crypto-Graph/CryptoGraph";
import NewsArticle from "../../UIComponents/NewsArticles/NewsArticle";
import { UserStore } from "../../Stores/UserStore";
import CryptoSelector from "../../UIComponents/CryptoSelector/CryptoSelector";
import AdminCrypoSelector from "../../UIComponents/CryptoSelector/AdminCrypoSelector";

export default function Home(props) {

    const userStore = UserStore.useState();

    return(
        <div>
            <br/>
            {userStore.token &&
                <div>
                    {userStore.role === "admin" &&
                        <div>
                            <AdminCrypoSelector/>
                            <br/>
                        </div>
                    }
                    <CryptoSelector/>
                    <br/>
                    <Grid container spacing={2}>
                        <Grid item xs>
                            {userStore.favorites ?
                                <div>
                                    {userStore.favorites.map(fav => <CryptoGraph key={fav} cryptoName={fav}/>)}
                                </div>
                                : <p>Please select a currency</p>}
                        </Grid>
                        <Grid item xs>
                            <NewsArticle/>
                        </Grid>

                    </Grid>
                </div>
            }
        </div>
    )
}