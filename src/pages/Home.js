import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import CountryCard from '../components/CountryCard';
import CountryCarousel from '../components/CountryCarousel';

const Home = ({ searchTerm }) => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const countriesPerPage = 15; 

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

    useEffect(() => {
        if (searchTerm) {
            axios.get(`https://restcountries.com/v3.1/name/${searchTerm}`)
                .then(response => {
                    setCountries(response.data);
                })
                .catch(error => {
                    setError(error);
                });
        }
    }, [searchTerm]);

    // Calculate the countries to display based on the current page
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Container>
            <div className="pt-5">
                <CountryCarousel />
                <div className='mt-5'>
                    <h1>Countries</h1>
                    <Row>
                        {currentCountries.map(country => (
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
                    <Pagination>
                        {Array.from({ length: Math.ceil(countries.length / countriesPerPage) }, (_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={index + 1 === currentPage}
                                onClick={() => paginate(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </div>
            </div>
        </Container>
    );
};

export default Home;