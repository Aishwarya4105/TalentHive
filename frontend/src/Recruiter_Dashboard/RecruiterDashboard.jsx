import { useState } from "react";
import "../RecruiterDashboard_CSS/Recruiter_dashboard.css";

import RecurterNavbar from "./RecurterNavbar";
import Sidebar from "./Sidebar";

import DashboardCards from "./DashboardCards";
import ManageJobs from "./ManageJobsPage";
import JobsTable from "./JobTable";
// import AllApplications from "./AllApplications";

function RecruiterDashboard() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <>
      {/* OVERLAY */}
      {openSidebar && (
        <divs
          className="overlay"
          onClick={() => setOpenSidebar(false)}
        />
      )}

      <div className="dashboard-container">

        {/* SIDEBAR */}
        <Sidebar openSidebar={openSidebar} />

        {/* MAIN AREA (IMPORTANT FIX) */}
        <div className={`main-content ${openSidebar ? "shifted" : ""}`}>

          <RecurterNavbar
            toggleSidebar={() => setOpenSidebar(prev => !prev)}
          />
          

          
              
  


          
          {/* CONTENT WRAPPER */}
          <div className="dashboard-body" >
          

            {/* LEFT SECTION */}
            <div className="dashboard-left">
              <DashboardCards />
              <JobsTable showPagination={false} limit={4} />
              {/* <AllApplications /> */}
            </div>
            </div>
          </div>

        </div>
      
    </>
  );
}

export default RecruiterDashboard;