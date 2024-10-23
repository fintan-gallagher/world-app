import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Image } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// components
import LocalWeatherCard from '../components/LocalWeatherCard';
import LocalTimeCard from '../components/LocalTimeCard';
import LocalNewsCard from '../components/LocalNewsCard';
import LocalDishesCard from '../components/LocalDishesCard';

// Map Icon Fix
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';



delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});
/////

const SingleCountry = () => {
    const { name } = useParams();
    const [country, setCountry] = useState(null);

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
    const timezone = `${country.region}/${country.capital}`;
    console.log('Timezone:', timezone); // Add logging to verify the timezone value

    return (
        <Row className='mt-5'>
            <Col>
                <Image src={country.flags.png} alt={`${country.name.common}'s flag`} fluid />
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
            </Col>
            <Col>
                <h1>{country.name.common}</h1>
                <h2>Official Name: {country.name.official}</h2>
                <h4>Region: {country.region}</h4>
                {country.subregion && <h4>Sub Region: {country.subregion}</h4>}
                <h4>Currency: {Object.values(country.currencies)[0].name} ({Object.values(country.currencies)[0].symbol})</h4>
                <h1>Languages:</h1>
                <ul>
                    {Object.values(country.languages).map((language, index) => (
                        <li className='h4' key={index}>{language}</li>
                    ))}
                </ul>
                
                <LocalWeatherCard lat={country.latlng[0]} lon={country.latlng[1]} />
                <LocalTimeCard country={country} />
                
            </Col>
            <LocalNewsCard country={country.cca2.toLowerCase()} className='mt-5' />
                <LocalDishesCard country={country.demonyms.eng.f} />
        </Row>
    );
};

export default SingleCountry;