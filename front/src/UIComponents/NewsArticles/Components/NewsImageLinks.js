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

const NewsImageLinks = () => {
        const classesA = imageLinksStyle();
        const classesB = imageLinksBox();

        const[imageRef,setImageRef] = useState([
            {id: 1, title: 'How to invest ?', link:'',image: img},
            {id: 2, title: "What's the Etherium ?", link:'',image: imgB},
            {id: 3, title: 'Tout savoir sur le Litecoin !', link:'',image: imgC},
        ]);

    const list = imageRef.map(function(imageref){
        return(
            <Card className={classesB.root}>
                <CardActionArea>
                    <CardMedia className={classesA.media} image= {imageref.image}/>
                    <CardContent>
                        <Typography align= 'left' variant="body2" color="textSecondary" component="p">
                            {imageref.title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    })

    return(list)
}
export default NewsImageLinks;