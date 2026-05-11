import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../JobSeekerDashboaerd/JobseekerSidebar";

import "../JobSeekerCSS/jobseekerdashboard.css";
import "../styles/settings.css";

function SettingsPage() {

  const [activeSection, setActiveSection] =
  useState("account");

  const [openSidebar, setOpenSidebar] = useState(false);

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    notifications: true,
    interviewAlerts: true,
    marketingEmails: false,
    resume: ""
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [resumeFile, setResumeFile] = useState(null);


  useEffect(() => {

    const fetchUser = async () => {

      try {

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
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          notifications: data.notifications ?? true,
          interviewAlerts: data.interviewAlerts ?? true,
          marketingEmails: data.marketingEmails ?? false,
          resume: data.resume || ""
        });

      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();

  }, []);


  const saveAccount = async () => {

    try {

      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:5000/api/users/profile",
        {
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
          notifications: profile.notifications,
          interviewAlerts: profile.interviewAlerts,
          marketingEmails: profile.marketingEmails
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Settings updated successfully");

    } catch (error) {
      console.log(error);
    }
  };


  const updatePassword = async () => {

    try {

      if (passwords.newPassword !== passwords.confirmPassword) {
        return alert("Passwords do not match");
      }

      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:5000/api/auth/change-password",
        {
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Password updated successfully");

      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Error updating password");
    }
  };

  const uploadResume = async () => {

    try {

      if (!resumeFile) {
        return alert("Select resume first");
      }

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("resume", resumeFile);

      const res = await axios.put(
        "http://localhost:5000/api/users/upload-resume",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setProfile(prev => ({
        ...prev,
        resume: res.data.resume
      }));

      alert("Resume uploaded successfully");

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="layout">

      <Sidebar
        openSidebar={openSidebar}
        toggleSidebar={toggleSidebar}
      />

      <div className="main">

        {/* HEADER */}
        <div className="header">

          <div className="left">

            <span
              className="menu-btn"
              onClick={toggleSidebar}
            >
              ☰
            </span>

            <h2>Settings</h2>

          </div>

        </div>

        <div className="settings-menu">

  <button
    className={activeSection === "account" ? "active" : ""}
    onClick={() => setActiveSection("account")}
  >
    Account Settings
  </button>

  <button
    className={activeSection === "password" ? "active" : ""}
    onClick={() => setActiveSection("password")}
  >
    Change Password
  </button>

  
  <button
    className={activeSection === "resume" ? "active" : ""}
    onClick={() => setActiveSection("resume")}
  >
    Resume
  </button>

</div>
<div className="settings-container">

  {/* ACCOUNT */}
  {activeSection === "account" && (

    <div className="settings-panel">

      <h3>Account Settings</h3>

      <input
        type="text"
        placeholder="Name"
        value={profile.name}
        onChange={(e) =>
          setProfile({
            ...profile,
            name: e.target.value
          })
        }
      />

      <input
        type="email"
        placeholder="Email"
        value={profile.email}
        onChange={(e) =>
          setProfile({
            ...profile,
            email: e.target.value
          })
        }
      />

      <input
        type="text"
        placeholder="Phone"
        value={profile.phone}
        onChange={(e) =>
          setProfile({
            ...profile,
            phone: e.target.value
          })
        }
      />

      <button onClick={saveAccount}>
        Save Changes
      </button>

    </div>
  )}

  {/* PASSWORD */}
  {activeSection === "password" && (

    <div className="settings-panel">

      <h3>Change Password</h3>

      <input
        type="password"
        placeholder="Current Password"
        value={passwords.currentPassword}
        onChange={(e) =>
          setPasswords({
            ...passwords,
            currentPassword: e.target.value
          })
        }
      />

      <input
        type="password"
        placeholder="New Password"
        value={passwords.newPassword}
        onChange={(e) =>
          setPasswords({
            ...passwords,
            newPassword: e.target.value
          })
        }
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={passwords.confirmPassword}
        onChange={(e) =>
          setPasswords({
            ...passwords,
            confirmPassword: e.target.value
          })
        }
      />

      <button onClick={updatePassword}>
        Update Password
      </button>

    </div>
  )}

 
  
  {/* RESUME */}
  {activeSection === "resume" && (

    <div className="settings-panel">

      <h3>Resume</h3>

      <label className="resumeUpload">

        Upload Resume

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          hidden
          onChange={(e) =>
            setResumeFile(e.target.files[0])
          }
        />

      </label>

      {resumeFile && (
        <p className="fileName">
          {resumeFile.name}
        </p>
      )}

      {profile.resume && (

        <div className="pro-resumeBox">

          <span>Resume Uploaded</span>

          <a
            href={`http://localhost:5000/${profile.resume}`}
            target="_blank"
            rel="noreferrer"
          >
            View
          </a>

        </div>
      )}

      <button onClick={uploadResume}>
        Save Resume
      </button>

    </div>
  )}

</div>

      </div>

    </div>
  );
}

export default SettingsPage;