import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h1>HR Dashboard</h1>
      <nav>
        <Link to="/employees">Employees</Link><br /><br />
        <Link to="/loans">Loans</Link><br /><br />
        <Link to="/leaves">Leaves</Link><br /><br />
        <Link to="/attendance">Attendance</Link><br /><br />
        <Link to="/branches">Branches</Link><br /><br />
        <Link to="/departments">Departments</Link><br /><br />
        <Link to="/jobs">Job Titles</Link>
      </nav>
    </div>
  );
}

export default Dashboard;