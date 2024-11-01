import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useTheme } from '../Themes/ThemeContext';
import '../Styles/LocalNewsCard.css';

const LocalNewsCard = ({ country }) => {
    const [news, setNews] = useState([]); // State to store news articles
    const [error, setError] = useState(''); // State to store error messages
    const { theme } = useTheme(); // Get the current theme

    useEffect(() => {
        const NEWS_API_URL = 'https://newsdata.io/api/1/latest'; // News API URL
        const apiKey = 'pub_569867e75688215b5a6aba0a00dda506dbd91'; // API key for the news API

        // Fetch news data from the API
        axios.get(`${NEWS_API_URL}?&apiKey=${apiKey}&country=${country}`)
            .then((res) => {
                console.log('News Response:', res.data); // Log the response data
                setNews(res.data.results); // Set the news articles in the state
            })
            .catch((e) => {
                console.error('News API Error:', e); // Log any errors
                setError('Failed to fetch news data'); // Set the error message in the state
            });
    }, [country]); 

    if (error) {
        return <div>{error}</div>; // Display the error message if there is an error
    }

    return (
        <Card className={`local-news-card ${theme}`}> {/* Apply theme-specific class to the card */}
            <Card.Header>Local News</Card.Header> 
            <ListGroup variant="flush"> 
                {news.map((article, index) => (
                    <ListGroupItem key={index} className={theme}> 
                        <a href={article.link} target="_blank" rel="noopener noreferrer"> 
                            {article.title} {/* Display the article title */}
                        </a>
                        <p>{article.description}</p> {/* Display the article description */}
                    </ListGroupItem>
                ))}
            </ListGroup>
        </Card>
    );
};

export default LocalNewsCard; // Export the LocalNewsCard component