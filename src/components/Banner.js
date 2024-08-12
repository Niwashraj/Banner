import React, { useState, useEffect } from 'react';
import './Banner.css';

const Banner = ({ description, link, timer, isVisible, toggleVisibility }) => {
    const [timeLeft, setTimeLeft] = useState(timer);

    useEffect(() => {
        if (!isVisible) return;
        
        const countdown = setInterval(() => {
            setTimeLeft(prevTime => prevTime > 0 ? prevTime - 1 : 0);
        }, 1000);

        if (timeLeft === 0) {
            clearInterval(countdown);
            toggleVisibility(false);
        }

        return () => clearInterval(countdown);
    }, [timeLeft, isVisible, toggleVisibility]);

    if (!isVisible) return null;

    return (
        <div className="banner">
            <div className="banner-content">
                <p>{description}</p>
                <p className="countdown">{timeLeft} seconds remaining</p>
                <a href={link} target="_blank" rel="noopener noreferrer">Learn More</a>
            </div>
        </div>
    );
};

export default Banner;
