import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/CountryCarousel.css'; // Import the CSS file

const UNSPLASH_ACCESS_KEY = '8bo7bfH8X60VE8Wf-40M946XCBiZwzSeQJD-wgxzTJM';

const CountryCarousel = () => {
    const [countries, setCountries] = useState([]);
    const [images, setImages] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the list of countries
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                setCountries(response.data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    useEffect(() => {
        // Fetch images for each country concurrently
        const fetchImages = async () => {
            const newImages = {};
            const imagePromises = countries.map(async (country) => {
                try {
                    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
                        params: {
                            query: country.name.common,
                            client_id: UNSPLASH_ACCESS_KEY,
                            per_page: 1
                        }
                    });
                    const imageUrl = response.data.results[0]?.urls?.regular;
                    if (imageUrl) {
                        newImages[country.name.common] = imageUrl;
                    }
                } catch (error) {
                    console.error(`Error fetching image for ${country.name.common}:`, error);
                }
            });

            await Promise.all(imagePromises);
            setImages(newImages);
        };

        if (countries.length > 0) {
            fetchImages();
        }
    }, [countries]);

    const handleSelect = (selectedIndex) => {
        // Handle select logic if needed
    };

    const handleItemClick = (country) => {
        navigate(`/country/${country.name.common}`);
    };

    return (
        <Carousel onSelect={handleSelect}>
            {countries.map((country, index) => (
                <Carousel.Item key={index} className="carousel-item-custom" onClick={() => handleItemClick(country)}>
                    <img
                        className="d-block w-100 object-fit-cover"
                        src={images[country.name.common] || country.flags.png}
                        alt={country.name.common}
                    />
                    <Carousel.Caption>
                        <h3>{country.name.common}</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default CountryCarousel;