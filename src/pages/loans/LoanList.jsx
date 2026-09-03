import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../../api/apiClient';

function LoanList() {
  const [loans, setLoans] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    apiClient.get('/loans')
      .then(setLoans)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h1>All Loans</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Type</th>
            <th>Principal</th>
            <th>Remaining Balance</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan.id}>
              <td>{loan.empCode}</td>
              <td>{loan.type}</td>
              <td>{loan.principalAmount}</td>
              <td>{loan.remainingBalance}</td>
              <td>{loan.status}</td>
              <td><Link to={`/loans/${loan.id}`}>View</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LoanList;