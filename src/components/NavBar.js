import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="navbar mb-4">
            <div className="navbar-logo">
                <Link to="/">WorldApp</Link>
            </div>
           
                <Link to="/">Home</Link>
            
        </nav>
    );
};

export default NavBar;