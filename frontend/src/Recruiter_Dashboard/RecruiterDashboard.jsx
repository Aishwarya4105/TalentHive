import { useState } from "react";
import "../styles/dashboard.css";
import "../RecruiterDashboard_CSS/Recruiter_dashboard.css";

import RecurterNavbar from "./RecurterNavbar";
import Sidebar from "./Sidebar";

import DashboardCards from "./DashboardCards";
import Applications from "./Applications";
import ManageJobs from "./ManageJobsPage";
import RecentApplicants from "./RecentApplicants";
import JobsTable from "./JobTable";
import AllApplications from "./AllApplications";

function RecruiterDashboard() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <>
      {/* OVERLAY */}
      {openSidebar && (
        <div
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
          <div className="dashboard-body">

            {/* LEFT SECTION */}
            <div className="dashboard-left">
              <DashboardCards />
              <JobsTable showPagination={false} limit={4} />
              <AllApplications />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default RecruiterDashboard;