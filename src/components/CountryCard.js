import React, { useState } from 'react';
import { Card, Button, Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTheme } from '../Themes/ThemeContext';

const CountryCard = ({ name, flag, region, population, languages }) => {
    const { theme } = useTheme();
    const [open, setOpen] = useState(false);

    // Extract language names from the languages object
    const languageNames = languages ? Object.values(languages).join(', ') : 'N/A';

    return (
        <Card className={`country-card ${theme} h-100 d-flex flex-column`}>
            <Card.Img className='h-100 w-100' src={flag} variant='top'/>
            <Card.Body>
                <Card.Title className="h4 font-weight-bold">
                    <Link className="h3" to={`/country/${name}`}>{name}</Link>
                </Card.Title>
                <h4 className="font-weight-bold">{region}</h4>
                <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="additional-info"
                    aria-expanded={open}
                >
                    {open ? 'Hide Details' : 'Show Details'}
                </Button>
                <Collapse in={open}>
                    <div id="additional-info">
                        <p className="h4 font-weight-bold">Language: {languageNames}</p>
                        <p className="h4 font-weight-bold">Population: {population.toLocaleString()}</p>
                    </div>
                </Collapse>
            </Card.Body>
        </Card>
    );
};

export default CountryCard;