import React, { useState } from 'react';
import './host.css'
import { useNavigate } from 'react-router';

export const RegisterHost = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate= useNavigate()
  function handleClick() {
    navigate('/host-login');
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/host-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
          password_confirmation: passwordConfirmation,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setSuccess(true);
        setError('');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      setError(error.message);
      setSuccess(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>Register to join the Host team on VacaY</h2>
      {error && <div>{error}</div>}
      {success && <div>Registration successful!</div>}
      <form className='register-form ' onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="passwordConfirmation">Confirm Password</label>
        <input
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
        />
 <button className="btn btn-primary mt-3" type="submit">Sign In</button>   
     <a onClick={handleClick} style={{listStyle:'none', cursor:'pointer',textDecoration:"1px solid underline"}} >Already a have an account?Login</a>
      </form>
    </div>
  );
};
