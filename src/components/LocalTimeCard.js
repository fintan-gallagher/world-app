import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

const LocalTimeCard = ({ timezone }) => {
    const [localTime, setLocalTime] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const API_KEY = '410efc67714b4c87943c3be63c994940'; // Replace with your IPGeolocation API key
        const TIME_URL = 'https://api.ipgeolocation.io/timezone';

        if (timezone) {
            console.log('Fetching time for timezone:', timezone);

            const url = `${TIME_URL}?apiKey=${API_KEY}&tz=${timezone}`;
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
        } else {
            setError('Invalid timezone');
        }
    }, [timezone]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!localTime) {
        return <div>Loading local time...</div>;
    }

    // Convert the UTC time to the specified timezone
    const zonedTime = toZonedTime(new Date(localTime), timezone);

    return (
        <div>
            <h2>Local Time</h2>
            <p>{format(zonedTime, 'PPpp')}</p>
        </div>
    );
};

export default LocalTimeCard;