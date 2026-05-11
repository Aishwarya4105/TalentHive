function UpcomingInterviews({ applications }){

  return(
    <div className="box">

      <h3>Upcoming Interviews</h3>

      {applications
        .filter(app => app.status === "interview")
        .map(app => (
          <p key={app._id}>
            {app.job?.title}
          </p>
        ))}

    </div>
  )
}

export default UpcomingInterviews;