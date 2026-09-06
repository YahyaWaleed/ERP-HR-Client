import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../api/apiClient';

function LoanCreate() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    empId: '',
    type: 'PERSONAL',
    principalAmount: '',
    installmentsCount: '',
    startPeriod: '',
    approvedById: '',
    requestDate: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // calculated automatically, not typed by the user
  const monthlyInstallment =
    form.principalAmount && form.installmentsCount
      ? (Number(form.principalAmount) / Number(form.installmentsCount)).toFixed(2)
      : '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/loans', { ...form, monthlyInstallment });
      navigate('/dashboard/loans/list');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Create Loan</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>Employee ID</label><br />
        <input name="empId" value={form.empId} onChange={handleChange} /><br /><br />

        <label>Loan Type</label><br />
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="ADVANCE">Advance</option>
          <option value="PERSONAL">Personal</option>
          <option value="EMERGENCY">Emergency</option>
          <option value="HOUSING">Housing</option>
        </select><br /><br />

        <label>Principal Amount</label><br />
        <input name="principalAmount" value={form.principalAmount} onChange={handleChange} /><br /><br />

        <label>Number of Installments</label><br />
        <input name="installmentsCount" value={form.installmentsCount} onChange={handleChange} /><br /><br />

        <label>Monthly Installment (calculated automatically)</label><br />
        <input value={monthlyInstallment} disabled /><br /><br />

        <label>Start Period (e.g. 2026-09)</label><br />
        <input name="startPeriod" value={form.startPeriod} onChange={handleChange} /><br /><br />

        <label>Approver Employee ID (optional)</label><br />
        <input name="approvedById" value={form.approvedById} onChange={handleChange} /><br /><br />

        <label>Request Date</label><br />
        <input type="date" name="requestDate" value={form.requestDate} onChange={handleChange} /><br /><br />

        <button type="submit">Create Loan</button>
      </form>
    </div>
  );
}

export default LoanCreate;