import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Container, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const WorldCurrency = () => {
    const [currencyData, setCurrencyData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedCurrencies, setSelectedCurrencies] = useState([
        { value: 'EUR', label: 'Euro' },
        { value: 'GBP', label: 'Pound Sterling' },
    ]);

    useEffect(() => {
        const fetchCurrencyData = async () => {
            try {
                const API_KEY = '52d3aa3bcd2f06a51ab83c0f'; // Replace with your actual API key
                const url = `http://localhost:5000/currency?apiKey=${API_KEY}`;
                const response = await axios.get(url);
                const rates = response.data.conversion_rates;

                const labels = selectedCurrencies.map(currency => currency.value);
                const data = labels.map(label => rates[label]);

                setCurrencyData({
                    labels,
                    datasets: [
                        {
                            label: 'Currency Conversion Rates (USD)',
                            data,
                            backgroundColor: 'rgba(130, 87, 109, 0.8)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch currency data');
                setLoading(false);
            }
        };

        fetchCurrencyData();
    }, [selectedCurrencies]);

    const handleCurrencyChange = (selectedOptions) => {
        setSelectedCurrencies(selectedOptions);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const currencyOptions = [
        { value: 'USD', label: 'US Dollar' },
        { value: 'EUR', label: 'Euro' },
        { value: 'JPY', label: 'Japanese Yen' },
        { value: 'GBP', label: 'Pound Sterling' },
        { value: 'CHF', label: 'Swiss Franc' },
        { value: 'AUD', label: 'Australian Dollar' },
        { value: 'CAD', label: 'Canadian Dollar' },
        
    ];

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Currency',
                    font: {
                        family: 'MingLiu, sans-serif', // Set the desired font family
                    },
                },
                ticks: {
                    font: {
                        family: 'MingLiu, sans-serif', // Set the desired font family
                    },
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'US Dollar',
                    font: {
                        family: 'MingLiu, sans-serif', // Set the desired font family
                    },
                },
                ticks: {
                    font: {
                        family: 'MingLiu, sans-serif', // Set the desired font family
                    },
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        family: 'MingLiu, sans-serif', // Set the desired font family
                    },
                },
            },
            tooltip: {
                bodyFont: {
                    family: 'MingLiu, sans-serif', // Set the desired font family
                },
                titleFont: {
                    family: 'MingLiu, sans-serif', // Set the desired font family
                },
            },
        },
    };

    return (
        <Container className='mt-5'>
            <Row>
                <Col>
                    <h2>Real-Time Currency Conversion Rates</h2>
                    <Select
                        isMulti
                        value={selectedCurrencies}
                        onChange={handleCurrencyChange}
                        options={currencyOptions}
                    />
                    <Bar data={currencyData} options={options} />
                </Col>
            </Row>
        </Container>
    );
};

export default WorldCurrency;