import React, { useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = ({ updateBanner }) => {
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [timer, setTimer] = useState(60);
    const [isVisible, setIsVisible] = useState(true);

    const handleUpdate = () => {
        axios.post('http://localhost:5000/updateBanner', { description, link, timer, isVisible })
            .then(response => {
                updateBanner(response.data);
            })
            .catch(error => console.error('Error updating banner:', error));
    };

    return (
        <div className="dashboard">
            <h1>WelCome To Banner Dashboard</h1>
            <div className="form-group">
                <label>Description Of Banner</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Please provide The Link </label>
                <input type="text" value={link} onChange={(e) => setLink(e.target.value)} />
            </div>
            <div className="form-group">
                <label>For how much Timer (seconds)</label>
                <input type="number" value={timer} onChange={(e) => setTimer(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Visibility</label>
                <input type="checkbox" checked={isVisible} onChange={(e) => setIsVisible(e.target.checked)} />
            </div>
            <button onClick={handleUpdate}>Update Your Banner</button>
        </div>
    );
};

export default Dashboard;
