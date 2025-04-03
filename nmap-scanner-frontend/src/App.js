import React, { useState } from "react";
import axios from "axios";
import { FaSearch, FaTimesCircle } from "react-icons/fa";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [target, setTarget] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleScan = async () => {
    if (!target.trim()) {
      setError("Please enter a valid IP or domain.");
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await axios.post("http://127.0.0.1:5000/scan", { target });
      setResults(response.data);
    } catch (err) {
      setError("Error scanning target. Ensure it's reachable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5 p-4 rounded bg-dark text-light">
      <h1 className="text-center mb-4">🔍 Network Vulnerability Scanner</h1>

      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Enter IP or Domain (e.g., example.com)"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleScan} disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : <FaSearch />}
        </button>
      </div>

      {error && (
        <div className="alert alert-danger text-center d-flex align-items-center justify-content-between">
          {error}
          <FaTimesCircle onClick={() => setError(null)} style={{ cursor: "pointer" }} />
        </div>
      )}

      {results && (
        <div className="card bg-light text-dark p-4 shadow">
          <h4 className="mb-3 text-primary">Scan Results for: {results.target}</h4>
          <p><strong>Scan Start Time:</strong> {results.scan_start_time}</p>
          <p><strong>Scan End Time:</strong> {results.scan_end_time}</p>
          <p><strong>Duration:</strong> {results.scan_duration}</p>
          <p>
            <strong>Overall Risk Level:</strong> 
            <span className={`badge ms-2 ${
              results.overall_risk_level === "High"
                ? "bg-danger"
                : results.overall_risk_level === "Medium"
                ? "bg-warning"
                : "bg-success"
            }`}>
              {results.overall_risk_level}
            </span>
          </p>
          <p><strong>Tests Performed:</strong> {results.tests_performed}</p>
          
          {Object.keys(results.hosts).map((host) => (
            <div key={host} className="mt-4 p-3 border rounded">
              <h5 className="text-dark">{host} ({results.hosts[host].hostname || "Unknown"})</h5>
              <p>Status: <strong>{results.hosts[host].state}</strong></p>
              {results.hosts[host].ports.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-striped table-hover table-bordered text-center">
                    <thead className="bg-primary text-white">
                      <tr>
                        <th style={{ width: "25%" }}>Port</th>
                        <th style={{ width: "25%" }}>State</th>
                        <th style={{ width: "50%" }}>Service</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.hosts[host].ports.map((port, index) => (
                        <tr key={index}>
                          <td>{port.port}</td>
                          <td>{port.state}</td>
                          <td>{port.service}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : <p>No open ports found.</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
