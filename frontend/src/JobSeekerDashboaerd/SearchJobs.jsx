import "../JobSeekerCSS/jobseekerdashboard.css";
import Navbar from "../components/Navbar";

function SearchJobs(){

return(

<div className="layout">

<JobSeekerDashboard/>

<div className="main">

<Navbar/>

<h2>Search Jobs Page</h2>

</div>

</div>

)

}

export default SearchJobs;