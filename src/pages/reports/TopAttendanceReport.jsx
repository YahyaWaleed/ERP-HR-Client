import { useState } from 'react';
import { apiClient } from '../../api/apiClient';

function TopAttendanceReport() {
  const [periodCode, setPeriodCode] = useState('');
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');

  const handleRun = async () => {
    try {
      const data = await apiClient.get(`/reports/top-attendance?periodCode=${periodCode}`);
      setRows(data);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Top 10 by Attendance</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <label>Period Code</label><br />
      <input placeholder="e.g. 2026-08" value={periodCode} onChange={(e) => setPeriodCode(e.target.value)} />
      <button onClick={handleRun}>Run Report</button>

      <table border="1" cellPadding="8">
        <thead>
          <tr><th>Employee</th><th>Present Days</th></tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{r.fullNameAr}</td>
              <td>{r.presentDays}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TopAttendanceReport;