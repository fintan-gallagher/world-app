import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocalWeatherCard = ({ lat, lon }) => {
    const [weather, setWeather] = useState(null); // State to store weather data
    const [error, setError] = useState(''); // State to store error messages
    const [weather, setWeather] = useState(null); // State for weather data
    const [error, setError] = useState(''); // State for error message

    useEffect(() => {
        const apiKey = '0a9a3d56626bd3f1eaa214703d91d6f7';
        // Fetch weather data from the API
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
            .then((res) => {
                console.log('Weather Response:', res.data);
                setWeather(res.data); // Set weather data
            })
            .catch((e) => {
                console.error('Weather API Error:', e);
                setError('Failed to fetch weather data'); // Set error message
            });
    }, [lat, lon]);

    if (error) {
        return <div>{error}</div>; // Display error message
    }

    if (!weather) {
        return <div>Loading weather...</div>; // Display loading message
    }

    return (
        <div>
            <h2>Local Weather</h2>
            <h4>Temperature: {weather.main.temp}°C</h4> {/* Display temperature */}
            <h4>Weather: {weather.weather[0].description}</h4> {/* Display weather description */}
            <h4>Humidity: {weather.main.humidity}%</h4> {/* Display humidity */}
            <h4>Wind Speed: {weather.wind.speed} m/s</h4> {/* Display wind speed */}
        </div>
    );
};

export default LocalWeatherCard;