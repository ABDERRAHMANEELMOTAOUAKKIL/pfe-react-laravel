import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './host.css'

export const LoginHost = () => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleClick() {
    navigate('/host-register');
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/host-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // const data = await response.json();

      if (response.ok) {
        // Login successful
        const { host, token } = await response.json();
        localStorage.setItem('token',token);
        console.log('Logged in as:', host.name);
        navigate(`/host-profile/${host.name}`);
      } else if (response.status === 401) {
        // Login failed
        setError('Invalid email or password.');
      } else {
        setError('Something went wrong. Please try again later.');
      }
    } catch (error) {
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="auth-form">
      <h2>Welcome Back Super Host! </h2>
      {error && <div>{error}</div>}
      <form className='login-form' onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-primary mt-3" type="submit">Log In</button>   
        <a onClick={handleClick} style={{listStyle:'none', cursor:'pointer', textDecoration:"1px solid underline"}} >Do not have an  account? Register here</a>

      </form>
    </div>
  );
};
