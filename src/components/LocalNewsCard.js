import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocalNewsCard = ({ country }) => {
    const [news, setNews] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
        const apiKey = '65c37d6245f34cf7a4cbe96da5c8546e'; // Replace with your NewsAPI key

        axios.get(`${NEWS_API_URL}?country=${country}&apiKey=${apiKey}`)
            .then((res) => {
                console.log('News Response:', res.data);
                setNews(res.data.articles);
            })
            .catch((e) => {
                console.error('News API Error:', e);
                setError('Failed to fetch news data');
            });
    }, [country]);

    if (error) {
        return <div>{error}</div>;
    }

    if (news.length === 0) {
        return <div>Loading news...</div>;
    }

    return (
        <div>
            <h2>Local News</h2>
            <ul>
                {news.map((article, index) => (
                    <li key={index}>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                            {article.title}
                        </a>
                        <p>{article.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LocalNewsCard;