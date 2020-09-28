import React, {useState, useEffect} from "react";
import styled from "styled-components";
import NewsItem from './NewsItem';
import axios from 'axios';

const NewsListBlock = styled.div`
    box-sizing : border-box;
    padding-bottom : 3rem;
    width:768px;
    margin : 0 auto;
    margin-top : 2rem;
    @media screen and (max-width:768px){
        width:100%;
        padding-left:1rem;
        padding-right:1rem;
    }
`;


const NewsList = ({category}) => {
    const [articles, setArticles] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        //function start
        const fetchData = async() => {
            setLoading(true);
            try {
                const query = category === 'all' ? '' : `&category=${category}`
                const response = await axios.get(
                    `http://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=fd5ac7f03f9a4a679f21aa2932a9ffb0`
                );
                setArticles(response.data.articles)
            } catch(e){
                console.log(e);
            }
            setLoading(false);
        } //function end
        fetchData();
    }, [category]); // if [] is blank, it is ComponentDidMount. else ComponentDidUpdate

    if (loading) {
        return <NewsListBlock>정보를 가져오는 중...</NewsListBlock>;
    }

    if (!articles){
        return null;
    }

    return(
        <NewsListBlock>
            {articles.map(
                article => (
                    <NewsItem key={article.url} article={article}/>
                )
            )}
        </NewsListBlock>
    )
}

export default NewsList;