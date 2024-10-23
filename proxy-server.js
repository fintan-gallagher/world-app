const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/timezone', async (req, res) => {
    const { apiKey, lat, long } = req.query;
    const TIME_URL = `https://api.ipgeolocation.io/timezone?apiKey=${apiKey}&lat=${lat}&long=${long}`;

    try {
        const response = await axios.get(TIME_URL);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch local time' });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});