import "../RecruiterDashboard_CSS/Recruiter_Sidebar.css";
import { FaThLarge } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaCog } from "react-icons/fa";

import CompanyInfo from "./CompanyInfo";

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
  <FaThLarge className="icon"/> Dashboard
</NavLink>



<NavLink to="/post-job" className="Rec-menu">
 <FaPlus className="icon"/> Post Job
</NavLink>

<NavLink to="/manage-jobs" className="Rec-menu">

  <FaBriefcase className="icon"/> Manage Jobs
</NavLink>

<NavLink to="/allapplications" className="Rec-menu">
  <FaFileAlt className="icon"/> Applications
</NavLink>

<NavLink to="/recriuterprofile" className="Rec-menu">
  <FaUser className="icon"/> Profile
</NavLink>

<NavLink to="/recruiter/settings" className="Rec-menu">
   <FaCog className="icon"/> Settings
</NavLink>

</ul>

 
    </div>
  );
}

export default Sidebar;