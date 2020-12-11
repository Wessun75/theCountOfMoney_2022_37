import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import NewsImageLinks from "./Components/NewsImageLinks";
import NewsArticleList from "./Components/NewsArticleList";
import Container from "@material-ui/core/Container";
import {getTrendingNews, getUserNews} from "../../Repositories/CryptoRepository";
import { CryptoStore } from "../../Stores/CryptoStore";

const boxStyleA = makeStyles({
    root: {
        maxWidth: 670,
        height: 282,
        backgroundColor: 'grey',
        position: "relative",
        flex: 1,
        top: 0,
        right: 0
    }
});

const boxStyleB = makeStyles({
    root: {
        position: "relative",
        maxWidth: 670,
        height: 370,
        backgroundColor: 'rgba(228, 233, 237, 1)',
        right: 0,
        top: 50,
    }
});



const NewsArticle = (props) => {
    const boxesA = boxStyleA();
    const boxesB = boxStyleB();
    const cryptoStore = CryptoStore.useState();


    const getTrendng = async () => {
        await getTrendingNews();
    }

    const getUser = async () => {
        await getUserNews(props.token);
    }

    useEffect(() => {
        if (!props.token) {
            getTrendng();
        } else {
            getUser();
        }
    }, [])

    return (
        <Container>
            {cryptoStore.News &&
                <div>
                    <Box className={boxesA.root} display="flex" alignItems="flex-start">
                        <NewsImageLinks first={cryptoStore.News[0]} second={cryptoStore.News[1]}
                                        third={cryptoStore.News[2]}/>
                    </Box>
                    <br/>
                    <Box className={boxesB.root}>
                        <Typography align="left" style={{color: 'rgba(149, 165, 166, 1)'}} variant="h5">
                            Trending
                        </Typography>
                        <div>
                            <NewsArticleList articles={cryptoStore.News}/>
                        </div>
                    </Box>
                </div>
            }
        </Container>
    );
}

export default NewsArticle;
