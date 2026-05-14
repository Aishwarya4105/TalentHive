import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Recruiter_Dashboard/Sidebar";

import "../styles/settings.css";

function RecruiterSettingsPage() {
  const [openSidebar, setOpenSidebar] = useState(false);

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    company: "",
    phone: ""
  });

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
          company: data.company || "",
          phone: data.phone || ""
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  const saveSettings = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:5000/api/users/profile",
        profile,
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

  return (
    <div className="layout">

      {/* Recruiter Sidebar ONLY */}
      <Sidebar
        openSidebar={openSidebar}
        toggleSidebar={toggleSidebar}
      />

      <div className="main">

        <div className="header">
          <span className="menu-btn" onClick={toggleSidebar}>☰</span>
          <h2>Recruiter Settings</h2>
        </div>

        <div className="settings-container">

          <div className="settings-panel">
            <h3>Company Settings</h3>

            <input
              type="text"
              placeholder="Name"
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Company Name"
              value={profile.company}
              onChange={(e) =>
                setProfile({ ...profile, company: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Phone"
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
            />

            <button onClick={saveSettings}>
              Save Changes
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default RecruiterSettingsPage;