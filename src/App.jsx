import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Employee from './pages/employees/Employee';
import EmployeeList from './pages/employees/EmployeeList';
import EmployeeCreate from './pages/employees/EmployeeCreate';
import EmployeeDetails from './pages/employees/EmployeeDetails';
import ProtectedRoute from './auth/ProtectedRoute';
import Leave from './pages/leaves/Leave';
import LeaveRequestList from './pages/leaves/LeaveRequestsList';
import LeaveRequestCreate from './pages/leaves/LeaveRequestCreate';
import LeaveBalanceList from './pages/leaves/LeaveBalanceList';
import LeaveRequestDetails from './pages/leaves/LeaveRequestDetails';
import Loan from './pages/loans/Loan';
import LoanList from './pages/loans/LoanList';
import LoanCreate from './pages/loans/LoanCreate';
import LoanDetails from './pages/loans/LoanDetails';
import AttendanceList from './pages/attendance/AttendanceList';
import BranchList from './pages/organization/BranchList';
import DepartmentList from './pages/organization/DepartmentList';
import JobTitleList from './pages/organization/JobTitleList';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/employees" element={<ProtectedRoute><Employee /></ProtectedRoute>} />
        <Route path="/employees/list" element={<ProtectedRoute><EmployeeList /></ProtectedRoute>} />
        <Route path="/employees/create" element={<ProtectedRoute><EmployeeCreate /></ProtectedRoute>} />
        <Route path="/employees/:id" element={<ProtectedRoute><EmployeeDetails /></ProtectedRoute>} />
        <Route path="/loans" element={<ProtectedRoute><Loan /></ProtectedRoute>} />
        <Route path="/loans/list" element={<ProtectedRoute><LoanList /></ProtectedRoute>} />
        <Route path="/loans/create" element={<ProtectedRoute><LoanCreate /></ProtectedRoute>} />
        <Route path="/loans/:id" element={<ProtectedRoute><LoanDetails /></ProtectedRoute>} />

        <Route path="/leaves" element={<ProtectedRoute><Leave /></ProtectedRoute>} />
        <Route path="/leaves/list" element={<ProtectedRoute><LeaveRequestList /></ProtectedRoute>} />
        <Route path="/leaves/create" element={<ProtectedRoute><LeaveRequestCreate /></ProtectedRoute>} />
        <Route path="/leaves/balances" element={<ProtectedRoute><LeaveBalanceList /></ProtectedRoute>} />
        <Route path="/leaves/:id" element={<ProtectedRoute><LeaveRequestDetails /></ProtectedRoute>} />

        <Route path="/attendance" element={<ProtectedRoute><AttendanceList /></ProtectedRoute>} />
        <Route path="/branches" element={<ProtectedRoute><BranchList /></ProtectedRoute>} />
        <Route path="/departments" element={<ProtectedRoute><DepartmentList /></ProtectedRoute>} />
        <Route path="/job-titles" element={<ProtectedRoute><JobTitleList /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;