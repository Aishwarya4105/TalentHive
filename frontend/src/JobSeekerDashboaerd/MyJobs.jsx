import { useEffect, useState } from "react";
import axios from "axios";
import "./MyJobs.css";

function MyJobs() {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/jobs",
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setJobs(res.data.jobs);
  };

  const deleteJob = async (id) => {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/api/jobs/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    fetchJobs();
  };

  return (
    <div className="myjobs-container">

      <h2>My Jobs</h2>

      {jobs.map(job => (
        <div className="job-card" key={job._id}>

          <h3>{job.title}</h3>
          <p><b>Location:</b> {job.location}</p>
          <p><b>Salary:</b> {job.salary}</p>

          <div className="buttons">
            <button className="delete" onClick={() => deleteJob(job._id)}>
              Delete
            </button>
          </div>

        </div>
      ))}

    </div>
  );
}

export default MyJobs;