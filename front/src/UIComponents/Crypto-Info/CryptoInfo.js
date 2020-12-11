import React from "react";
import Card from "@material-ui/core/Card";
import {Avatar, CardContent} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import {Animated} from "react-animated-css";

const useStyles = makeStyles({
    root: {
        minWidth: 300,
        maxWidth: 500,
        marginBottom: 10
    },
    bullet: {
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function CryptoInfo(props) {

    const classes = useStyles();

    return (
        <Animated animationIn="zoomIn">
            <div style={{ float:'right'}}>
                <Card className={classes.root}>
                    <Avatar alt={props.name} src={"https://www.cryptocompare.com"  + props.image}/>
                    <CardContent>
                        <Typography className={classes.title} color="textPrimary" variant="h5" component="h2">
                            <b>{props.name}</b>
                        </Typography>
                        <p> OPEN: {props.open}</p>
                        <p> HIGH: {props.high}</p>
                        <p> LOW: {props.low}</p>
                    </CardContent>
                </Card>
            </div>
        </Animated>
    )
}