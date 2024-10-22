import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { useTheme } from '../Themes/ThemeContext';
import '../Styles/SplashPage.css'; // Import the CSS file

const SplashPage = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const [props, set] = useSpring(() => ({ opacity: 1 }));

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'light') {
            root.style.setProperty('--background-color', 'var(--background-color-light)');
            root.style.setProperty('--background-image', 'var(--background-image-light)');
        } else {
            root.style.setProperty('--background-color', 'var(--background-color-dark)');
            root.style.setProperty('--background-image', 'var(--background-image-dark)');
        }
    }, [theme]);

    const handleClick = () => {
        set({ opacity: 0 });
        setTimeout(() => {
            navigate('/home'); // Use navigate directly
        }, 500); // Match this duration with the animation duration
    };

    return (
        <animated.div style={props} className="splash-page" onClick={handleClick}>
            {/* Use a div with background-image instead of img */}
        </animated.div>
    );
};

export default SplashPage;