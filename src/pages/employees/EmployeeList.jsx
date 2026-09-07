import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../../api/apiClient';
import { statusClass } from '../../utils/statusClass';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const [search, setSearch] = useState(""); // for search input field


  useEffect(() => {
    apiClient.get('/employees')
      .then((data) => setEmployees(data)) // get the list of employees from the backend and set it to employees array
      .catch((err) => setError(err.message));
  }, []); // empty array = run this once, when the page first loads

  // filter employees based on search input
  const filteredEmployees = employees.filter((employee) => {
    const searchTerm = search.toLowerCase();

    return (
      employee.fullNameEn.toLowerCase().includes(searchTerm) ||
      employee.empCode.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div>
      <h1>All Employees</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      
      <input
        type="text"
        placeholder="Search by name or employee code..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

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
          {filteredEmployees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.empCode}</td>
              <td>{emp.fullNameEn}</td>
              <td>{emp.departmentName}</td>
              <td>{emp.jobTitleName}</td>
              <td><span className={statusClass(emp.empStatus)}>{emp.empStatus}</span></td>
              <td><Link to={`/dashboard/employees/${emp.id}`}>View</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;