import React, { useState } from "react";
import "./auth.css";
import { useNavigate, useParams } from "react-router";

export const Login = () => {
  const { name } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  function handleClick() {
    navigate('/register');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { user, token } = await response.json();
        localStorage.setItem("token", token);
          console.log("Logged in as:", user.name);
       // redirect to dashboard or some other page
       navigate(`/user/${user.name}`);

      } else {
        setError("Invalid email or password.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    }
  };


  return (
    <div className="auth-form">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          minLength={8}
          required
        />
         <button type="submit" className="btn btn-outline-primary" >Log In</button> <br />
     <a onClick={handleClick} style={{listStyle:'none', cursor:'pointer',textDecoration:"1px solid underline"}} >you Do not have an account?Register here</a>
      </form>
    </div>
  );
};


