import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/Register";
import RecruiterDashboard from "./Recruiter_Dashboard/RecruiterDashboard";
import PostJob from "./Recruiter_Dashboard/PostJob";
import ManageJobs from "./Recruiter_Dashboard/ManageJobsPage";
import AboutUs from "./components/AboutUs";
import FindJobs from "./components/FindJobs";
import ManageJobsPage from "./Recruiter_Dashboard/ManageJobsPage";
import JobSeekerDashboard from "./JobSeekerDashboaerd/JobSeekerDashboard";
import SearchJobs from "./JobSeekerDashboaerd/SearchJobs";
import SavedJobs from "./JobSeekerDashboaerd/SavedJobs";
import Applications from "./JobSeekerDashboaerd/Applications";
import ProfileCompletion from "./JobSeekerDashboaerd/ProfileCompletion";
import RecruiterProfile from "./Recruiter_Dashboard/RecruiterProfile";
import ViewApplicants from "./Recruiter_Dashboard/viewApplicants";
import AllApplications from "./Recruiter_Dashboard/AllApplications";
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import LoginSuccess from "./pages/Loginsucess";
import RecruiterLayout from "./components/Recruiter_Layout";
import Companies from "./components/companies";
import SettingsPage from "./pages/SettingsPage";

import RecruiterSettingsPage from "./pages/RecruiterSettingsPage";

function App() {
  return (
    <>
      <Router>


        <Routes>

          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<FindJobs />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/about" element={<AboutUs />} />
          </Route>


          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>


          <Route path="/login-success" element={<LoginSuccess />} />



          <Route path="/recruiter/dashboard" element={<RecruiterDashboard />}></Route>

          <Route path="/manage-jobs" element={<RecruiterLayout><ManageJobs /></RecruiterLayout>} />
          <Route path="/post-job" element={< RecruiterLayout><PostJob /></RecruiterLayout>} />



          <Route path="/jobseeker/dashboard" element={<JobSeekerDashboard />} />
          <Route path="/search" element={<SearchJobs />} />

          <Route path="/saved-jobs" element={<SavedJobs />} />
          <Route path="/applications" element={<Applications />} />

          <Route path="/applicants/:jobId" element={<ViewApplicants />} />
          <Route path="/allapplications" element={< RecruiterLayout><AllApplications /></RecruiterLayout>} />

          {/* <Route path="/manage-jobs" element={<ManageJobsPage />} /> */}

          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/recruiter/settings" element={<RecruiterSettingsPage />} />



          <Route path="/jobseekerprofile" element={

            <ProfileCompletion />} />

          <Route path="/recriuterprofile" element={< RecruiterLayout><RecruiterProfile /> </ RecruiterLayout>} />





        </Routes>
      </Router>

    </>
  );
}

export default App;









