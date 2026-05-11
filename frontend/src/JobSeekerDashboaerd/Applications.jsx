import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../JobSeekerDashboaerd/JobseekerSidebar";

import "../JobSeekerCSS/jobseekerdashboard.css";

function Applications() {

  const [applications, setApplications] = useState([]);

  // Sidebar state (for mobile)
  const [openSidebar, setOpenSidebar] = useState(false);

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/applications/my",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setApplications(res.data);

    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  return (
    <div className="layout">

      {/*  Sidebar */}
      <Sidebar 
        openSidebar={openSidebar} 
        toggleSidebar={toggleSidebar} 
      />

      <div className="main">

        {/* Top Bar (Hamburger + Title) */}
        <div className="top-bar">
          <div className="menu-btn" onClick={toggleSidebar}>☰</div>
          <h2>My Applications</h2>
        </div>

        {/* Applications List */}
        <div className="applications-container">

          {applications.length === 0 ? (
            <p className="no-data">No applications yet</p>
          ) : (
            applications
              .filter(app => app.job)
              .map(app => (
                <div className="app-card" key={app._id}>

                  <div className="app-header">
                    <h3>{app.job.title}</h3>

                    <span className={`status ${app.status}`}>
                      {app.status}
                    </span>
                  </div>

                  <p className="company">{app.job.company}</p>

                  <div className="app-meta">
                    <span>📍 {app.job.location}</span>
                  </div>

                </div>
              ))
          )}

        </div>

      </div>
    </div>
  );
}

export default Applications;