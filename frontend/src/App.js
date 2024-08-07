import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/Events/')
            .then(response => {
                setMessage(response.data[1].EventName);
            })
            .catch(error => {
                console.error("There was an error!", error);
            });
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <p>{message}</p>
            </header>
        </div>
    );
}

export default App;
