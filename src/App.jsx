import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import HomeOverview from './pages/HomeOverview';
import EmployeeList from './pages/employees/EmployeeList';
import AttendanceList from './pages/attendance/AttendanceList';
import LeaveRequestsList from './pages/leaves/LeaveRequestsList';
import LoanList from './pages/loans/LoanList';
import BranchList from './pages/organization/BranchList';
import DepartmentList from './pages/organization/DepartmentList';
import JobTitleList from './pages/organization/JobTitleList';
import PayrollPeriodList from './pages/payroll/PayrollPeriodList';
import Report from './pages/reports/Report';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Parent Shell Route */}
        <Route path="/dashboard" element={<Dashboard />}>
          {/* Default Child Route at /dashboard */}
          <Route index element={<HomeOverview />} />
          
          {/* Child Feature Views */}
          <Route path="employees" element={<EmployeeList />} />
          <Route path="attendance" element={<AttendanceList />} />
          <Route path="leaves" element={<LeaveRequestsList />} />
          <Route path="loans" element={<LoanList />} />
          <Route path="branches" element={<BranchList />} />
          <Route path="departments" element={<DepartmentList />} />
          <Route path="jobs" element={<JobTitleList />} />
          <Route path="payroll" element={<PayrollPeriodList />} />
          <Route path="reports" element={<Report />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;