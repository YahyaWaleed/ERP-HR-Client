import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Employee from './pages/employees/Employee';
import EmployeeList from './pages/employees/EmployeeList';
import EmployeeCreate from './pages/employees/EmployeeCreate';
import EmployeeDetails from './pages/employees/EmployeeDetails';
import ProtectedRoute from './auth/ProtectedRoute';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;