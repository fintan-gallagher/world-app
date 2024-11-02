import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/CountryCarousel.css'; // Import the CSS file

const UNSPLASH_ACCESS_KEY = '8bo7bfH8X60VE8Wf-40M946XCBiZwzSeQJD-wgxzTJM';

const CountryCarousel = () => {
<<<<<<< HEAD
    const [countries, setCountries] = useState([]); // State for storing countries
    const [images, setImages] = useState({}); // State for storing images
    const navigate = useNavigate(); // Hook for navigation
=======
    const [countries, setCountries] = useState([]); // State to store the list of countries
    const [images, setImages] = useState({}); // State to store the images of countries
    const navigate = useNavigate(); // Hook to navigate programmatically
>>>>>>> fix-app-js

    useEffect(() => {
        // Fetch the list of countries
        const fetchCountries = async () => {
            try {
<<<<<<< HEAD
                const response = await axios.get('https://restcountries.com/v3.1/all');
                setCountries(response.data); // Set countries data
            } catch (error) {
                console.error('Error fetching countries:', error); // Log error
=======
                const response = await axios.get('https://restcountries.com/v3.1/all'); // API call to fetch all countries
                setCountries(response.data); // Set the fetched countries to state
            } catch (error) {
                console.error('Error fetching countries:', error); // Log any errors
>>>>>>> fix-app-js
            }
        };

        fetchCountries();
    }, []);

    useEffect(() => {
        // Fetch images for each country concurrently
        const fetchImages = async () => {
<<<<<<< HEAD
            const newImages = {}; // Initialize an empty object to store image URLs
=======
            const newImages = {}; // Object to store the fetched images
>>>>>>> fix-app-js
            const imagePromises = countries.map(async (country) => {
                try {
                    // Make a request to the Unsplash API to search for photos of the country
                    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
                        params: {
<<<<<<< HEAD
                            query: country.name.common, // Use the common name of the country as the search query
                            client_id: UNSPLASH_ACCESS_KEY, // Unsplash API access key
                            per_page: 1 // Limit the results to 1 image per country
                        }
                    });
                    // Extract the image URL from the response
                    const imageUrl = response.data.results[0]?.urls?.regular;
                    if (imageUrl) {
                        newImages[country.name.common] = imageUrl; // Set image URL for the country
                    }
                } catch (error) {
                    console.error(`Error fetching image for ${country.name.common}:`, error); // Log error if the request fails
                }
            });
            // Wait for all image requests to complete
            await Promise.all(imagePromises);
            setImages(newImages); // Update the state with the fetched images
=======
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
>>>>>>> fix-app-js
        };

        if (countries.length > 0) {
            fetchImages(); // Fetch images if countries are available
        }
    }, [countries]);

    const handleSelect = (selectedIndex) => {
        // Handle select logic if needed
    };

    const handleItemClick = (country) => {
        navigate(`/country/${country.name.common}`); // Navigate to country details page
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
                        <h3>{country.name.common}</h3> { /*Display country name */}
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default CountryCarousel;