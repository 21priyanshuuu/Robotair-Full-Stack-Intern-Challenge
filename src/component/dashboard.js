import React, { useEffect, useState } from 'react';

function App() {
  const [systemData, setSystemData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/system_data");
        const data = await response.json();
        console.log(data);  
        setSystemData(data);
      } catch (error) {
        console.error("Error fetching system data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000); 

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>System Resource Dashboard</h1>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Resource</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Current Time</td>
            <td>{systemData.time}</td>
          </tr>
          <tr>
            <td>Python Version</td>
            <td>{systemData.python_version}</td>
          </tr>
          <tr>
            <td>Battery Status</td>
            <td>{systemData.battery_status}%</td>
          </tr>
          <tr>
            <td>CPU Temperature</td>
            <td>{systemData.cpu_temperature}°C</td>
          </tr>
          <tr>
            <td>CPU Usage</td>
            <td>{systemData.cpu_usage}%</td>
          </tr>
          <tr>
            <td>RAM Usage</td>
            <td>{systemData.ram_usage}%</td>
          </tr>
          <tr>
            <td>GPU Usage</td>
            <td>{systemData.gpu_usage}</td>
          </tr>
          <tr>
            <td>Location</td>
            <td>{systemData.location}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
