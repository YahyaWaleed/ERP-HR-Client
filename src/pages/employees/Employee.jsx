import { Link } from 'react-router-dom';

function Employee() {
  return (
    <div>
      <h1>Employee Management</h1>
      <nav>
        <Link to="/employees/list">View All Employees</Link>
        <br /><br />
        <Link to="/employees/create">Create New Employee</Link>
      </nav>
    </div>
  );
}

export default Employee;