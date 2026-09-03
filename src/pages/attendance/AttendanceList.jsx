import { useState } from 'react';
import { apiClient } from '../../api/apiClient';

function AttendanceList() {
  const [empId, setEmpId] = useState('');
  const [records, setRecords] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const data = await apiClient.get(`/employees/${empId}/attendance`);
      setRecords(data);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Attendance Sheet</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input placeholder="Employee ID" value={empId} onChange={(e) => setEmpId(e.target.value)} />
      <button onClick={handleSearch}>View Attendance</button>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Period</th>
            <th>Working Days</th>
            <th>Present Days</th>
            <th>Paid Leave Days</th>
            <th>Unpaid Absent Days</th>
            <th>Overtime Hours</th>
            <th>Late Minutes</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id}>
              <td>{r.periodCode}</td>
              <td>{r.workingDays}</td>
              <td>{r.presentDays}</td>
              <td>{r.paidLeaveDays}</td>
              <td>{r.unpaidAbsentDays}</td>
              <td>{r.overtimeHours}</td>
              <td>{r.lateMinutes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceList;