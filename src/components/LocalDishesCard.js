import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, ListGroup, ListGroupItem, Image, Row, Col, Container } from 'react-bootstrap';

import '../Styles/LocalDishesCard.css';

const LocalDishesCard = ({ country }) => {
    const [dishes, setDishes] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const DISH_API_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';

        const url = `${DISH_API_URL}${country}`;
        console.log('Dish API Request URL:', url); // Log the URL

        axios.get(url)
            .then((res) => {
                console.log('Dish Response:', res.data);
                setDishes(res.data.meals || []); // Ensure dishes is an array
            })
            .catch((e) => {
                console.error('Dish API Error:', e);
                setError('Failed to fetch dish data');
            });
    }, [country]);

    if (error) {
        return <div>{error}</div>;
    }

    if (dishes.length === 0) {
        return <div>No dishes available for this country.</div>;
    }

    return (
        <Container>
            <Row>
                {dishes.map((dish, index) => (
                    <Col key={index} sm={12} md={6} lg={4} className="mb-4"> {/* Use Bootstrap grid system */}
                        <Card>
                            <Card.Header>Local Dishes</Card.Header>
                            <ListGroup variant="flush">
                                <ListGroupItem>
                                    <Image src={dish.strMealThumb} thumbnail className="local-dish-image" /> {/* Use custom CSS class */}
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