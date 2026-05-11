import React, { useState, useEffect } from "react";
import axios from "axios";
import "../RecruiterDashboard_CSS/CompanyInfo.css";
import Sidebar from "./Sidebar";

export default function RecruiterProfile() {

  const [profile, setProfile] = useState({
    company_name: "",
    location: "",
    company_about: ""
  });

  const [companyLogo, setCompanyLogo] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = res.data;

      setProfile({
        company_name: data.company_name || "",
        location: data.location || "",
        company_about: data.company_about || "",
        company_logo: data.company_logo || ""
      });
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("company_name", profile.company_name);
    formData.append("location", profile.location);
    formData.append("company_about", profile.company_about);

    if (companyLogo) {
      formData.append("company_logo", companyLogo);
    }

    await axios.put(
      "http://localhost:5000/api/users/profile",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log("DATA:", profile);
console.log("LOGO:", companyLogo);

    alert("Company profile saved!");
  };

  return (
   <div className="profile-layout">

  
  <div className="profile-content">
  
 <div className="profile-card">
        <h1>Company Profile</h1>

       

        <div className="logo-container">

  <div className="avatar-wrapper">

    <img
      src={
        preview ||
        (profile.company_logo
          ? `http://localhost:5000/${profile.company_logo}`
          : "https://via.placeholder.com/120")
      }
      alt="logo"
      className="avatar-img"
    />

    <label className="edit-btn">
      ✎
      <input
        type="file"
        hidden
        onChange={(e) => {
          const file = e.target.files[0];
          setCompanyLogo(file);
          setPreview(URL.createObjectURL(file));
        }}
      />
    </label>

  </div>

</div>

        {/* Form */}
        <input
          placeholder="Company Name"
          value={profile.company_name}
          onChange={(e) =>
            setProfile({ ...profile, company_name: e.target.value })
          }
        />

        <input
          placeholder="Location"
          value={profile.location}
          onChange={(e) =>
            setProfile({ ...profile, location: e.target.value })
          }
        />

        <textarea
          placeholder="About Company"
          value={profile.company_about}
          onChange={(e) =>
            setProfile({ ...profile, company_about: e.target.value })
          }
        />

        <button onClick={handleSave}>Save</button>
        </div>

      </div>
    </div>
  );
}