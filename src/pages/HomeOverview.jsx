import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/apiClient';

function HomeOverview() {
  const [employees, setEmployees] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [loans, setLoans] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        // Replace endpoint paths with your actual backend routes if different
        const [empRes, leaveRes, loanRes, attRes] = await Promise.all([
          apiClient.get('/employees'),
          apiClient.get('/leave-requests'),
          apiClient.get('/loans'),
          apiClient.get('/attendance')
        ]);

        setEmployees(empRes.data || []);
        setLeaves(leaveRes.data || []);
        setLoans(loanRes.data || []);
        setAttendance(attRes.data || []);
      } catch (err) {
        setError('Failed to load dashboard data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) return <div>Loading dashboard overview...</div>;
  if (error) return <div>{error}</div>;

  // Dynamic Metrics Calculated From Live Data
  const totalEmployees = employees.length;
  const pendingLeaves = leaves.filter((item) => item.status === 'PENDING' || item.status === 'Pending');
  const activeLoans = loans.filter((item) => item.status === 'APPROVED' || item.status === 'Active');

  return (
    <div>
      {/* Header */}
      <div>
        <h2>Dashboard Overview</h2>
        <p>Live HR Performance & Action Summary</p>
      </div>

      {/* Top KPI Metrics Row */}
      <div>
        <div>
          <p>Total Employees</p>
          <h3>{totalEmployees}</h3>
        </div>

        <div>
          <p>Today's Clocked-In</p>
          <h3>{attendance.length}</h3>
        </div>

        <div>
          <p>Active Loans</p>
          <h3>{activeLoans.length}</h3>
        </div>

        <div>
          <p>Pending Leave Requests</p>
          <h3>{pendingLeaves.length}</h3>
        </div>
      </div>

      <hr />

      {/* Dynamic Data Content Area */}
      <div>
        {/* Recent Leave Requests Table */}
        <div>
          <h3>Recent Leave Requests</h3>
          {leaves.length === 0 ? (
            <p>No leave requests found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Employee ID / Name</th>
                  <th>Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {leaves.slice(0, 5).map((request, index) => (
                  <tr key={request.id || index}>
                    <td>{request.employee_name || request.employee_id || 'N/A'}</td>
                    <td>{request.leave_type || request.type || 'N/A'}</td>
                    <td>{request.status || 'Pending'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <br />
          <Link to="/leaves">View All Leave Requests</Link>
        </div>

        {/* Attendance Action & Module Links */}
        <div>
          <div>
            <h3>Daily Attendance</h3>
            <p>Quick Clock Action</p>
            <button onClick={async () => {
              try {
                await apiClient.post('/attendance/clock-in');
                alert('Clocked in successfully');
              } catch (err) {
                alert('Clock-in failed');
              }
            }}>Clock In</button>
            {' '}
            <button onClick={async () => {
              try {
                await apiClient.post('/attendance/clock-out');
                alert('Clocked out successfully');
              } catch (err) {
                alert('Clock-out failed');
              }
            }}>Clock Out</button>
            <br /><br />
            <Link to="/attendance">Full Attendance Log</Link>
          </div>

          <br />

          <div>
            <h3>Organization & Payroll</h3>
            <ul>
              <li><Link to="/branches">Branches</Link></li>
              <li><Link to="/departments">Departments</Link></li>
              <li><Link to="/jobs">Job Titles</Link></li>
              <li><Link to="/payroll">Payroll Periods</Link></li>
              <li><Link to="/reports">Reports</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeOverview;