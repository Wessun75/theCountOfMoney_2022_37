import React from "react";
import {Grid, MuiThemeProvider} from "@material-ui/core";
import CryptoGraph from "../../UIComponents/Crypto-Graph/CryptoGraph";
import NewsArticle from "../../UIComponents/NewsArticles/NewsArticle";

export default function Home(props) {

    return(
        <div>
            <br/>
            <Grid container spacing={2}>
                <Grid item xs>
                    <CryptoGraph/>
                    <CryptoGraph/>
                    <CryptoGraph/>
                </Grid>

                <Grid item xs>
                    <NewsArticle/>
                </Grid>

            </Grid>
        </div>
    )
}