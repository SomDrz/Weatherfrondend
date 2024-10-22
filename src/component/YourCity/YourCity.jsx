import React, { useEffect, useState } from 'react';
import axios from 'axios';

function YourCity() {
  const [data, setData] = useState(""); 
  const [yourCityDetail, setYourCityDetail] = useState(null); 

  const handleInputChange = (e) => {

    setData(e.target.value);
  };

  useEffect(() => {
    const fetchWeatherDetail = async () => {
      if (data.trim()) {
        try {
          console.log(data)
          const response = await axios.get(`http://localhost:5000/your-city-detail?city=${data}`,);
          setYourCityDetail(response.data); 
          console.log(yourCityDetail)
        } catch (err) {
          console.error('Error fetching city weather:', err);
        }
      }
    };

    fetchWeatherDetail();
  }, [data]); 

  return (
    <div >
      <h2>Enter Your City</h2>
      <input 
        type="text" 
       style={{width:350,height:30}}
        placeholder="Eg: Bangalore"
        onChange={handleInputChange} 
        value={data} 
      />

      {yourCityDetail && (
        <div>
  <h3>Weather in {data}</h3>
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
  <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', textAlign: 'center', width: '50%' }}>
    <thead>
      <tr>
        <th colSpan="2"> {data}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Temperature</td>
        <td>{yourCityDetail.temperature}°C</td>
      </tr>
      <tr>
        <td>Condition</td>
        <td>{yourCityDetail.condition}</td>
      </tr>
      <tr>
        <td>Cloud</td>
        <td>{yourCityDetail.clouds}%</td>
      </tr>
      <tr>
        <td>Humidity</td>
        <td>{yourCityDetail.humidity}%</td>
      </tr>
    </tbody>
  </table>
</div>

</div>

      )}

    </div>
  );
}

export default YourCity;
