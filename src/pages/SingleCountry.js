import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Image } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import LocalWeatherCard from '../components/LocalWeatherCard';

const SingleCountry = () => {
    const { name } = useParams();
    const [country, setCountry] = useState(null);
    const [localTime, setLocalTime] = useState('');
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
            .then((res) => {
                console.log('Country Response:', res.data[0]);
                setCountry(res.data[0]);
            })
            .catch((e) => {
                console.error(e);
            });
    }, [name]);

    

    if (!country) {
        return <div>Loading...</div>;
    }

    const position = [country.latlng[0], country.latlng[1]];

    return (
        <Row>
            <Col>
                <Image src={country.flags.png} alt={`${country.name.common}'s flag`} fluid />
            </Col>
            <Col>
                <h1>{country.name.common}</h1>
                <h2>Official Name: {country.name.official}</h2>
                <p>Region: {country.region}</p>
                {country.subregion && <p>Sub Region: {country.subregion}</p>}
                <p>Currency: {Object.values(country.currencies)[0].name} ({Object.values(country.currencies)[0].symbol})</p>
                <h1>Languages:</h1>
                <ul>
                    {Object.values(country.languages).map((language, index) => (
                        <li key={index}>{language}</li>
                    ))}
                </ul>
                <h1>Map:</h1>
                <MapContainer center={position} zoom={5} style={{ height: '400px', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={position}>
                        <Popup>
                            {country.name.common}
                        </Popup>
                    </Marker>
                </MapContainer>
                <LocalWeatherCard lat={country.latlng[0]} lon={country.latlng[1]} />
            </Col>
        </Row>
    );
}

export default SingleCountry;