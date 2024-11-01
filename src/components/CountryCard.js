import React, { useState } from 'react';
import { Card, Button, Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTheme } from '../Themes/ThemeContext';
import LocalTimeCard from '../components/LocalTimeCard';

import '../Styles/CountryCard.css';

const CountryCard = ({ name, flag, region, population, languages, country }) => {
    const { theme } = useTheme(); // Get the current theme
    const [open, setOpen] = useState(false); // State for collapse

    const languageNames = languages ? Object.values(languages).join(', ') : 'N/A'; // Get language names

    return (
        <Card className={`country-card ${theme} h-100 d-flex flex-column`}> {/* Apply theme class to the card */}
            <Card.Img className='h-100 w-100' src={flag} variant='top'/> {/* Display country flag */}
            <Card.Body>
                <Card.Title className="h4 font-weight-bold">
                    <Link className="h3" to={`/country/${name}`}>{name}</Link> {/* Link to country details */}
                </Card.Title>
                <h4 className="font-weight-bold">{region}</h4> {/* Display region */}
                <Button
                    onClick={() => setOpen(!open)} // Toggle collapse
                    aria-controls="additional-info"
                    aria-expanded={open}
                >
                    {open ? 'Hide Details' : 'Show Details'} {/* Button text */}
                </Button>
                <Collapse in={open}>
                    <div id="additional-info">
                        <p className="h4 font-weight-bold">Language: {languageNames}</p> {/* Display languages */}
                        <p className="h4 font-weight-bold">Population: {population.toLocaleString()}</p> {/* Display population */}
                        <LocalTimeCard country={country} showFullDateTime={false} /> {/* Render the LocalTimeCard component */}
                    </div>
                </Collapse>
            </Card.Body>
        </Card>
    );
};

export default CountryCard;