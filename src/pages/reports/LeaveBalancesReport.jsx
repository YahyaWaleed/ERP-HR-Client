import { useState } from 'react';
import { apiClient } from '../../api/apiClient';

function LeaveBalancesReport() {
  const [fiscalYear, setFiscalYear] = useState('');
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');

  const handleRun = async () => {
    try {
      const data = await apiClient.get(`/reports/leave-balances?fiscalYear=${fiscalYear}`);
      setRows(data);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Leave Balances</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <label>Fiscal Year</label><br />
      <input placeholder="e.g. 2026" value={fiscalYear} onChange={(e) => setFiscalYear(e.target.value)} />
      <button onClick={handleRun}>Run Report</button>

      <table border="1" cellPadding="8">
        <thead>
          <tr><th>Employee</th><th>Leave Type</th><th>Entitled</th><th>Used</th><th>Remaining</th></tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{r.fullNameAr}</td>
              <td>{r.leaveType}</td>
              <td>{r.entitledDays}</td>
              <td>{r.usedDays}</td>
              <td>{r.remainingDays}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveBalancesReport;