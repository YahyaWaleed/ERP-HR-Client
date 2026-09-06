import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../api/apiClient';

function PayrollPeriodCreate() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    periodCode: '',
    fiscalYear: '',
    startDate: '',
    endDate: '',
    payDate: '',
    workingDays: 22,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/payroll-periods', form);
      navigate('/dashboard/payroll/periods');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Open New Payroll Period</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>Period Code (e.g. 2026-09)</label><br />
        <input name="periodCode" value={form.periodCode} onChange={handleChange} /><br /><br />

        <label>Fiscal Year</label><br />
        <input name="fiscalYear" value={form.fiscalYear} onChange={handleChange} /><br /><br />

        <label>Start Date</label><br />
        <input type="date" name="startDate" value={form.startDate} onChange={handleChange} /><br /><br />

        <label>End Date</label><br />
        <input type="date" name="endDate" value={form.endDate} onChange={handleChange} /><br /><br />

        <label>Pay Date</label><br />
        <input type="date" name="payDate" value={form.payDate} onChange={handleChange} /><br /><br />

        <label>Working Days</label><br />
        <input name="workingDays" value={form.workingDays} onChange={handleChange} /><br /><br />

        <button type="submit">Open Period</button>
      </form>
    </div>
  );
}

export default PayrollPeriodCreate;