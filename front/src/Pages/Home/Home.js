import React, {useEffect} from "react";
import { Grid } from "@material-ui/core";
import CryptoGraph from "../../UIComponents/Crypto-Graph/CryptoGraph";
import NewsArticle from "../../UIComponents/NewsArticles/NewsArticle";
import { UserStore } from "../../Stores/UserStore";
import { CryptoStore } from "../../Stores/CryptoStore";
import CryptoSelector from "../../UIComponents/CryptoSelector/CryptoSelector";
import AdminCrypoSelector from "../../UIComponents/CryptoSelector/AdminCrypoSelector";
import CryptoInfo from "../../UIComponents/Crypto-Info/CryptoInfo";
import {findAvailableCryptosInfos, getTrendingNews} from "../../Repositories/CryptoRepository";

export default function Home(props) {

    const userStore = UserStore.useState();
    const cryptoStore = CryptoStore.useState();

    const getCryptoList = async () => {
        await findAvailableCryptosInfos();
    }

    useEffect(() => {
        getCryptoList();
    }, [])

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
                    <Grid container spacing={4}>
                        <Grid item xs>
                            {userStore.favorites ?
                                <div>
                                    {userStore.favorites.map(fav => <CryptoGraph key={fav} cryptoName={fav}/>)}
                                </div>
                                : <p>Please select a currency</p>}
                        </Grid>
                        <Grid item xs>
                            <NewsArticle token={userStore.token} />
                        </Grid>

                    </Grid>
                </div>
            }

            <br/>
            <br/>
            <br/>

            <Grid container spacing={4} justify="center">
                <Grid item xs md>
                    {cryptoStore.CryptoList &&
                        <div>
                            {cryptoStore.CryptoList.map(crypto => <CryptoInfo name={crypto.FROMSYMBOL} open={crypto.OPENDAY} high={crypto.HIGHDAY} low={crypto.LOWDAY} image={crypto.IMAGEURL}/>)}
                        </div>}
                </Grid>
                {!userStore.token && <Grid item xs md>
                    <NewsArticle token={null}/>
                </Grid>}

            </Grid>
        </div>
    )
}