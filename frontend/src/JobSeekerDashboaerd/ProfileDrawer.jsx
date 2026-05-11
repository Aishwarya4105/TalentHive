import "../styles/ProfileDrawer.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProfileDrawer({ open, setOpen }) {
  const navigate = useNavigate();

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
    <div className={`drawer ${open ? "open" : ""}`}>

      <div className="drawerHeader">
        <span onClick={() => setOpen(false)}>✖</span>
      </div>

      <div className="drawerProfile">

        <img
          src={
            user.profileImage
              ? `http://localhost:5000/${user.profileImage}`
              : "https://via.placeholder.com/80"
          }
          alt="profile"
          className="drawerImg"
        />

        <h3>{user.name || "User"}</h3>

        <p>
          {user.role === "job_seeker"
            ? "Job Seeker"
            : user.role === "employer"
              ? "Recruiter"
              : "User"}
        </p>

        <p className="location">{user.location || "No location"}</p>
      </div>

      <div className="drawerMenu">
        <div onClick={() => navigate("/jobseekerprofile")}>
          ✔ Complete Profile
        </div>

        <div>⚙ Settings</div>

        <div
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
        >
          Logout
        </div>
      </div>
    </div>
  );
}