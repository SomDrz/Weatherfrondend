// src/App.js
import React from 'react';
import WeatherChart from './component/WeatherChart/WeatherChart';
import Home from "./component/Home/Home"
import YourCity from './component/YourCity/YourCity';
import './App.css';

function App() {
    return (
        <div className="App">
                       <Home/>
                       <YourCity/>

            <WeatherChart />
        </div>
    );
}

export default App;
