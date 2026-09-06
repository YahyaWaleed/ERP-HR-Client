import { useState } from 'react';
import { apiClient } from '../../api/apiClient';

function PayrollRegisterReport() {
  const [periodCode, setPeriodCode] = useState('');
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');

  const handleRun = async () => {
    try {
      const data = await apiClient.get(`/reports/payroll-register?periodCode=${periodCode}`);
      setRows(data);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Payroll Register</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <label>Period Code</label><br />
      <input placeholder="e.g. 2026-08" value={periodCode} onChange={(e) => setPeriodCode(e.target.value)} />
      <button onClick={handleRun}>Run Report</button>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Emp Code</th><th>Name</th><th>Department</th><th>Basic</th>
            <th>Gross</th><th>Deductions</th><th>Net Pay</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{r.empCode}</td>
              <td>{r.fullNameAr}</td>
              <td>{r.department}</td>
              <td>{r.basicSalary}</td>
              <td>{r.grossPay}</td>
              <td>{r.totalDeductions}</td>
              <td>{r.netPay}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PayrollRegisterReport;