import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import SingleCountry from './pages/SingleCountry';
import SplashPage from './components/SplashPage';
import ByPopulation from './pages/ByPopulation';
import WorldCurrency from './pages/WorldCurrency';
import './App.css'; // Import the CSS file for transitions

const AppContent = () => {
    const location = useLocation();

    return (
        <TransitionGroup>
            <CSSTransition key={location.key} classNames="fade" timeout={300}>
                <Routes location={location}>
                    <Route path="/" element={<SplashPage />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/country/:name" element={<SingleCountry />} />
                    <Route path="/by-population" element={<ByPopulation />} />
                    <Route path="/currency" element={<WorldCurrency />} />
                </Routes>
            </CSSTransition>
        </TransitionGroup>
    );
};

const App = () => {
    return (
        <Router>
            <NavBar />
            <Container>
                <AppContent />
            </Container>
        </Router>
    );
};

export default App;