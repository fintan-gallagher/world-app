import React from 'react';
import '../Styles/DigitalClock.css'; // Import the CSS file for styling

const DigitalClock = ({ time }) => {
    return (
        <div className="digital-clock">
            {time}
        </div>
    );
};

export default DigitalClock;