import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/CountryCarousel.css'; // Import the CSS file

const UNSPLASH_ACCESS_KEY = '8bo7bfH8X60VE8Wf-40M946XCBiZwzSeQJD-wgxzTJM';

const CountryCarousel = () => {
    const [countries, setCountries] = useState([]); // State to store the list of countries
    const [images, setImages] = useState({}); // State to store the images of countries
    const navigate = useNavigate(); // Hook to navigate programmatically

    useEffect(() => {
        // Fetch the list of countries
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all'); // API call to fetch all countries
                setCountries(response.data); // Set the fetched countries to state
            } catch (error) {
                console.error('Error fetching countries:', error); // Log any errors
            }
        };

        fetchCountries();
    }, []);

    useEffect(() => {
        // Fetch images for each country concurrently
        const fetchImages = async () => {
            const newImages = {}; // Object to store the fetched images
            const imagePromises = countries.map(async (country) => {
                try {
                    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
                        params: {
                            query: country.name.common, // Query Unsplash API with country name
                            client_id: UNSPLASH_ACCESS_KEY, // Unsplash API access key
                            per_page: 1 // Limit to 1 image per country
                        }
                    });
                    const imageUrl = response.data.results[0]?.urls?.regular; // Get the image URL
                    if (imageUrl) {
                        newImages[country.name.common] = imageUrl; // Store the image URL in the object
                    }
                } catch (error) {
                    console.error(`Error fetching image for ${country.name.common}:`, error); // Log any errors
                }
            });

            await Promise.all(imagePromises); // Wait for all image fetch promises to resolve
            setImages(newImages); // Set the fetched images to state
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