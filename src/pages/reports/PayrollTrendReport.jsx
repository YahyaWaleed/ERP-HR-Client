import { useState, useEffect } from 'react';
import { apiClient } from '../../api/apiClient';

function PayrollTrendReport() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    apiClient.get('/reports/payroll-trend').then(setRows).catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h1>Payroll Trend</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table border="1" cellPadding="8">
        <thead>
          <tr><th>Period</th><th>Employees</th><th>Gross</th><th>Deductions</th><th>Net</th><th>Company Cost</th></tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{r.periodCode}</td>
              <td>{r.employees}</td>
              <td>{r.gross}</td>
              <td>{r.deductions}</td>
              <td>{r.net}</td>
              <td>{r.companyCost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PayrollTrendReport;