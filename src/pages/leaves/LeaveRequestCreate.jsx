import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../api/apiClient';

function LeaveRequestCreate() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    empId: '',
    typeId: '',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // note: empId is part of the URL path, not the request body
      await apiClient.post(`/employees/${form.empId}/leaves`, form);
      navigate('/dashboard/leaves/list');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Create Leave Request</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input name="empId" placeholder="Employee ID" value={form.empId} onChange={handleChange} />
        <input name="typeId" placeholder="Leave Type ID" value={form.typeId} onChange={handleChange} />
        <input type="date" name="startDate" value={form.startDate} onChange={handleChange} />
        <input type="date" name="endDate" value={form.endDate} onChange={handleChange} />
        <input name="reason" placeholder="Reason" value={form.reason} onChange={handleChange} />

        <br /><br />
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
}

export default LeaveRequestCreate;