import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../RecruiterDashboard_CSS/viewApplicants.css";

function ViewApplicants() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplicants();
  }, []);



  const fetchApplicants = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/applications/${jobId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setApplications(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/applications/status/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      fetchApplicants(); // refresh

    } catch (error) {
      console.log(error);
    }

    console.log("Job ID:", jobId);
    console.log(applications);



  };

  const jobTitle = applications[0]?.job?.title;
  return (
    <div className="view-applicants">

      <h2 className="page-title">
        {jobTitle || "Applicants"}
      </h2>

      <div className="applicants-grid">

        {applications.length === 0 ? (
          <p>No applicants</p>
        ) : (

          applications.map(app => (   //  app defined HERE

            <div className="applicant-card" key={app._id}>

              <h3>{app.applicant?.name}</h3>
              <p>{app.applicant?.email}</p>

          
             <p>
  Resume:
  {app.applicant?.resume ? (
    <a
      href={`http://localhost:5000/${app.applicant.resume}`}
      target="_blank"
      rel="noreferrer"
    >
      View
    </a>
  ) : (
    " N/A"
  )}
</p>

              <span className={`status ${app.status}`}>
                {app.status}
              </span>

              <div className="actions">
                <button onClick={() => updateStatus(app._id, "shortlisted")}>
                  Shortlist
                </button>

                <button onClick={() => updateStatus(app._id, "rejected")}>
                  Reject
                </button>

                <button onClick={() => updateStatus(app._id, "interview")}>
                  Interview
                </button>
              </div>

            </div>

          ))

        )}

      </div>


    </div>
  );
}
export default ViewApplicants;