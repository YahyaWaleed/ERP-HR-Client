import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Parent Route for Navigation Shell */}
        <Route path="/dashboard" element={<Dashboard />}>
          {/* Index Route renders automatically at /dashboard */}
          <Route index element={<HomeOverview />} />
          
          {/* Nested Child Routes rendered inside <Outlet /> */}
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