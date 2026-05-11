function RecentApplications({ applications }) {

  const getStatusColor = (status) => {
    if (status === "pending") return "orange";
    if (status === "shortlisted") return "blue";
    if (status === "rejected") return "red";
    if (status === "interview") return "green";
    return "black";
  };

  return (
    <div className="box">

      <h3>Recent Applications</h3>

      {applications
        .filter(app => app.job) //  remove deleted jobs
        .slice(0, 3)
        .map(app => (
          <div key={app._id} style={{ marginBottom: "10px" }}>

            <p><b>{app.job.title}</b></p>

            <p>
              Status:{" "}
              <span style={{ color: getStatusColor(app.status) }}>
                {app.status}
              </span>
            </p>

          </div>
        ))}

    </div>
  );
}

export default RecentApplications;