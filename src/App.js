import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import SingleCountry from './pages/SingleCountry';
import SplashPage from './pages/SplashPage';
import ByPopulation from './pages/ByPopulation';
import WorldCurrency from './pages/WorldCurrency';
import './App.css'; // Import the CSS file for transitions

const AppContent = () => {
    const location = useLocation(); // Get the current location

    return (
        <TransitionGroup> {/* Wrap the routes in a TransitionGroup for animations */}
            <CSSTransition key={location.key} classNames="fade" timeout={300}> {/* Apply fade transition */}
                <Routes location={location}> {/* Render the routes based on the current location */}
                    <Route path="/" element={<SplashPage />} /> {/* Route for the SplashPage component */}
                    <Route path="/home" element={<Home />} /> {/* Route for the Home component */}
                    <Route path="/country/:name" element={<SingleCountry />} /> {/* Route for the SingleCountry component */}
                    <Route path="/by-population" element={<ByPopulation />} /> {/* Route for the ByPopulation component */}
                    <Route path="/currency" element={<WorldCurrency />} /> {/* Route for the WorldCurrency component */}
                </Routes>
            </CSSTransition>
        </TransitionGroup>
    );
};

const App = () => {
    return (
        <Router> {/* Wrap the application in a Router component */}
            <NavBar /> {/* Render the NavBar component */}
            <Container> {/* Wrap the content in a Container component */}
                <AppContent /> {/* Render the AppContent component */}
            </Container>
        </Router>
    );
};

export default App;