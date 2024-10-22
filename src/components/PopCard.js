import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTheme } from '../Themes/ThemeContext';

const PopCard = ({ name, flag, region, population }) => {
    const { theme } = useTheme();

    return (
        <Card className={`country-card ${theme} h-100 d-flex flex-column `}>
            <Card.Img className='card-img-top' src={flag} variant='top' />
            <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title>
                    <Link to={`/country/${name}`}>{name}</Link>
                </Card.Title>
                <div>
                    <p>Region: {region}</p>
                    <p>Population: {population.toLocaleString()}</p>
                </div>
            </Card.Body>
        </Card>
    );
};

export default PopCard;