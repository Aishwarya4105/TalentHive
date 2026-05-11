import JobsTable from "./JobTable";

function ManageJobsPage() {
  return (
    <div>
      <JobsTable showPagination={false} />
    </div>
  );
}

export default ManageJobsPage;