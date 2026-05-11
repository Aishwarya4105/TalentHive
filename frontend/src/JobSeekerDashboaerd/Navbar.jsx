import { FaSearch, FaBell } from "react-icons/fa";
import "../JobSeekerCSS/jobseekerdashboard.css";
import { useState, useEffect } from "react";
import ProfileDrawer from "../JobSeekerDashboaerd/ProfileDrawer";
import axios from "axios";

import { FaBars } from "react-icons/fa";

function Navbar({ toggleSidebar }) {


  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});

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
    <div className="jobseeker-navbar">

      <div className="menu-btn" onClick={toggleSidebar}>
        ☰
      </div>


      <div className="nav-icons">
        <FaBell className="bell" />

        <img
          src={
            user.profileImage
              ? `http://localhost:5000/${user.profileImage}`
              : "https://via.placeholder.com/40"
          }
          alt="profile"
          className="profile"
          onClick={() => setOpen(true)}
        />
      </div>

      <ProfileDrawer open={open} setOpen={setOpen} />



    </div>
  );
}

export default Navbar;