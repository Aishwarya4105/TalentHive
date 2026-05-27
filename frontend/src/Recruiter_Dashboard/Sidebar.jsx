import "../RecruiterDashboard_CSS/Recruiter_Sidebar.css";
import { FaThLarge } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaCog } from "react-icons/fa";


import { NavLink } from "react-router-dom";

function Sidebar({ openSidebar }) {
  return (
   <div
  className={`Rec-sidebar ${openSidebar ? "active" : ""}`}
  onClick={(e) => e.stopPropagation()}   //  ADD THIS
>
<ul>
  
<NavLink 
  to="/recruiter/dashboard" 
  className={({ isActive }) => isActive ? "Rec-menu active" : "Rec-menu"}
>
  <FaThLarge className="rec-icon"/> Dashboard
</NavLink>



<NavLink to="/post-job" className="Rec-menu">
 <FaPlus className="rec-icon"/> Post Job
</NavLink>

<NavLink to="/manage-jobs" className="Rec-menu">

  <FaBriefcase className="rec-icon"/> Manage Jobs
</NavLink>

{/* <NavLink to="/allapplications" className="Rec-menu">
  <FaFileAlt className="rec-icon"/> Applications
</NavLink> */}

<NavLink to="/recriuterprofile" className="Rec-menu">
  <FaUser className="rec-icon"/> Profile
</NavLink>

<NavLink to="/recruiter/settings" className="Rec-menu">
   <FaCog className="rec-icon"/> Settings
</NavLink>

</ul>

 
    </div>
  );
}

export default Sidebar;