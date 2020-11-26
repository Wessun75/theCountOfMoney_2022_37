import {useState} from 'react';
import Link from '@material-ui/core/Link';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FolderIcon from '@material-ui/icons/Folder';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';

const NewsArticleList = () => {

    const[articles,setArticles] = useState([
        {title: 'Should I invest in Bitcoin Cash ?', link:''},
        {title: 'Cardano price prediction forecast', link:''},
        {title: 'Ultimate guide to trading cryptocurrencies in the US', link:''},
    ]);

    // const handleChange = () => {
    //     setArticles();
    // }

    const list = articles.map(function(article){
        return(
            <List>
                <ListItem>
                    <ListItemIcon>
                        <FolderIcon />
                    </ListItemIcon>
                    <Link variant="h5" href="#">
                        - {article.title} -
                    </Link>
                </ListItem>
            </List>
        )
    })

    return list;
};
export default NewsArticleList;
