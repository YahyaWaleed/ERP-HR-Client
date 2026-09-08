
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { apiClient } from '../../api/apiClient';

function LeaveRequestCreate() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const [employees, setEmployees] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);

  const [form, setForm] = useState({
    empId: '',
    typeId: '',
    startDate: '',
    endDate: '',
    reason: '',
  });

  // get employees and leave types when the page loads
  useEffect(() => {
    Promise.all([
      apiClient.get('/employees'),
      apiClient.get('/leave-types')
    ])
      .then(([employeeData, leaveTypeData]) => {
        setEmployees(employeeData);
        setLeaveTypes(leaveTypeData);
      })
      .catch((err) => setError(err.message));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Active employees only
  const employeeOptions = employees
    .filter((employee) => employee.empStatus === 'ACTIVE')
    .map((employee) => ({
      value: employee.id,
      label: `${employee.empCode} - ${employee.fullNameEn}`,
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // empId is part of the URL path and is also included in the request body
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

        <label>Employee:</label>
        <br />

        <Select
          options={employeeOptions}
          value={
            employeeOptions.find(
              (option) => option.value === Number(form.empId)
            ) || null
          }
          onChange={(selectedOption) =>
            setForm({
              ...form,
              empId: selectedOption ? selectedOption.value : '',
            })
          }
          placeholder="Select Employee"
          isSearchable
          isClearable
        />

        <br />
        <br />

        <label>Leave Type:</label>
        <br />

        <select
          name="typeId"
          value={form.typeId}
          onChange={handleChange}
          required
        >
          <option value="">Select Leave Type</option>

          {leaveTypes.map((leaveType) => (
            <option key={leaveType.id} value={leaveType.id}>
              {leaveType.code} - {leaveType.nameEn}
            </option>
          ))}
        </select>

        <br />
        <br />

        <label>Start Date:</label>
        <br />

        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <label>End Date:</label>
        <br />

        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <label>Reason:</label>
        <br />

        <input
          name="reason"
          placeholder="Reason"
          value={form.reason}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">Submit Request</button>

      </form>
    </div>
  );
}

export default LeaveRequestCreate;

