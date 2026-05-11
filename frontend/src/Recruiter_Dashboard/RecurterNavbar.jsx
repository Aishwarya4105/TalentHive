
import { FaBell } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


import "../RecruiterDashboard_CSS/RecurterNavbar.css";

// function RecurterNavbar() {
function RecurterNavbar({ toggleSidebar }) {

  const navigate = useNavigate(); 
  
  const [open, setOpen] = useState(false);

  const [user, setUser] = useState({
    company_name: "",
    company_logo: ""
  });

  useEffect(() => {
  const handleClickOutside = (e) => {
    if (!e.target.closest(".profile-section1")) {
      setOpen(false);
    }
  };

  document.addEventListener("click", handleClickOutside);
  return () => document.removeEventListener("click", handleClickOutside);
}, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        setUser(res.data);
      } catch (error) {
        console.log("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="navbar1">

      {/* LEFT SIDE */}
      <div className="navbar-left1">
        <span className="menu-btn" onClick={toggleSidebar}>☰</span>
        <h2 className="logo1">JobPortal</h2>
        <span className="divider1">|</span>
        <h3 className="dashboard-title1">Recruiter Dashboard</h3>
      </div>

      {/* RIGHT SIDE */}
      <div className="navbar-right1">

        {/* NOTIFICATION */}
        <div className="notification1">
          <FaBell />
          <span className="badge1">1</span>
        </div>

        {/* PROFILE */}
        <div className="profile-section1" onClick={() => setOpen(!open)}>

          <img
            src={
              user.company_logo
                ? `http://localhost:5000/${user.company_logo}`
                : "https://via.placeholder.com/40"
            }
            alt="profile"
            className="profile-img"
          />

          <div className="profile-text1">
            <span className="name">
              {user.company_name || "Company Name"}
            </span>
            <span className="company">
              Recruiter
            </span>
          </div>

          <FaChevronDown className="arrow" />

          {/* {open && (
            <div className="dropdown1">
             */}
              {/* <p>Company Info Profile</p>
              <p>Settings</p>
              <p className="logout1">Logout</p> */}


              {open && (
  <div className="dropdown1">

    <p onClick={() => navigate("/recriuterprofile")}>
      Company Profile
    </p>

    <p onClick={() => navigate("/settings")}>
      Settings
    </p>

    <p
      className="logout1"
      onClick={() => {
        localStorage.removeItem("token");
        navigate("/login");
      }}
    >
      Logout
    </p>

  </div>
)}
            {/* </div>
          )} */}

        </div>

      </div>

    </div>
  );
}

export default RecurterNavbar;