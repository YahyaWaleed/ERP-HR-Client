import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../../api/apiClient';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    apiClient.get('/employees')
      .then((data) => setEmployees(data)) // get the list of employees from the backend and set it to employees array
      .catch((err) => setError(err.message));
  }, []); // empty array = run this once, when the page first loads

  return (
    <div>
      <h1>All Employees</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Department</th>
            <th>Job Title</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.empCode}</td>
              <td>{emp.fullNameEn}</td>
              <td>{emp.departmentName}</td>
              <td>{emp.jobTitleName}</td>
              <td>{emp.empStatus}</td>
              <td><Link to={`/employees/${emp.id}`}>View</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;