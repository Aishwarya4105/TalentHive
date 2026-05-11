import "../RecruiterDashboard_CSS/Applications.css";
import { useEffect, useState } from "react";
import axios from "axios";

function AllApplications() {

  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchApplications();
  }, []);

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

      setApplications(res.data.applications || res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/applications/status/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      fetchApplications();

    } catch (error) {
      console.log(error);
    }
  };

  // FILTER + SEARCH
  const filteredApps = applications.filter(app => {
    const matchesSearch =
      app.applicant?.name?.toLowerCase().includes(search.toLowerCase()) ||
      app.applicant?.email?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      app.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="applications">

      <h3>All Applications</h3>

      <div className="application-controls">

        <input
          type="text"
          placeholder="Search Candidate..."
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
          <option>Pending</option>
          <option>Shortlisted</option>
          <option>Rejected</option>
          <option>Interview</option>
        </select>

      </div>

      <div className="table-wrapper">
        <table className="applications-table">

          <thead>
            <tr>
              <th>Candidate Name</th>
              <th>Email</th>
              <th>Experience</th>
              <th>Skills</th>
              <th>Resume</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredApps.length === 0 ? (
              <tr>
                <td colSpan="7">No applications found</td>
              </tr>
            ) : (

              filteredApps.map(app => (

                <tr key={app._id}>

                  <td>{app.applicant?.name}</td>
                  <td>{app.applicant?.email}</td>

                  {/* Safe fields */}
                  <td>{app.applicant?.experience || "N/A"}</td>
                  <td>{app.applicant?.skills?.join(", ") || "N/A"}</td>

                  <td>
                    {app.applicant?.resume ? (
                      <a
                        href={app.applicant.resume}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <button className="resume-btn">View</button>
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>

                  <td>
                    <span className={`status ${app.status}`}>
                      {app.status}
                    </span>
                  </td>

                  <td>

                    {app.status !== "shortlisted" && (
                      <button
                        className="shortlist-btn"
                        onClick={() => updateStatus(app._id, "shortlisted")}
                      >
                        Shortlist
                      </button>
                    )}

                    {app.status !== "rejected" && (
                      <button
                        className="reject-btn"
                        onClick={() => updateStatus(app._id, "rejected")}
                      >
                        Reject
                      </button>
                    )}

                    <button
                      className="view-btn"
                      onClick={() => updateStatus(app._id, "interview")}
                    >
                      Interview
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>
      </div>
    </div>
  );
}

export default AllApplications;