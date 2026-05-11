import "../RecruiterDashboard_CSS/DashboardCards.css";
import { FaBriefcase, FaUsers } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";

import { useEffect, useState } from "react";
import axios from "axios";

function DashboardCards() {

  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    closedJobs: 0,
    totalApplicants: 0
  });

  useEffect(() => {

    axios.get("http://localhost:5000/api/recruiter/dashboard-stats", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => {
      setStats(res.data);
    })
    .catch(err => {
      console.log(err);
    });

  }, []);

  return (

    <div className="Rec-cards-container">

      {/* Total Jobs */}
      <div className="Rec-card">
        <FaBriefcase className="card-icon blue" />
        <h4>Total Jobs</h4>
        <h2>{stats.totalJobs}</h2>
      </div>

      {/* Active Jobs */}
      <div className="Rec-card">
        <FaCheckCircle className="card-icon green" />
        <h4>Active Jobs</h4>
        <h2>{stats.activeJobs}</h2>
      </div>

      {/* Closed Jobs */}
      <div className="Rec-card">
        <FaTimesCircle className="card-icon red" />
        <h4>Closed Jobs</h4>
        <h2>{stats.closedJobs}</h2>
      </div>

      {/* Total Applicants */}
      <div className="Rec-card">
        <FaUsers className="card-icon purple" />
        <h4>Total Applicants</h4>
        <h2>{stats.totalApplicants}</h2>
      </div>

    </div>

  );
}

export default DashboardCards;  