const express = require('express'); // Import the Express library
const axios = require('axios'); // Import the Axios library for making HTTP requests
const cors = require('cors'); // Import the CORS middleware

const app = express(); // Create an instance of the Express application
const PORT = 5000; // Define the port number for the server

app.use(cors()); // Enable CORS for all routes

// Define a route to fetch local time data
app.get('/timezone', async (req, res) => {
    const { apiKey, lat, long } = req.query; // Extract apiKey, lat, and long from the query parameters
    const TIME_URL = `https://api.ipgeolocation.io/timezone?apiKey=${apiKey}&lat=${lat}&long=${long}`; // Construct the URL for the time API

    try {
        const response = await axios.get(TIME_URL); // Make a GET request to the time API
        res.json(response.data); // Send the response data as JSON
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch local time' }); // Send an error response if the request fails
    }
});

// Define a route to fetch currency data
app.get('/currency', async (req, res) => {
    const { apiKey } = req.query; // Extract apiKey from the query parameters
    const CURRENCY_URL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`; // Construct the URL for the currency API

    try {
        const response = await axios.get(CURRENCY_URL); // Make a GET request to the currency API
        res.json(response.data); // Send the response data as JSON
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch currency data' }); // Send an error response if the request fails
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`); // Start the server and log the port number
});