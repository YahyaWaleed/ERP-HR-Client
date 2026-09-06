import { Link } from 'react-router-dom';

function Report() {
  return (
    <div>
      <h1>Reports</h1>
      <nav>
        <Link to="/reports/employee-directory">Employee Directory</Link><br /><br />
        <Link to="/reports/headcount-by-department">Headcount by Department</Link><br /><br />
        <Link to="/reports/payroll-register">Payroll Register</Link><br /><br />
        <Link to="/reports/payroll-cost-by-department">Payroll Cost by Department</Link><br /><br />
        <Link to="/reports/payroll-trend">Payroll Trend</Link><br /><br />
        <Link to="/reports/tax-insurance-liability">Tax & Insurance Liability</Link><br /><br />
        <Link to="/reports/bank-transfer">Bank Transfer File</Link><br /><br />
        <Link to="/reports/leave-balances">Leave Balances</Link><br /><br />
        <Link to="/reports/leave-requests">Leave Request Log</Link><br /><br />
        <Link to="/reports/overtime-top10">Top Overtime Earners</Link><br /><br />
        <Link to="/reports/absence-watchlist">Absence Watch-list</Link><br /><br />
        <Link to="/reports/active-loans">Active Loans</Link><br /><br />
        <Link to="/reports/contracts-expiring">Contracts Expiring</Link>
      </nav>
    </div>
  );
}

export default Report;