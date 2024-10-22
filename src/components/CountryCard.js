import { Card } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useTheme } from '../Themes/ThemeContext';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

const CountryCard = (props) => {
    const { name, flag, region } = props;
    const { theme } = useTheme();
    const [open, setOpen] = useState(false);

    return (
        <Card className={`country-card ${theme} h-100 d-flex flex-column `}>
            <Card.Img className='h-100 w-100' src={flag} variant='top'/>
            <Card.Body>
                <Card.Title className="h4 font-weight-bold">
                    <Link to={`/country/${name}`}>{name}</Link>
                </Card.Title>
                <p className="h5 font-weight-bold">{region}</p>
                <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="additional-info"
                    aria-expanded={open}
                >
                    {open ? 'Hide Details' : 'Show Details'}
                </Button>
                <Collapse in={open}>
                    <div id="additional-info">
                        <p className="h5 font-weight-bold">Language: {props.language}</p>
                        <p className="h5 font-weight-bold">Population: {props.population}</p>
                    </div>
                </Collapse>
            </Card.Body>
        </Card>
    )
}

export default CountryCard;