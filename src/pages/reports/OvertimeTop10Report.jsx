import { useState, useEffect } from 'react';
import { apiClient } from '../../api/apiClient';

function OvertimeTop10Report() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    apiClient.get('/reports/overtime-top10').then(setRows).catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h1>Top Overtime Earners</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table border="1" cellPadding="8">
        <thead>
          <tr><th>Employee</th><th>Overtime Hours</th><th>Overtime Paid</th></tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{r.fullNameAr}</td>
              <td>{r.otHours}</td>
              <td>{r.otPaid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OvertimeTop10Report;