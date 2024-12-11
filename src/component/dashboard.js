import React, { useEffect, useState } from "react";
import { FaClock, FaMicrochip, FaMemory, FaBatteryHalf, FaMapMarkerAlt, FaThermometerHalf, FaChartBar } from "react-icons/fa";
import "../App.css"; // Create a CSS file to style the dashboard

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

  const Card = ({ icon, title, value, color, isProgress }) => (
    <div
      className="card"
      style={{
        borderLeft: `5px solid ${color}`,
        height: "200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div className="card-icon" style={{ color: color, fontSize: "2rem" }}>
        {icon}
      </div>
      <div className="card-content">
        <h3 style={{ margin: "0 0 10px 0" }}>{title}</h3>
        {isProgress ? (
          <div className="progress-bar" style={{ height: "20px", backgroundColor: "#e0e0e0", borderRadius: "10px" }}>
            <div
              className="progress-fill"
              style={{
                width: `${value}%`,
                backgroundColor: color,
                height: "100%",
                borderRadius: "10px",
              }}
            ></div>
          </div>
        ) : (
          <p style={{ fontSize: "1.5rem", margin: "0" }}>{value}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="dashboard">
      <h1>System Resource Dashboard</h1>
      <div
        className="card-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        <Card
          icon={<FaClock />}
          title="Current Time"
          value={systemData.time || "--:--:--"}
          color="#4CAF50"
        />
        <Card
          icon={<FaMicrochip />}
          title="Python Version"
          value={systemData.python_version || "N/A"}
          color="#FF9800"
        />
        <Card
          icon={<FaBatteryHalf />}
          title="Battery Status"
          value={systemData.battery_status || 0}
          color="#2196F3"
          isProgress
        />
        <Card
          icon={<FaThermometerHalf />}
          title="CPU Temperature"
          value={`${systemData.cpu_temperature || "N/A"}°C`}
          color="#F44336"
        />
        <Card
          icon={<FaChartBar />}
          title="CPU Usage"
          value={systemData.cpu_usage || 0}
          color="#9C27B0"
          isProgress
        />
        <Card
          icon={<FaMemory />}
          title="RAM Usage"
          value={systemData.ram_usage || 0}
          color="#673AB7"
          isProgress
        />
        <Card
          icon={<FaMicrochip />}
          title="GPU Usage"
          value={systemData.gpu_usage || "N/A"}
          color="#03A9F4"
        />
        <Card
          icon={<FaMapMarkerAlt />}
          title="Location"
          value={systemData.location || "Unknown"}
          color="#FFC107"
        />
      </div>
    </div>
  );
}

export default App;
