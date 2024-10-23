import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocalTimeCard = ({ country }) => {
    const [localTime, setLocalTime] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const API_KEY = '410efc67714b4c87943c3be63c994940'; // Replace with your IPGeolocation API key
        const PROXY_URL = 'http://localhost:5000/timezone';

        if (country && country.latlng && country.latlng.length === 2) {
            const [lat, long] = country.latlng; // Extract latitude and longitude
            console.log('Fetching time for coordinates:', lat, long);

            const url = `${PROXY_URL}?apiKey=${API_KEY}&lat=${lat}&long=${long}`;
            console.log('Time API Request URL:', url); // Log the URL

            axios.get(url)
                .then((res) => {
                    console.log('Time Response:', res.data);
                    setLocalTime(res.data.date_time_txt); // Adjust this based on the actual structure
                })
                .catch((e) => {
                    console.error('Time API Error:', e);
                    setError('Failed to fetch local time');
                });
        }
    }, [country]);

    return (
        <div className="local-time-card">
            <h3>Local Time</h3>
            {error ? (
                <p>{error}</p>
            ) : (
                <p>{localTime}</p>
            )}
        </div>
    );
};

export default LocalTimeCard;