import React, {useEffect, useState} from 'react';
import Link from '@material-ui/core/Link';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FolderIcon from '@material-ui/icons/Folder';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';

const NewsArticleList = (props) => {

    const[articles,setArticles] = useState([
        {title: 'Should I invest in Bitcoin Cash ?', link:''},
        {title: 'Cardano price prediction forecast', link:''},
        {title: 'Ultimate guide to trading cryptocurrencies in the US', link:''},
    ]);

    const formatArticles = () => {
        let copy = [...props.articles];

        for(let i = 0; i!= 3; i++){
            copy.shift();
        }

        let final = [];
        for(let i = 0; i!= 4; i++){
            final.push(copy[i]);
        }

        setArticles(final)
    }

    useEffect(() => {
        formatArticles();
    }, [])

    const list = articles.map(function(article){
        return(
            <List>
                <ListItem>
                    <ListItemIcon>
                        <FolderIcon />
                    </ListItemIcon>
                    <a rel="noopener noreferrer" href={article.url} target="_blank">
                        {article.title}
                    </a>
                </ListItem>
            </List>
        )
    })

    return list;
};
export default NewsArticleList;
