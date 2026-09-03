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
    monthlyInstallment: '',
    startPeriod: '',
    approvedById: '',
    requestDate: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/loans', form);
      navigate('/loans/list');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Create Loan</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input name="empId" placeholder="Employee ID" value={form.empId} onChange={handleChange} />

        <select name="type" value={form.type} onChange={handleChange}>
          <option value="ADVANCE">Advance</option>
          <option value="PERSONAL">Personal</option>
          <option value="EMERGENCY">Emergency</option>
          <option value="HOUSING">Housing</option>
        </select>

        <input name="principalAmount" placeholder="Principal Amount" value={form.principalAmount} onChange={handleChange} />
        <input name="installmentsCount" placeholder="Number of Installments" value={form.installmentsCount} onChange={handleChange} />
        <input name="monthlyInstallment" placeholder="Monthly Installment" value={form.monthlyInstallment} onChange={handleChange} />
        <input name="startPeriod" placeholder="Start Period (e.g. 2026-09)" value={form.startPeriod} onChange={handleChange} />
        <input name="approvedById" placeholder="Approver Employee ID (optional)" value={form.approvedById} onChange={handleChange} />
        <input type="date" name="requestDate" value={form.requestDate} onChange={handleChange} />

        <br /><br />
        <button type="submit">Create Loan</button>
      </form>
    </div>
  );
}

export default LoanCreate;