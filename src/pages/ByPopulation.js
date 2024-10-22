import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import PopCard from '../components/PopCard';

const ByPopulation = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
            .then(response => {
                const sortedCountries = response.data.sort((a, b) => b.population - a.population);
                setCountries(sortedCountries);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className='mt-5'>
            <h1>Countries by Population</h1>
            <Row>
                {countries.map(country => (
                    <Col key={country.cca3} sm={12} md={6} lg={4} className="mb-4">
                        <PopCard
                            name={country.name.common}
                            flag={country.flags.png}
                            region={country.region}
                            population={country.population}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ByPopulation;