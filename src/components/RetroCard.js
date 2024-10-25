import React from 'react';
import { useTheme } from '../Themes/ThemeContext'; // Import the theme context
import '../Styles/RetroCard.css'; // Import the CSS file for styling

const RetroCard = ({ children }) => {
    const { theme } = useTheme(); // Get the current theme

    return (
        <div className={`retro-card ${theme}`}>
            {children}
        </div>
    );
};

export default RetroCard;