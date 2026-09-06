import { Link, Outlet, useLocation } from 'react-router-dom';

function Dashboard() {
  const location = useLocation();
  const username = location.state?.username || localStorage.getItem('username') || 'User';

  return (
    <div>
      {/* Left Navigation Sidebar */}
      <div>
        <h1>HR Dashboard</h1>
        <p>Welcome, {username}</p>

        <nav>
          <p><strong>Main Menu</strong></p>
          <Link to="/dashboard">Dashboard Overview</Link><br /><br />

          <p><strong>HR Management</strong></p>
          <Link to="/dashboard/employees">Employees</Link><br /><br />
          <Link to="/dashboard/attendance">Attendance</Link><br /><br />
          <Link to="/dashboard/leaves">Leaves</Link><br /><br />
          <Link to="/dashboard/payroll">Payroll</Link><br /><br />
          <Link to="/dashboard/loans">Loans</Link><br /><br />

          <p><strong>Organization</strong></p>
          <Link to="/dashboard/branches">Branches</Link><br /><br />
          <Link to="/dashboard/departments">Departments</Link><br /><br />
          <Link to="/dashboard/jobs">Job Titles</Link><br /><br />

          <p><strong>Reports</strong></p>
          <Link to="/dashboard/reports">Reports</Link><br /><br />
        </nav>
      </div>

      {/* Main Content Area where nested views render */}
      <div>
        <Outlet context={{ username }} />
      </div>
    </div>
  );
}

export default Dashboard;