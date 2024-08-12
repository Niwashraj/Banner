import React, { useState, useEffect } from 'react';
import Banner from './components/Banner';
import Dashboard from './components/Dashboard';
import axios from 'axios';
import './App.css';

function App() {
    const [bannerData, setBannerData] = useState({
        description: '',
        link: '',
        timer: 60,
        isVisible: false,
    });

    useEffect(() => {
        axios.get('http://localhost:5000/getBanner')
            .then(response => {
                setBannerData(response.data);
            })
            .catch(error => console.error('Error fetching banner data:', error));
    }, []);

    const updateBanner = (data) => {
        setBannerData(data);
    };

    return (
        <div className="App">
            <Banner 
                description={bannerData.description}
                link={bannerData.link}
                timer={bannerData.timer}
                isVisible={bannerData.isVisible}
                toggleVisibility={(visibility) => setBannerData({ ...bannerData, isVisible: visibility })}
            />
            <div className="content">
                <Dashboard updateBanner={updateBanner} />
            </div>
        </div>
    );
}

export default App;
