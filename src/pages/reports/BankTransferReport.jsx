import { useState } from 'react';
import { apiClient } from '../../api/apiClient';

function BankTransferReport() {
  const [periodCode, setPeriodCode] = useState('');
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');

  const handleRun = async () => {
    try {
      const data = await apiClient.get(`/reports/bank-transfer?periodCode=${periodCode}`);
      setRows(data);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Bank Transfer File</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <label>Period Code</label><br />
      <input placeholder="e.g. 2026-08" value={periodCode} onChange={(e) => setPeriodCode(e.target.value)} />
      <button onClick={handleRun}>Run Report</button>

      <table border="1" cellPadding="8">
        <thead>
          <tr><th>Name</th><th>Bank</th><th>Account</th><th>Amount</th><th>Reference</th></tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{r.fullNameEn}</td>
              <td>{r.bankName}</td>
              <td>{r.bankAccount}</td>
              <td>{r.amount}</td>
              <td>{r.reference}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BankTransferReport;