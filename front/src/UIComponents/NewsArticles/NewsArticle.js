import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import NewsImageLinks from "./Components/NewsImageLinks";
import NewsArticleList from "./Components/NewsArticleList";
import LoginModal from "../Users/LoginModal/LoginModal";
import Container from "@material-ui/core/Container";

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

    return (
        <Container>
            <div>
                <Box className={boxesA.root} display="flex" alignItems="flex-start">
                    <NewsImageLinks/>
                </Box>
                <Box className={boxesB.root}>
                    <Typography align = "left" style ={{color: 'rgba(149, 165, 166, 1)'}} variant="h4">
                        Other useful links: 
                    </Typography>
                    <div>
                        <NewsArticleList/>
                        <LoginModal/>
                    </div>
                </Box>
            </div>
        </Container>
    );
}

export default NewsArticle;
