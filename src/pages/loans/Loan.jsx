import { Link } from 'react-router-dom';

function Loan() {
  return (
    <div>
      <h1>Loan Management</h1>
      <nav>
        <Link to="/loans/list">View All Loans</Link><br /><br />
        <Link to="/loans/create">Create New Loan</Link>
      </nav>
    </div>
  );
}

export default Loan;