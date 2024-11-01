import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Image, Button } from 'react-bootstrap';
import axios from 'axios';
import { useTheme } from '../Themes/ThemeContext'; 
import '../Styles/LocalDishesCard.css';
import '../App.css';

const LocalDishesCard = ({ country }) => {
    const { theme } = useTheme(); 
    const [dishes, setDishes] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch the list of dishes for the given country
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)
            .then(response => {
                setDishes(response.data.meals || []); // Set the fetched dishes to state
            })
            .catch(error => {
                setError('Failed to fetch dishes'); // Set error message if the request fails
            });
    }, [country]);

    const handleGoogleSearch = () => {
        const query = `${country} food`; // Create a search query
        const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`; // Create a Google search URL
        window.open(url, '_blank'); // Open the search URL in a new tab
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (dishes.length === 0) {
        return (
            <div>
                <p>No dishes available for this country.</p> {/* Display message if no dishes are available */}
                <Button onClick={handleGoogleSearch}>Try Google</Button> {/* Button to search on Google */}
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