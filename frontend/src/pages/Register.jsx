import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      console.log(data);

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "job_seeker",
      });

    } catch (error) {
      console.log(error);
    }
  };
  return (


    <div className="auth-container">
      <div className="auth-card">

        <h1 className="logo">Talent<span>Hive</span></h1>
        <h2>Create Account</h2>
        <p className="subtitle">Join TalentHive today</p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <select name="role" onChange={handleChange}>
            <option value="job_seeker">Job Seeker</option>
            <option value="employer">Recruiter</option>
          </select>

          <button type="submit" className="auth-btn">
            Register
          </button>

        </form>

        <p className="switch-text">
          Already have an account? <span onClick={() => navigate("/login")}>Sign in</span>
        </p>

      </div>
    </div>
  );
}

export default Register;