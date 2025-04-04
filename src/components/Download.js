import React, { useState } from "react";

const Download = () => {
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");

  // Hardcoded credentials
  const correctName = "Amani"; // Change as needed
  const correctPin = "1234567";   // Change as needed

  const handleLogin = () => {
    if (name === correctName && pin === correctPin) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect Name or PIN!");
    }
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
          <a href="https://regbackend-ofty.onrender.com/download" download>
            <button>Download Excel</button>
          </a>
        </div>
      )}
    </div>
  );
};

export default Download;