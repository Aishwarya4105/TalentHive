import { Link } from "react-router-dom";
import { FaHome, FaSearch, FaFileAlt, FaUser, FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaCog } from "react-icons/fa";

import "../JobSeekerCSS/jobseekerdashboard.css";

function JobseekerSidebar({ openSidebar, toggleSidebar }) {

  const [user, setUser] = useState({});

  //  Fetch user profile (moved from Navbar)
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

        setUser(res.data);
      } catch (err) {
        console.log("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      {/*  overlay FIXED */}
      {openSidebar && (
        <div className="overlay" onClick={toggleSidebar}></div>
      )}

      <div className={`Jobseekersidebar ${openSidebar ? "active" : ""}`}>

        <h2 className="logo">Talent</h2>

        <ul>
          <li>
            {/*<Link to="/jobseeker/dashboard">*/}
            <Link to="/jobseeker/dashboard" onClick={toggleSidebar}>
              <FaHome className="Jobseekericon" /> Dashboard
            </Link>
          </li>

          <li>
            <Link to="/jobs" onClick={toggleSidebar}>
              <FaSearch className="Jobseekericon" /> Search Jobs
            </Link>
          </li>

          <li>
            <Link to="/applications" onClick={toggleSidebar}>
              <FaFileAlt className="Jobseekericon" /> My Applications
            </Link>
          </li>

          <li>
            <Link to="/saved-jobs" onClick={toggleSidebar}>
              <FaHeart className="Jobseekericon" /> Saved Jobs
            </Link>
          </li>

          <li>
            <Link to="/jobseekerprofile" onClick={toggleSidebar}>
              <FaUser className="Jobseekericon" /> Profile
            </Link>
          </li>

          <li>
            <Link to="/settings" onClick={toggleSidebar}>
              <FaCog className="Jobseekericon" /> Settings
            </Link>
          </li>
        </ul>

        {/*  PROFILE SECTION (REAL DATA) */}
        <div className="sidebar-bottom">

          <div className="sidebar-profile">
            <img
              src={
                user.profileImage
                  ? `http://localhost:5000/${user.profileImage}`
                  : "https://via.placeholder.com/40"
              }
              alt="profile"
            />
            <div>
              <p>{user.name || "User"}</p>
              <span>{user.email || ""}</span>
            </div>
          </div>

          <div className="sidebar-actions">

            <p
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
            >
              Logout
            </p>
          </div>

        </div>

      </div>
    </>
  );
}

export default JobseekerSidebar;