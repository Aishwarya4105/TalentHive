import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/profile.css";
import Sidebar from "../JobSeekerDashboaerd/JobseekerSidebar";

export default function ProfileCompletion() {

  const [openSidebar, setOpenSidebar] = useState(false);

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [resumeFile, setResumeFile] = useState(null);

  const [profile, setProfile] = useState({
    name: "",
    headline: "",
    location: "",
    email: "",
    phone: "",
    skills: "",
    education: "",
    about: "",
    profileImage: "",
    resume: ""
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        const data = res.data;

        setProfile({
          name: data.name || "",
          headline: data.headline || "",
          location: data.location || "",
          email: data.email || "",
          phone: data.phone || "",
          skills: data.skills || "",
          education: data.education || "",
          about: data.about || "",
          profileImage: data.profileImage || "",
          resume: data.resume || ""
        });

      } catch (err) {
        console.log("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      Object.keys(profile).forEach(key => {
        formData.append(key, profile[key]);
      });

      if (profileImage) formData.append("profileImage", profileImage);
      if (resumeFile) formData.append("resume", resumeFile);

      await axios.put(
        "http://localhost:5000/api/users/profile",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Profile saved successfully!");

    } catch (err) {
      console.log("Error saving profile:", err);
    }
  };


return (
  <div className="layout">

    <Sidebar openSidebar={openSidebar} toggleSidebar={toggleSidebar} />

    <div className="profile-main">

      {/* HEADER (same for all devices) */}
      <div className="header">
        <div className="left">
          <span className="menu-btn" onClick={toggleSidebar}>☰</span>
          <h2>Complete Profile</h2>
        </div>

        <button className="saveBtn" onClick={handleSave}>
          Save
        </button>
      </div>

    
      <div className="container">

        <div className="pro-card profile-card">
        
          <div className="profile-image-wrapper">

  <label className="imageUpload">
    <img
      src={
        preview ||
        (profile.profileImage
          ? `http://localhost:5000/${profile.profileImage}`
          : "https://via.placeholder.com/120")
      }
      alt="profile"
      className="profileImg"
    />

  
    <div className="edit-overlay">✎</div>

    <input
      type="file"
      accept="image/*"
      hidden
      onChange={(e) => {
        const file = e.target.files[0];
        if (file) {
          setProfileImage(file);
          setPreview(URL.createObjectURL(file));
        }
      }}
    />
  </label>

</div>

          <input
            value={profile.name}
            onChange={(e) => setProfile({...profile, name: e.target.value})}
            placeholder="Full Name"
          />

          <input
            value={profile.headline}
            onChange={(e) => setProfile({...profile, headline: e.target.value})}
            placeholder="Headline"
          />

          <input
            value={profile.location}
            onChange={(e) => setProfile({...profile, location: e.target.value})}
            placeholder="Location"
          />
        </div>

        {/* CONTACT */}
        <div className="pro-card">
          <h3>Contact</h3>
          <input
            value={profile.email}
            onChange={(e) => setProfile({...profile, email: e.target.value})}
            placeholder="Email"
          />
          <input
            value={profile.phone}
            onChange={(e) => setProfile({...profile, phone: e.target.value})}
            placeholder="Phone"
          />
        </div>

        {/* SKILLS */}
        <div className="pro-card">
          <h3>Skills</h3>
          <input
            value={profile.skills}
            onChange={(e) => setProfile({...profile, skills: e.target.value})}
            placeholder="React, Java..."
          />
        </div>

        {/* EDUCATION */}
        <div className="pro-card">
          <h3>Education</h3>
          <input
            value={profile.education}
            onChange={(e) => setProfile({...profile, education: e.target.value})}
            placeholder="Degree"
          />
        </div>

        {/* ABOUT */}
        <div className="pro-card">
          <h3>About</h3>
          <textarea
            value={profile.about}
            onChange={(e) => setProfile({...profile, about: e.target.value})}
          />
        </div>
        <div className="pro-card">
  <h3>Resume</h3>

  <label className="resumeUpload">
    📄 Upload Resume
    <input
      type="file"
      accept=".pdf,.doc,.docx"
      hidden
      onChange={(e) => setResumeFile(e.target.files[0])}
    />
  </label>

  {/* Selected file preview */}
  {resumeFile && (
    <p className="fileName">Selected: {resumeFile.name}</p>
  )}

  {/* Already uploaded resume */}
  {profile.resume && (
    <div className="pro-resumeBox">
      <span>📄 Resume uploaded</span>

      <a
        href={`http://localhost:5000/${profile.resume}`}
        target="_blank"
        rel="noreferrer"
      >
        View
      </a>
    </div>
  )}
</div>

      </div>
    </div>
  </div>
);
}