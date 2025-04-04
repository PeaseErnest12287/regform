import React, { useState } from 'react';
import './DownloadComponent.css'; // Create this CSS file (code provided below)

const DownloadComponent = () => {
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const correctName = "admin";
  const correctPin = "1234";

  const handleLogin = (e) => {
    e.preventDefault();
    if (name === correctName && pin === correctPin) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect credentials");
      // Shake animation on error
      const box = document.querySelector('.auth-box');
      box.classList.add('shake');
      setTimeout(() => box.classList.remove('shake'), 500);
    }
  };

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/download-excel", {
        headers: { 'Authorization': 'Basic ' + btoa('admin:1234') }
      });

      if (!response.ok) throw new Error(await response.text());

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "conference_registrations.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(`Download failed: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="download-container">
      <div className="card">
        <div className="header">
          <h2>Conference Data Portal</h2>
          <div className="logo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM8 15c0-1.66 1.34-3 3-3 .35 0 .69.07 1 .18V6h5v2h-3v7.03c-.02 1.64-1.35 2.97-3 2.97-1.66 0-3-1.34-3-3z"/>
            </svg>
          </div>
        </div>

        {!authenticated ? (
          <form className="auth-box" onSubmit={handleLogin}>
            <h3>Admin Access Required</h3>
            
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter admin username"
                required
              />
            </div>

            <div className="input-group">
              <label>PIN</label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter secure PIN"
                required
              />
            </div>

            <button type="submit" className="auth-button">
              Verify Identity
            </button>

            {error && <div className="error-message">{error}</div>}
          </form>
        ) : (
          <div className="download-section">
            <div className="success-message">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span>Access Granted</span>
            </div>

            <button 
              onClick={handleDownload} 
              className="download-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Preparing Download...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                  </svg>
                  Download Excel File
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DownloadComponent;