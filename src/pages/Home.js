import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Container } from 'react-bootstrap';

import CountryCard from '../components/CountryCard';
import CountryCarousel from '../components/CountryCarousel';

const Home = () => {
    const [countries, setCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
            .then(response => {
                setCountries(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm) {
            axios.get(`https://restcountries.com/v3.1/name/${searchTerm}`)
                .then(response => {
                    setCountries(response.data);
                })
                .catch(error => {
                    setError(error);
                });
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Container>
            <div className="pt-5">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Search for a country..."
                        value={searchTerm}
                        onChange={handleChange}
                    />
                    <button type="submit">Search</button>
                </form>
                <CountryCarousel />
                <div className='mt-5'>
                    <h1>Countries</h1>
                    <Row>
                        {countries.map(country => (
                            <Col key={country.cca3} sm={12} md={6} lg={4} className="mb-4">
                                <CountryCard
                                    name={country.name.common}
                                    flag={country.flags.png}
                                    region={country.region}
                                    population={country.population}
                                    languages={country.languages}
                                    country={country}
                                />
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        </Container>
    );
};

export default Home;