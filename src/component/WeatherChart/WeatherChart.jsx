import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './weather.css'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const WeatherChart = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [alert, setAlert] = useState(false)
    const [loading, setloading] = useState(true)
    const checkAlert = () => {
        const exceedsThreshold = weatherData.some(item => item.averageTemperature > 30);
        if (exceedsThreshold) {
            setAlert(true);
        } else {
            setAlert(false);
        }
    };
    // Fetch weather summary data from the backend
    useEffect(() => {
        const fetchWeatherSummary = async () => {
            try {
                const response = await axios.get('http://localhost:5000/weather-summary');
                setWeatherData(response.data);
                setloading(false)
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };
        checkAlert()
        fetchWeatherSummary();
    }, []);

  
    return (
        <div style={{padding:50,margin:50}}>
      
        <div>
           { alert?(<p style={{color:"red"}}>Temperature rasied above 35 (°C)</p>):(<p style={{color:"green"}}>Temperature is below  35 (°C)</p>)}
        </div>
         <h2>Weather Summary Table</h2>
            <table>
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Average Temp(°C)</th>
                        <th>Max Temp(°C)</th>
                        <th>Min Temp(°C)</th>
                        <th>Dominant Condition</th>
                        <th>clouds %</th>
                        <th>wind(Kph)</th>
                        <th>Humididty %</th>

                    </tr>
                </thead>
               { loading ?(<p style={{color:"blue"}}>Loading data...</p>):(<tbody>
                    {weatherData?.map((data, index) => (
                        <tr key={index}>
                            <td>{data.city}</td>
                            <td>{data.averageTemperature}</td>
                            <td>{data.maxTemperature}</td>
                            <td>{data.minTemperature}</td>
                            <td>{data.dominantCondition}</td>
                            <td>{data.cloud}</td>
                            <td>{data.wind}</td>
                            <td>{data.humidity}</td>

                        </tr>
                    ))}
                </tbody>)}
            </table>
            <div  style={{padding:50,margin:80}}>
            <h2 id="Trend">Trends</h2>

<ResponsiveContainer width="100%" height={400}>
    <LineChart data={weatherData}>
        <CartesianGrid strokeDasharray="33" />
        <XAxis dataKey="city" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="averageTemperature" stroke="#8884d8" name="Avg Temperature (°C)" />
        <Line type="monotone" dataKey="maxTemperature" stroke="#ff7300" name="Max Temperature (°C)" />
        <Line type="monotone" dataKey="minTemperature" stroke="#82ca9d" name="Min Temperature (°C)" />
    </LineChart>
</ResponsiveContainer>

</div>
            </div>
           
    );
};

export default WeatherChart;
