const jobs = [
  { company: "Google", location: "Bangalore", salary: "8-14 LPA" },
  { company: "Amazon", location: "Bangalore", salary: "8-14 LPA" },
  { company: "Microsoft", location: "Bangalore", salary: "10-31 LPA" },
  { company: "Swiggy", location: "Bangalore", salary: "17-9 LPA" },
  { company: "Infosys", location: "Bangalore", salary: "25 LPA" },
  { company: "TCS", location: "Bangalore", salary: "20 LPA" }
];

function FeaturedJobs() {
  return (
    <div className="section">

      <div className="section-header">
        <h2>Featured Jobs</h2>
        <button>View All</button>
      </div>

      <div className="jobs-grid">
        {jobs.map((job, index) => (
          <div key={index} className="job-card">

            <h3>{job.company}</h3>
            <p>{job.location}</p>

            <div className="job-info">
              <span>{job.salary}</span>
              <span>Full Time</span>
            </div>

            <button className="apply">Apply Now</button>

          </div>
        ))}
      </div>

    </div>
  );
}

export default FeaturedJobs;