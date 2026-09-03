import { Link } from 'react-router-dom';

function Leave() {
  return (
    <div>
      <h1>Leave Management</h1>
      <nav>
        <Link to="/leaves/list">View All Leave Requests</Link><br /><br />
        <Link to="/leaves/balances">View Leave Balances</Link>
      </nav>
    </div>
  );
}

export default Leave;