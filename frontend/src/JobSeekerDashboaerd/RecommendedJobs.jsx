import axios from "axios";

function RecommendedJobs({ jobs, fetchData }) {

  const applyJob = async (jobId) => {
    const token = localStorage.getItem("token");

    await axios.post(
      `http://localhost:5000/api/applications/${jobId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    fetchData();
  };

  return (
    <div className="box">

      <h3>Recommended Jobs</h3>

      {jobs.map(job => (
        <div className="job" key={job._id}>
          {job.title}
          <button onClick={() => applyJob(job._id)}>Apply</button>
        </div>
      ))}

    </div>
  )
}

export default RecommendedJobs;