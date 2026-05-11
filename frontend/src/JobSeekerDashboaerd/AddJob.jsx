import { useState } from "react";
import axios from "axios";
import "../styles/addjob.css";

function AddJob() {

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    jobType: "",
    description: ""
  });

  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/jobs",
        form,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setShow(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="job-container">

      <h1 className="title">Post a New Job</h1>

      <form className="job-form" onSubmit={handleSubmit}>

        <input name="title" placeholder="Job Title" onChange={handleChange} required />
        <input name="company" placeholder="Company Name" onChange={handleChange} required />
        <input name="location" placeholder="Location" onChange={handleChange} required />
        <input name="salary" placeholder="Salary" onChange={handleChange} required />

        <select name="jobType" onChange={handleChange}>
          <option>Select Job Type</option>
          <option>Full Time</option>
          <option>Part Time</option>
          <option>Internship</option>
        </select>

        <textarea name="description" placeholder="Job Description" onChange={handleChange}></textarea>

        <button className="post-btn">Post Job</button>

      </form>

      {show && (
        <div className="success">
          <h3>✔ Job Posted Successfully</h3>
          <button onClick={() => setShow(false)}>OK</button>
        </div>
      )}

    </div>
  );
}

export default AddJob;