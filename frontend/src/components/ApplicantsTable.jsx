function ApplicantsTable() {
  return (
    <div className="table-section">

      <h3>Recent Applications</h3>

      <table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Experience</th>
            <th>Skills</th>
            <th>Resume</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          <tr>
            <td>Rahul Sharma</td>
            <td>rahul@gmail.com</td>
            <td>2 yrs</td>
            <td>React, JS</td>
            <td>View Resume</td>
            <td>Pending</td>
            <td>Shortlist | Reject</td>
          </tr>

        </tbody>

      </table>

    </div>
  );
}

export default ApplicantsTable