import { useState } from 'react';
import navigate from 'react-router-dom';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // function to handle the form by using the backend API
     const handleSubmit = async (e) => {
    e.preventDefault(); // stops the page from refreshing on submit

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid username or password');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      navigate('/dashboard');

    } catch (err) {
      setError(err.message);
    }
  };

    
    return(
        <> 
            <form onSubmit={handleSubmit}>
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <h1>Login</h1>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <br></br> <br></br>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br></br> <br></br>
                <button type="submit">Login</button>
            </form>
            <h4>@2026 Your Company. All rights reserved.</h4>
        </>
    );
}

export default LoginPage;