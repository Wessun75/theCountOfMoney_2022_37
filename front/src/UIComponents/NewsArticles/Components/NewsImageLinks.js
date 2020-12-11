import React, {useState} from 'react';
import img from "./FakeAssets/exemple.jpg"
import imgB from "./FakeAssets/etherium.jpeg"
import imgC from "./FakeAssets/litecoin.jpg"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";

const imageLinksStyle = makeStyles({
    root: {
        width: 335,
    },
    media: {
        height: 282,
    },
});

const imageLinksBox = makeStyles({
    root: {
        width: 335,
    },
    media: {
        height: 115,
    },
});

const NewsImageLinks = (props) => {
        const classesA = imageLinksStyle();
        const classesB = imageLinksBox();

        const[imageRef,setImageRef] = useState([
            {id: 1, title: props.first.title, link: props.first.url, image: props.first.urlToImage},
            {id: 2, title: props.second.title, link: props.second.url, image: props.second.urlToImage},
            {id: 3, title: props.third.title, link: props.third.url, image: props.third.urlToImage},
        ]);

    const list = imageRef.map(function(imageref){
        return(
            <Card className={classesB.root}>
                <a rel="noopener noreferrer" href={imageref.link} target="_blank">
                        <CardActionArea>
                            <CardMedia className={classesA.media} image= {imageref.image}/>
                            <CardContent>
                                <Typography align= 'left' variant="body2" color="textSecondary" component="p">
                                    {imageref.title}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                </a>
            </Card>
        )
    })

    return(list)
}
export default NewsImageLinks;