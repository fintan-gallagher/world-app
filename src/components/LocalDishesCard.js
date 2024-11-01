import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Image, Button } from 'react-bootstrap';
import axios from 'axios';
import { useTheme } from '../Themes/ThemeContext'; 
import '../Styles/LocalDishesCard.css';
import '../App.css';

const LocalDishesCard = ({ country }) => {
    const { theme } = useTheme(); // Get the current theme
    const [dishes, setDishes] = useState([]); // State for storing dishes
    const [error, setError] = useState(''); // State for storing error message

    useEffect(() => {
        // Fetch dishes based on the country
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)
            .then(response => {
                setDishes(response.data.meals || []); // Set dishes or empty array if no meals
            })
            .catch(error => {
                setError('Failed to fetch dishes'); // Set error message
            });
    }, [country]);

    // Handle Google search for the country's food
    const handleGoogleSearch = () => {
        const query = `${country} food`;
        const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        window.open(url, '_blank'); // Open search in a new tab
    };

    if (error) {
        return <div>{error}</div>; // Display error message
    }

    if (dishes.length === 0) {
        return (
            <div>
                <p>No dishes available for this country.</p>
                <Button onClick={handleGoogleSearch}>Try Google</Button>  {/* Button to search on Google */}
            </div>
        );
    }

    return (
        <Container>
            <Row>
                {dishes.map((dish, index) => (
                    <Col key={index} sm={12} md={6} lg={4} className="mb-4">
                        <Card className={`local-dish-card ${theme}`}>
                            <Card.Header>{dish.strMeal}</Card.Header>
                            <ListGroup variant="flush">
                                <ListGroupItem className={`list-group-item ${theme}`}>
                                    <Image src={dish.strMealThumb} thumbnail className="local-dish-image" />
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