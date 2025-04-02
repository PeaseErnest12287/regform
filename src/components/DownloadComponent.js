// DownloadComponent.js
import React, { useState } from 'react';

const DownloadComponent = () => {
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");

  // Hardcoded credentials
  const correctName = "admin"; // You can change this to any name
  const correctPin = "1234";   // Change this to any PIN

  const handleLogin = () => {
    if (name === correctName && pin === correctPin) {
      setAuthenticated(true);
      setError(""); // Clear error if credentials are correct
    } else {
      setError("Incorrect Name or PIN!");
    }
  };

  const handleDownload = () => {
    // Trigger file download from backend
    window.location.href = "http://localhost:5000/download-excel"; // Replace with your backend URL
  };

  return (
    <div className="download-container">
      {!authenticated ? (
        <div className="auth-box">
          <h3>Enter Name & PIN to Download</h3>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
          <button onClick={handleLogin}>Verify</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      ) : (
        <div>
          <h3>Download Excel File</h3>
          <button onClick={handleDownload}>Download Excel</button>
        </div>
      )}
    </div>
  );
};

export default DownloadComponent;
