import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocalWeatherCard = ({ lat, lon }) => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const apiKey = '0a9a3d56626bd3f1eaa214703d91d6f7';
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
            .then((res) => {
                console.log('Weather Response:', res.data);
                setWeather(res.data);
            })
            .catch((e) => {
                console.error('Weather API Error:', e);
                setError('Failed to fetch weather data');
            });
    }, [lat, lon]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!weather) {
        return <div>Loading weather...</div>;
    }

    return (
        <div>
            <h2>Local Weather</h2>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Weather: {weather.weather[0].description}</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
    );
};

export default LocalWeatherCard;