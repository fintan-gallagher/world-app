import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../Themes/ThemeContext';
import '../Styles/NavBar.css';

const CustomNavbar = () => {
    const { theme, toggleTheme } = useTheme(); // Get the current theme and toggleTheme function
    const navigate = useNavigate(); // Get the navigate function from react-router-dom

    const handleLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords; // Extract latitude and longitude from the position
                const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=d6afabb114944cc0a46c10fd536f22ef`); // Fetch location data from the OpenCage API
                const data = await response.json(); // Parse the response data
                let country = data.results[0].components.country; // Extract the country name from the response data

                navigate(`/country/${country}`); // Navigate to the country page
            }, (error) => {
                console.error("Error getting location: ", error);
            });
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };

    return (
        <Navbar className={theme === 'light' ? 'navbar-light' : 'navbar-dark'} expand="lg" fixed="top" style={{ zIndex: 1000 }}>
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className="mr-auto">WorldApp</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
                    <Nav className="mx-auto">
                        <Nav.Link as={Link} to="/home">Home</Nav.Link>
                        <Nav.Link as={Link} to="/by-population">By Population</Nav.Link>
                        <Nav.Link as={Link} to="/currency">Currency Conversion</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        <Button onClick={() => { console.log('Toggling theme'); toggleTheme(); }} variant={theme === 'light' ? 'secondary' : 'light'} className="mr-2">
                            {theme === 'light' ? 'DARK Mode' : 'LIGHT Mode'} {/* Display the current theme mode */}
                        </Button>
                        <Button onClick={handleLocationClick} variant={theme === 'light' ? 'secondary' : 'light'}> {/* Button to find the user's country */}
                            Find My Country
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;