import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../JobSeekerDashboaerd/JobseekerSidebar";

import "../JobSeekerCSS/jobseekerdashboard.css";
import "../styles/FindJobs.css";

function SavedJobs() {

  const [savedJobs, setSavedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  // SIDEBAR
  const [openSidebar, setOpenSidebar] = useState(false);

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };


  const fetchSavedJobs = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/saved-jobs",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSavedJobs(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  useEffect(() => {

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setSelectedJob(null);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () =>
      window.removeEventListener("keydown", handleEsc);

  }, []);

  const removeSavedJob = async (jobId) => {

    try {

      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:5000/api/saved-jobs/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // close modal
      setSelectedJob(null);

      // refresh
      fetchSavedJobs();

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="layout">

      {/* SIDEBAR */}
      <Sidebar
        openSidebar={openSidebar}
        toggleSidebar={toggleSidebar}
      />

      {/* MAIN */}
      <div className="main">

        {/* HEADER */}
        <div className="header">

          <div className="left">

            <span
              className="menu-btn"
              onClick={toggleSidebar}
            >
              ☰
            </span>

          </div>

        </div>

        {/* PAGE */}
        <div className="job-container">

          {/* HERO */}
          <div className="companies-hero">

            <h1>Saved Jobs ❤️</h1>

            <p>
              Your bookmarked opportunities
            </p>

          </div>

          {/* MODAL */}
          {selectedJob && (

            <div
              className="modal-overlay"
              onClick={() => setSelectedJob(null)}
            >

              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >

                <span
                  className="close-btn"
                  onClick={() => setSelectedJob(null)}
                >
                  ✕
                </span>

                <h2>{selectedJob.title}</h2>

                <p className="company">
                  {selectedJob.company}
                </p>

                <div className="modal-info">

                  <span>
                    📍 {selectedJob.location}
                  </span>

                  <span className="salary">
                    ₹{selectedJob.salary}
                  </span>

                </div>

                <div className="modal-desc">

                  <h4>Job Description</h4>

                  <p>
                    {selectedJob.description ||
                      "No description provided."}
                  </p>

                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    marginTop: "20px"
                  }}
                >

                  <button className="apply-btn">
                    Apply Now
                  </button>

                  <button
                    className="apply-btn"
                    onClick={() =>
                      removeSavedJob(selectedJob._id)
                    }
                  >
                    Remove Saved
                  </button>

                </div>

              </div>

            </div>
          )}

          {/* JOB GRID */}
          <div className="job-grid">

            {savedJobs.length === 0 ? (

              <p className="no-jobs">
                No saved jobs yet ❤️
              </p>

            ) : (

              savedJobs.map((item) => {

                const job = item.job;

                return (

                  <div
                    className="job-card"
                    key={job._id}
                    onClick={() => setSelectedJob(job)}
                  >

                    {/* TOP */}
                    <div className="job-top">

                      <div className="job-left">

                        {/* LOGO */}
                        <div className="company-logo">

                          {job.company_logo ? (

                            <img
                              src={`http://localhost:5000/${job.company_logo}`}
                              alt="logo"
                            />

                          ) : (

                            job.company?.charAt(0)

                          )}

                        </div>

                        <div>

                          <h3>{job.title}</h3>

                          <p className="company">
                            {job.company}
                          </p>

                        </div>

                      </div>

                      {/* SAVED ICON */}
                      <div className="bookmark">
                        ❤️
                      </div>

                    </div>

                    {/* INFO */}
                    <div className="job-info">

                      <span>
                        📍 {job.location}
                      </span>

                      <span className="salary">
                        ₹{job.salary}
                      </span>

                    </div>

                    {/* TAGS */}
                    <div className="job-tags">

                      <span>Full-time</span>

                      <span>Remote</span>

                    </div>

                    {/* FOOTER */}
                    <div className="job-footer">

                      <span className="time">
                        Saved Job
                      </span>

                      <button
                        onClick={(e) =>
                          e.stopPropagation()
                        }
                      >
                        Apply
                      </button>

                    </div>

                  </div>
                );
              })
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default SavedJobs;