import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocalTimeCard = ({ timezone }) => {
    const [localTime, setLocalTime] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const TIME_URL = 'http://worldtimeapi.org/api/timezone';

        if (timezone) {
            console.log('Fetching time for timezone:', timezone);

            axios.get(`${TIME_URL}/${timezone}`)
                .then((res) => {
                    console.log('Time Response:', res.data);
                    setLocalTime(res.data.datetime);
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

    return (
        <div>
            <h2>Local Time</h2>
            <p>{new Date(localTime).toLocaleString()}</p>
        </div>
    );
};

export default LocalTimeCard;