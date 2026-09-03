import { useState, useEffect } from 'react';
import { apiClient } from '../../api/apiClient';

function LeaveBalanceList() {
  const [empId, setEmpId] = useState('');
  const [balances, setBalances] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const data = await apiClient.get(`/employees/${empId}/leave-balances`);
      setBalances(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Leave Balances</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input placeholder="Employee ID" value={empId} onChange={(e) => setEmpId(e.target.value)} />
      <button onClick={handleSearch}>Search</button>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Leave Type</th>
            <th>Fiscal Year</th>
            <th>Entitled</th>
            <th>Carried Forward</th>
            <th>Used</th>
            <th>Remaining</th>
          </tr>
        </thead>
        <tbody>
          {balances.map((b) => (
            <tr key={b.id}>
              <td>{b.leaveTypeName}</td>
              <td>{b.fiscalYear}</td>
              <td>{b.entitledDays}</td>
              <td>{b.carriedForward}</td>
              <td>{b.usedDays}</td>
              <td>{b.remainingDays}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveBalanceList;