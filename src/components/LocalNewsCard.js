import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useTheme } from '../Themes/ThemeContext';
import '../Styles/LocalNewsCard.css';

const LocalNewsCard = ({ country }) => {
    const [news, setNews] = useState([]);
    const [error, setError] = useState('');
    const { theme } = useTheme();

    useEffect(() => {
        const NEWS_API_URL = 'https://newsdata.io/api/1/latest';
        const apiKey = 'pub_569867e75688215b5a6aba0a00dda506dbd91';

        axios.get(`${NEWS_API_URL}?&apiKey=${apiKey}&country=${country}`)
            .then((res) => {
                console.log('News Response:', res.data);
                setNews(res.data.results);
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
        <Card className={`local-news-card ${theme}`}>
            <Card.Header>Local News</Card.Header>
            <ListGroup variant="flush">
                {news.map((article, index) => (
                    <ListGroupItem key={index} className={theme}>
                        <a href={article.link} target="_blank" rel="noopener noreferrer">
                            {article.title}
                        </a>
                        <p>{article.description}</p>
                    </ListGroupItem>
                ))}
            </ListGroup>
        </Card>
    );
};

export default LocalNewsCard;