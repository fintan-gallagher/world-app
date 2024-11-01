import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import Select from 'react-select';
import { useTheme } from '../Themes/ThemeContext'; // Import the theme context
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const WorldCurrency = () => {
    const { theme } = useTheme(); // Get the current theme
    const [currencyData, setCurrencyData] = useState({}); // State to store currency data
    const [loading, setLoading] = useState(true); // State to manage the loading state
    const [error, setError] = useState(''); // State to store error messages
    const [selectedCurrencies, setSelectedCurrencies] = useState([ // State to store selected currencies
        { value: 'EUR', label: 'Euro' },
        { value: 'GBP', label: 'Pound Sterling' },
    ]);

    useEffect(() => {
        const fetchCurrencyData = async () => {
            try {
                const API_KEY = '52d3aa3bcd2f06a51ab83c0f'; // API key for the currency API
                const url = `http://localhost:5000/currency?apiKey=${API_KEY}`; // Proxy URL for the currency API
                const response = await axios.get(url); // Fetch currency data from the API
                const rates = response.data.conversion_rates; // Extract conversion rates from the response

                const labels = selectedCurrencies.map(currency => currency.value); // Map selected currencies to their values
                const data = labels.map(label => rates[label]); // Map labels to their corresponding rates

                setCurrencyData({
                    labels,
                    datasets: [
                        {
                            label: 'Currency Conversion Rates (USD)',
                            data,
                            backgroundColor: 'rgba(0, 0, 0, 0.8)', // Set the background color of the bars
                            borderColor: 'rgba(75, 192, 192, 1)', // Set the border color of the bars
                            borderWidth: 1, // Set the border width of the bars
                        },
                    ],
                });
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                setError('Failed to fetch currency data'); // Set the error message in the state
                setLoading(false); // Set loading to false if there is an error
            }
        };

        fetchCurrencyData(); // Call the fetchCurrencyData function
    }, [selectedCurrencies]); // Dependency array to re-run the effect when selectedCurrencies changes

    const handleCurrencyChange = (selectedOptions) => {
        setSelectedCurrencies(selectedOptions); // Update the selected currencies in the state
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        ); // Display a loading spinner while fetching data
    }

    if (error) {
        return <div>{error}</div>; // Display the error message if there is an error
    }

    const currencyOptions = [
        { value: 'USD', label: 'US Dollar' },
        { value: 'EUR', label: 'Euro' },
        { value: 'JPY', label: 'Japanese Yen' },
        { value: 'GBP', label: 'Pound Sterling' },
        { value: 'CHF', label: 'Swiss Franc' },
        { value: 'AUD', label: 'Australian Dollar' },
        { value: 'CAD', label: 'Canadian Dollar' },
    ]; // Options for the Select component

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Currency',
                    font: {
                        family: 'MingLiu, sans-serif',
                        size: 20,
                        weight: 'bold',
                    },
                    color: theme === 'light' ? '#000' : '#fff',
                },
                ticks: {
                    color: theme === 'light' ? '#000' : '#fff',
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Conversion Rate vs. US Dollar',
                    font: {
                        family: 'MingLiu, sans-serif',
                        size: 20,
                        weight: 'bold',
                    },
                    color: theme === 'light' ? '#000' : '#fff',
                },
                ticks: {
                    color: theme === 'light' ? '#000' : '#fff',
                    font: {
                        family: 'MingLiu, sans-serif',
                        size: 14,
                        weight: 'bold',
                    },
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: theme === 'light' ? '#000' : '#fff',
                    font: {
                        family: 'MingLiu, sans-serif',
                        size: 14,
                        weight: 'bold',
                    },
                },
            },
        },
    }; // Options for the Bar chart

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: theme === 'light' ? '#f8f9fa' : '#343a40',
            color: theme === 'light' ? '#000' : '#fff',
            borderColor: theme === 'light' ? '#000' : '#fff',
        }),
        menu: (provided, state) => ({
            ...provided,
            backgroundColor: theme === 'light' ? '#f8f9fa' : '#343a40',
            color: theme === 'light' ? '#000' : '#fff',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? (theme === 'light' ? '#e0e0e0' : '#555') : (theme === 'light' ? '#f8f9fa' : '#343a40'),
            color: theme === 'light' ? '#000' : '#fff',
            ':hover': {
                backgroundColor: theme === 'light' ? '#ccc' : '#777',
                color: theme === 'light' ? '#000' : '#fff',
            },
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: theme === 'light' ? '#000' : '#fff',
        }),
        multiValue: (provided, state) => ({
            ...provided,
            backgroundColor: theme === 'light' ? '#e0e0e0' : '#555',
            color: theme === 'light' ? '#000' : '#fff',
        }),
        multiValueLabel: (provided, state) => ({
            ...provided,
            color: theme === 'light' ? '#000' : '#fff',
        }),
        multiValueRemove: (provided, state) => ({
            ...provided,
            color: theme === 'light' ? '#000' : '#fff',
            ':hover': {
                backgroundColor: theme === 'light' ? '#ccc' : '#777',
                color: theme === 'light' ? '#000' : '#fff',
            },
        }),
    }; // Custom styles for the Select component

    return (
        <Container className={`world-currency-container mt-5 ${theme}`}>
            <h1 className={`world-currency-title ${theme}`}>World Currency Conversion Rates</h1>
            <Row>
                <Col>
                    <Select
                        options={currencyOptions}
                        isMulti
                        className={`currency-select ${theme}`}
                        classNamePrefix="select"
                        value={selectedCurrencies}
                        onChange={handleCurrencyChange}
                        styles={customStyles}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Bar data={currencyData} options={options} />
                </Col>
            </Row>
        </Container>
    );
};

export default WorldCurrency;