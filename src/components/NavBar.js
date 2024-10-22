import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTheme } from '../Themes/ThemeContext';

const CustomNavbar = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Navbar bg={theme === 'light' ? 'light' : 'dark'} variant={theme === 'light' ? 'light' : 'dark'} expand="lg" fixed="top" className=''>
            <Container fluid>
                <Navbar.Brand as={Link} to="/">MyApp</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/home">Home</Nav.Link>
                        <Nav.Link as={Link} to="/by-population">By Population</Nav.Link>
                        <Button onClick={toggleTheme} variant={theme === 'light' ? 'secondary' : 'light'}>
                            {theme === 'light' ? 'Night Mode' : 'Day Mode'}
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;