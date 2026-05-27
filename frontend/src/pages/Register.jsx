import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

function Register() {
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  role: "job_seeker"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // console.log(formData);

  //   try {
  //     const res = await fetch("http://localhost:5000/api/auth/register", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     const data = await res.json();

  //     console.log(data);
  //   setSuccess(true);
  //     setFormData({
  //       name: "",
  //       email: "",
  //       password: "",
  //       role: "job_seeker",
  //     });

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const res = await fetch(
      "http://localhost:5000/api/auth/register",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      }
    );

    /* CHECK RESPONSE */

    if (!res.ok) {

      throw new Error("Registration failed");

    }

    const data = await res.json();

    console.log(data);

    setSuccess(true);

    setFormData({
      name: "",
      email: "",
      password: "",
      role: "job_seeker",
    });

  } catch (error) {

    console.log(error);

    alert("Registration Failed ❌");

  }
};
  return (


    <div className="auth-container">
      <div className="auth-card">

        <h1 className="logo">Talent</h1>
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

          {
  success && (
    <div className="success-message">
      Successfully Registered 🎉
    </div>
  )
}

        </form>

        <p className="switch-text">
          Already have an account? <span onClick={() => navigate("/login")}>Sign in</span>
        </p>

      </div>
    </div>
  );
}

export default Register;