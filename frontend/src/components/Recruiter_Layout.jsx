import RecurterNavbar from "../Recruiter_Dashboard/RecurterNavbar";
import Sidebar from "../Recruiter_Dashboard/Sidebar";
import { useState } from "react";
function RecruiterLayout({ children }) {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <>
      {/* Overlay */}
      {openSidebar && (
        <div className="overlay" onClick={() => setOpenSidebar(false)} />
      )}

      <RecurterNavbar toggleSidebar={() => setOpenSidebar(prev => !prev)} />

      <div className="dashboard-container">
        <Sidebar openSidebar={openSidebar} />

        <div className={`main-content ${openSidebar ? "shifted" : ""}`}>
          {children}
        </div>
      </div>
    </>
  );
}

export default RecruiterLayout;