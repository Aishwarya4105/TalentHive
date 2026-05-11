import "../RecruiterDashboard_CSS/ManageJobs.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function JobsTable({ showPagination = true, limit = null }) {

  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 4;

  //  Fetch Jobs
  const fetchJobs = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/recruiter/jobs",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      const sortedJobs = res.data.jobs.reverse();
      setJobs(sortedJobs);
      setFilteredJobs(sortedJobs);

    } catch (error) {
      console.log(error);
    }
  };

  //  Fetch Applications
  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/applications/recruiter",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setApplications(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

  // Search + Filter
  useEffect(() => {
    let temp = [...jobs];


    if (search) {
  temp = temp.filter(job =>
    job.title?.toLowerCase().trim().includes(
      search.toLowerCase().trim()
    )
  );
}

    if (statusFilter !== "All") {
      temp = temp.filter(job =>
        job.status?.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    setFilteredJobs(temp);
    setCurrentPage(1);

  }, [search, statusFilter, jobs]);

  //  Pagination
  const indexOfLast = currentPage * jobsPerPage;
  const indexOfFirst = indexOfLast - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

const displayedJobs = limit
  ? filteredJobs.slice(0, limit)   // for dashboard
  : showPagination
    ? currentJobs                  // for paginated page
    : filteredJobs;                //  for full list (no pagination)

  //  Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/jobs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setJobs(jobs.filter(job => job._id !== id));

    } catch (error) {
      console.log(error);
    }
  };

  //  Toggle Status
  const handleStatusToggle = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/jobs/${id}/status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setJobs(jobs.map(job =>
        job._id === id ? res.data : job
      ));

    } catch (error) {
      console.log(error);
    }
  };

  //  Applicant Count
  const getApplicantCount = (jobId) => {
    return applications.filter(app => app.job?._id === jobId).length;
  };

  return (
    <div className="manage-jobs">

      <h3>Manage Jobs</h3>

      <div className="job-controls">

        <input
          type="text"
          placeholder="Search Job Title..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All</option>
          <option>Active</option>
          <option>Closed</option>
        </select>

        <button className="post-btn" onClick={() => navigate("/post-job")}>
          + Post New Job
        </button>

      </div>
<div className="table-wrapper">
      <table className="jobs-table">

        <thead>
          <tr>
            <th>Job Title</th>
            <th>Location</th>
            <th>Applicants</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {displayedJobs.length === 0 ? (
            <tr>
              <td colSpan="5">No jobs found</td>
            </tr>
          ) : (

            displayedJobs.map(job => (

              <tr key={job._id}>

                <td>{job.title}</td>
                <td>{job.location}</td>

                <td>{getApplicantCount(job._id)}</td>

                <td>
                  <span
                    className={`status ${job.status?.toLowerCase()}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleStatusToggle(job._id)}
                  >
                    {job.status || "Active"}
                  </span>
                </td>

                <td>
                  <button
                    className="view-btn"
                    onClick={() => navigate(`/applicants/${job._id}`)}
                  >
                    View Applicants
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(job._id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>
      </div>

      {/* Show pagination only if enabled */}
      {showPagination && !limit && (
        <div className="pagination">

          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active-page" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </button>

        </div>
      )}

    </div>
  );
}

export default JobsTable;