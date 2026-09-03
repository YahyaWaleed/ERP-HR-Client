import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../api/apiClient';

function EmployeeCreate() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    fullNameAr: '',
    fullNameEn: '',
    gender: 'M',
    birthDate: '',
    nationalId: '',
    maritalStatus: 'SINGLE',
    dependents: 0,
    email: '',
    mobile: '',
    address: '',
    hireDate: '',
    deptId: '',
    jobId: '',
    branchId: '',
    managerId: '',
    insuranceNo: '',
    bankName: '',
    bankAccount: '',
    paymentMethod: 'BANK',
    contract: {
      contractType: 'PERMANENT',
      startDate: '',
      endDate: '',
      basicSalary: '',
      currency: 'EGP',
      weeklyHours: 40,
      annualLeaveDays: 21,
      probationMonths: 3,
      notes: '',
    },
  });

  // updates a top-level field, e.g. empCode, fullNameEn
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // updates a field INSIDE the nested contract object
  const handleContractChange = (e) => {
    setForm({
      ...form,
      contract: { ...form.contract, [e.target.name]: e.target.value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/employees', form);
      navigate('/employees/list');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Create Employee</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <h3>Personal Details</h3>
        <input name="fullNameEn" placeholder="Full Name (English)" value={form.fullNameEn} onChange={handleChange} />
        <input name="fullNameAr" placeholder="Full Name (Arabic)" value={form.fullNameAr} onChange={handleChange} />
        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
        <input type="date"  placeholder="Birth Date" name="birthDate" value={form.birthDate} onChange={handleChange} />
        <input name="nationalId" placeholder="National ID" value={form.nationalId} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />

        <h3>Job Details</h3>
        <input type="date" name="hireDate" value={form.hireDate} onChange={handleChange} required />
        <input name="deptId" placeholder="Department ID" value={form.deptId} onChange={handleChange} />
        <input name="jobId" placeholder="Job Title ID" value={form.jobId} onChange={handleChange} />
        <input name="branchId" placeholder="Branch ID" value={form.branchId} onChange={handleChange} />
        <input name="managerId" placeholder="Manager ID (optional)" value={form.managerId} onChange={handleChange} />

        <h3>Bank & Insurance</h3>
        <input name="insuranceNo" placeholder="Insurance No." value={form.insuranceNo} onChange={handleChange} />
        <input name="bankName" placeholder="Bank Name" value={form.bankName} onChange={handleChange} />
        <input name="bankAccount" placeholder="Bank Account" value={form.bankAccount} onChange={handleChange} />

        <h3>Initial Contract</h3>
        <select name="contractType" value={form.contract.contractType} onChange={handleContractChange}>
          <option value="PERMANENT">Permanent</option>
          <option value="FIXED_TERM">Fixed Term</option>
          <option value="PART_TIME">Part Time</option>
          <option value="CONSULTANT">Consultant</option>
          <option value="INTERN">Intern</option>
        </select>
        <input type="date" name="startDate" value={form.contract.startDate} onChange={handleContractChange} />
        <input name="basicSalary" placeholder="Basic Salary" value={form.contract.basicSalary} onChange={handleContractChange} />

        <br /><br />
        <button type="submit">Create Employee</button>
      </form>
    </div>
  );
}

export default EmployeeCreate;