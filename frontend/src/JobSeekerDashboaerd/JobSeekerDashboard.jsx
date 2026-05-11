import { useEffect, useState } from "react";
import axios from "axios";

import JobseekerSidebar from "../JobSeekerDashboaerd/JobseekerSidebar";
import Navbar from "../JobSeekerDashboaerd/Navbar";
import StatCard from "../JobSeekerDashboaerd/StatCard";
import RecommendedJobs from "../JobSeekerDashboaerd/RecommendedJobs";
import RecentApplications from "../JobSeekerDashboaerd/RecentApplications";
import UpcomingInterviews from "../JobSeekerDashboaerd/UpcommingInterviews";

import "../JobSeekerCSS/jobseekerdashboard.css";

function JobSeekerDashboard() {


  console.log("dashboard loading");

  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);



  const [openSidebar, setOpenSidebar] = useState(false);



  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("token");

    const appRes = await axios.get("http://localhost:5000/api/applications/my", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const jobRes = await axios.get(
      "http://localhost:5000/api/jobs",
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    console.log(jobRes.data);
    const savedRes = await axios.get(
      "http://localhost:5000/api/saved-jobs",
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    console.log("jobs:", jobs);
    console.log("applications", applications);
    setApplications(appRes.data);
    setJobs(jobRes.data.jobs);
    setSavedJobs(savedRes.data);
  };


  const interviews = applications.filter(a => a.status === "interview");


  // const appliedJobIds = applications.map(a => a.job._id);
  const appliedJobIds = applications
    .filter(a => a.job)   // remove null jobs
    .map(a => a.job._id);

  const filteredJobs = jobs.filter(
    job => !appliedJobIds.includes(job._id)
  );




  return (

    <div className="layout">

      {/* <JobseekerSidebar/> */}
      <JobseekerSidebar
        openSidebar={openSidebar}
        toggleSidebar={toggleSidebar}
      />



      <div className="main">

        {/* <Navbar/> */}
        <div className="top-bar">

          {/*  HAMBURGER */}
          <div className="menu-btn" onClick={toggleSidebar}>
            ☰
          </div>

          <h2>Welcome back 👋</h2>

        </div>

        <div className="stats">

          <StatCard
            type="applied"
            value={applications.length}
          />

          <StatCard
            type="saved"
            value={savedJobs.length}
          />

          <StatCard
            type="interviews"
            value={interviews.length}
          />

          <StatCard
            type="views"
            value={filteredJobs.length}
          />

        </div>

        <div className="grid">
          <RecommendedJobs jobs={filteredJobs} fetchData={fetchData} />
          <RecentApplications applications={applications} />
          <UpcomingInterviews applications={applications} />
        </div>

      </div>
    </div>
  )
}

export default JobSeekerDashboard