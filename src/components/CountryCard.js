import { Card } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useTheme } from '../Themes/ThemeContext';

const CountryCard = (props) => {
    const {name, flag, region} = props;
    const { theme } = useTheme();
    
    return (
        <Card className={`country-card ${theme} h-100 d-flex flex-column `}>
            <Card.Img className='h-100 w-100' src={flag} variant='top'/>
            <Card.Body>
                <Card.Title>
                    <Link to={`/country/${name}`}>{props.name}</Link>
                </Card.Title>
                <p>{region}</p>
            </Card.Body>
        </Card>
    )
}

export default CountryCard;