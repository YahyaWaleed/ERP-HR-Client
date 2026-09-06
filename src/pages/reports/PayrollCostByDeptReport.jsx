import { useState } from 'react';
import { apiClient } from '../../api/apiClient';

function PayrollCostByDeptReport() {
  const [periodCode, setPeriodCode] = useState('');
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');

  const handleRun = async () => {
    try {
      const data = await apiClient.get(`/reports/payroll-cost-by-department?periodCode=${periodCode}`);
      setRows(data);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Payroll Cost by Department</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <label>Period Code</label><br />
      <input placeholder="e.g. 2026-08" value={periodCode} onChange={(e) => setPeriodCode(e.target.value)} />
      <button onClick={handleRun}>Run Report</button>

      <table border="1" cellPadding="8">
        <thead>
          <tr><th>Department</th><th>Employees</th><th>Total Gross</th><th>Total Net</th><th>Company Cost</th></tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{r.department}</td>
              <td>{r.employees}</td>
              <td>{r.totalGross}</td>
              <td>{r.totalNet}</td>
              <td>{r.companyCost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PayrollCostByDeptReport;