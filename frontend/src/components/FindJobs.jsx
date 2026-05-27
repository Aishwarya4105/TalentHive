import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/FindJobs.css";
import axios from "axios";

function FindJobs() {
  const [jobs, setJobs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [saved, setSaved] = useState({});
  const [selectedJob, setSelectedJob] = useState(null);
  const [openSearch, setOpenSearch] = useState(false);
  const locationData = useLocation();
   const queryParams = new URLSearchParams(locationData.search);
    const searchKeyword = queryParams.get("keyword");
    const [applied, setApplied] = useState(false);

    



  const fetchJobs = () => {
    fetch(
      `http://localhost:5000/api/jobs?keyword=${keyword}&location=${location}`
    )
      .then((res) => res.json())
      .then((data) => setJobs(data.jobs));
  };
  useEffect(() => {

  if (searchKeyword) {
    setKeyword(searchKeyword);
  }

}, [searchKeyword]);

  useEffect(() => {
    fetchJobs();
  }, [keyword, location]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelectedJob(null);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);


  useEffect(() => {

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

        const savedMap = {};

        res.data.forEach((item) => {
          savedMap[item.job._id] = true;
        });

        setSaved(savedMap);

      } catch (error) {
        console.log(error);
      }
    };

    fetchSavedJobs();

  }, []);



  const getDaysAgo = (date) => {

  const created = new Date(date);

  const now = new Date();

  const diffTime = now - created;

  const diffDays = Math.floor(
    diffTime / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 0) {
    return "Today";
  }

  if (diffDays === 1) {
    return "1 day ago";
  }

  return `${diffDays} days ago`;
};

  return (
    <div className="job-container">
      {/* <h2>Find Jobs</h2> */}

      {/*  SEARCH BAR */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search job title..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button onClick={fetchJobs}>Search</button>
      </div>

      <div className="job-grid">
        {selectedJob && (
          <div className="modal-overlay" onClick={() => setSelectedJob(null)}>

            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >

              {/*  CLOSE */}
              <span
                className="close-btn"
                onClick={() => setSelectedJob(null)}
              >
                ✕
              </span>

              <h2>{selectedJob.title}</h2>
              <p className="company">{selectedJob.company}</p>

              <div className="modal-info">
                <span>📍 {selectedJob.location}</span>
                <span className="salary">₹{selectedJob.salary}</span>
              </div>

              <div className="modal-desc">
                <h4>Job Description</h4>
                <p>
                  {selectedJob.description || "No description provided."}
                </p>
              </div>

              {/* <button className="apply-btn">Apply Now</button> */}

              <button
  className={`apply-btn ${applied ? "applied" : ""}`}
  onClick={() => setApplied(true)}
>
  {applied ? "Applied" : "Apply Now"}
</button>
            </div>

          </div>
        )}
        {jobs.length === 0 ? (
          <p className="no-jobs">No jobs found 😔</p>
        ) : (
          jobs.map((job) => (


            <div className="job-card" key={job._id} onClick={() => setSelectedJob(job)}>

              {/* 🔹 TOP ROW */}
              <div className="job-top">
                <div className="job-left">

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
                    <p className="company">{job.company}</p>
                  </div>
                </div>

                <div
                  className="bookmark"
                  onClick={async (e) => {

                    e.stopPropagation();

                    try {

                      const token = localStorage.getItem("token");

                      const res = await axios.post(
                        `http://localhost:5000/api/saved-jobs/${job._id}`,
                        {},
                        {
                          headers: {
                            Authorization: `Bearer ${token}`
                          }
                        }
                      );

                      setSaved(prev => ({
                        ...prev,
                        [job._id]: res.data.saved
                      }));

                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  {saved[job._id] ? "❤️" : "🤍"}
                </div>
              </div>

              {/* 🔹 INFO */}
              <div className="job-info">
                <span>📍 {job.location}</span>
                <span className="salary">₹{job.salary}</span>
              </div>

              {/* 🔹 TAGS */}
              <div className="job-tags">
                <span>Full-time</span>
                <span>Remote</span>
              </div>

              {/* 🔹 FOOTER */}
              <div className="job-footer">
              <span className="time">
  {getDaysAgo(job.createdAt)}
</span>
                <button onClick={(e) => e.stopPropagation()}>Apply</button>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FindJobs;