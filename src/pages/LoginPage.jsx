import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// any CSS styling is completely done by AI //


function LoginPage() {
    const navigate = useNavigate();
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
      localStorage.setItem('username', username);
      localStorage.setItem('role', data.role);
      navigate('/dashboard');

    } catch (err) {
      setError(err.message);
    }
  };

    
    return(
        <> 
            <style>
                {`
                    /* Login Page */
                    body {
                        background:
                            radial-gradient(circle at top left, rgba(37, 99, 235, 0.08), transparent 35%),
                            radial-gradient(circle at bottom right, rgba(37, 99, 235, 0.06), transparent 35%),
                            #f5f6f8;
                    }

                    /* Login Form Card */
                    form {
                        width: 380px;
                        max-width: calc(100% - 40px);
                        margin: 100px auto 20px;
                        padding: 35px 40px;
                        box-sizing: border-box;

                        background: linear-gradient(
                            145deg,
                            #ffffff,
                            #f9fafb
                        );

                        border: 1px solid #e2e5ea;
                        border-radius: 14px;
                        box-shadow:
                            0 10px 30px rgba(0, 0, 0, 0.08),
                            0 2px 6px rgba(0, 0, 0, 0.04);

                        position: relative;
                        overflow: hidden;
                    }

                    /* Blue accent at the top of the card */
                    form::before {
                        content: "";
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 4px;
                        background: linear-gradient(
                            90deg,
                            #2563eb,
                            #3b82f6,
                            #60a5fa
                        );
                    }

                    /* Login Heading */
                    form h1 {
                        margin: 0 0 28px;
                        color: #1a1d23;
                        font-size: 1.8rem;
                        font-weight: 800;
                        text-align: center;
                        letter-spacing: -0.02em;
                    }

                    /* Labels */
                    form label {
                        display: block;
                        margin-bottom: 7px;
                        color: #374151;
                        font-size: 0.88rem;
                        font-weight: 700;
                    }

                    /* Inputs */
                    form input {
                        width: 100%;
                        box-sizing: border-box;
                        padding: 11px 13px;
                        margin-bottom: 4px;

                        border: 1px solid #d1d5db;
                        border-radius: 8px;
                        background: #ffffff;

                        color: #1a1d23;
                        font-family: inherit;
                        font-size: 0.95rem;

                        outline: none;
                        transition:
                            border-color 0.2s ease,
                            box-shadow 0.2s ease,
                            transform 0.2s ease;
                    }

                    form input:hover {
                        border-color: #9ca3af;
                    }

                    form input:focus {
                        border-color: #2563eb;
                        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
                    }

                    /* Login Button */
                    form button {
                        width: 100%;
                        margin-top: 14px;
                        padding: 11px 16px;

                        border: 1px solid #1d4ed8;
                        border-radius: 8px;

                        background: linear-gradient(
                            135deg,
                            #2563eb,
                            #1d4ed8
                        );

                        color: #ffffff;
                        font-family: inherit;
                        font-size: 0.95rem;
                        font-weight: 700;

                        cursor: pointer;

                        box-shadow:
                            0 4px 10px rgba(37, 99, 235, 0.22),
                            inset 0 1px 0 rgba(255, 255, 255, 0.15);

                        transition:
                            transform 0.2s ease,
                            box-shadow 0.2s ease,
                            background 0.2s ease;
                    }

                    form button:hover {
                        background: linear-gradient(
                            135deg,
                            #1d4ed8,
                            #1e40af
                        );

                        transform: translateY(-2px);

                        box-shadow:
                            0 7px 16px rgba(37, 99, 235, 0.28),
                            inset 0 1px 0 rgba(255, 255, 255, 0.15);
                    }

                    form button:active {
                        transform: translateY(0);
                        box-shadow:
                            0 3px 7px rgba(37, 99, 235, 0.2);
                    }

                    /* Error Message */
                    form p {
                        margin: 0 0 18px;
                        padding: 10px 12px;

                        border: 1px solid #fecaca;
                        border-radius: 7px;

                        background: #fef2f2;
                        color: #dc2626 !important;

                        font-size: 0.88rem;
                        font-weight: 600;
                        text-align: center;
                    }

                    /* Footer */
                    form + h4 {
                        margin: 0 auto;
                        text-align: center;

                        color: #9ca3af;
                        font-size: 0.75rem;
                        font-weight: 500;
                    }

                    /* Responsive */
                    @media (max-width: 500px) {
                        form {
                            margin-top: 60px;
                            padding: 30px 25px;
                        }

                        form h1 {
                            font-size: 1.6rem;
                        }
                    }
                `}
            </style>

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