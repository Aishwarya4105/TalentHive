import { useState } from "react";
import axios from "axios";
import "../RecruiterDashboard_CSS/postjob.css";

function PostJob() {

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: ""
  });

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await axios.post("http://localhost:5000/api/jobs", job,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

      alert("Job posted successfully");


      //clear form
      setJob({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: ""

      });

    } catch (error) {

      console.log(error);

    }
  };

  return (
<div className="post-job-container">
  <form className="post-job-form" onSubmit={handleSubmit}>

    <h3>Post New Job</h3>

    <div className="form-grid">

      <input
        name="title"
        placeholder="Job Title"
        value={job.title}
        onChange={handleChange}
      />

      <input
        name="company"
        placeholder="Company"
        value={job.company}
        onChange={handleChange}
      />

      <input
        name="location"
        placeholder="Location"
        value={job.location}
        onChange={handleChange}
      />

      <input
        name="salary"
        placeholder="Salary"
        value={job.salary}
        onChange={handleChange}
      />

    </div>

    <textarea
      name="description"
      placeholder="Job Description"
      value={job.description}
      onChange={handleChange}
    />

    <button type="submit" className="submit-btn">
      Post Job
    </button>

  </form>
</div>

  );

}

export default PostJob;