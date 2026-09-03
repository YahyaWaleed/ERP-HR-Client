import { useState, useEffect } from 'react';
import { apiClient } from '../../api/apiClient';

function JobTitleList() {
  const [jobTitles, setJobTitles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    apiClient.get('/jobs')
      .then(setJobTitles)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h1>Job Titles</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Code</th>
            <th>Title (EN)</th>
            <th>Title (AR)</th>
            <th>Grade</th>
            <th>Min Salary</th>
            <th>Max Salary</th>
            <th>Managerial</th>
          </tr>
        </thead>
        <tbody>
          {jobTitles.map((j) => (
            <tr key={j.id}>
              <td>{j.code}</td>
              <td>{j.titleEn}</td>
              <td>{j.titleAr}</td>
              <td>{j.jobGrade}</td>
              <td>{j.minSalary}</td>
              <td>{j.maxSalary}</td>
              <td>{j.isManagerial ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default JobTitleList;