import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../Themes/ThemeContext';
import '../Styles/NavBar.css'

const CustomNavbar = () => {
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const handleLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=d6afabb114944cc0a46c10fd536f22ef`);
                const data = await response.json();
                const country = data.results[0].components.country;
                navigate(`/country/${country}`);
            }, (error) => {
                console.error("Error getting location: ", error);
            });
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };

    return (
        <Navbar className={theme === 'light' ? 'navbar-light' : 'navbar-dark'} expand="lg" fixed="top">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">WorldApp</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/home">Home</Nav.Link>
                        <Nav.Link as={Link} to="/by-population">By Population</Nav.Link>
                        <Button onClick={toggleTheme} variant={theme === 'light' ? 'secondary' : 'light'}>
                            {theme === 'light' ? 'DARK Mode' : 'LIGHT Mode'}
                        </Button>
                        <Button onClick={handleLocationClick} variant={theme === 'light' ? 'secondary' : 'light'}>
                            Find My Country
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;