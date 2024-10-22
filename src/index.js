import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeProvider, useTheme } from './Themes/ThemeContext';

const RootComponent = () => {
    const { theme } = useTheme();

    useEffect(() => {
        document.body.className = theme === 'light' ? 'light-mode' : 'dark-mode';
    }, [theme]);

    return <App />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <RootComponent />
    </ThemeProvider>
  </React.StrictMode>
);