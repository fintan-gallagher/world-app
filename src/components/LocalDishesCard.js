import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Image, Button } from 'react-bootstrap';
import axios from 'axios';
import { useTheme } from '../Themes/ThemeContext'; // Import the theme context
import '../Styles/LocalDishesCard.css';
import '../App.css';

const LocalDishesCard = ({ country }) => {
    const { theme } = useTheme(); // Get the current theme
    const [dishes, setDishes] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)
            .then(response => {
                setDishes(response.data.meals || []);
            })
            .catch(error => {
                setError('Failed to fetch dishes');
            });
    }, [country]);

    const handleGoogleSearch = () => {
        const query = `${country} food`;
        const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        window.open(url, '_blank');
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (dishes.length === 0) {
        return (
            <div>
                <p>No dishes available for this country.</p>
                <Button onClick={handleGoogleSearch}>Try Google</Button>
            </div>
        );
    }

    return (
        <Container>
            <Row>
                {dishes.map((dish, index) => (
                    <Col key={index} sm={12} md={6} lg={4} className="mb-4">
                        <Card className={`local-dish-card ${theme}`}>
                            <Card.Header>Local Dishes</Card.Header>
                            <ListGroup variant="flush">
                            <ListGroupItem className={`list-group-item ${theme}`}>
                                    <Image src={dish.strMealThumb} thumbnail className="local-dish-image" />
                                    <p>{dish.strMeal}</p>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default LocalDishesCard;