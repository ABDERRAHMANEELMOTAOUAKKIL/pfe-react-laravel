import { useState } from 'react';
import './auth.css'
import { useNavigate } from 'react-router';

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, SetPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate= useNavigate()
  function handleClick() {
    navigate('/login');
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone_number,
          password,
          password_confirmation: passwordConfirmation,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      console.log(data);
      setSuccess(true);
      setError(null);
    } catch (error) {
      setError(error.message);
      setSuccess(false);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePhoneChange = (e) => {
    SetPhoneNumber(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmationChange = (e) => {
    setPasswordConfirmation(e.target.value);
  };

  return (
    <div className="auth-form">
      <h2>Register To be valuable Client ! </h2>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">Registration successful!</div>}

      <form onSubmit={handleSubmit} className='register-form'>
        <div>
          <label htmlFor="name">Full Name:</label><br />
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label><br />
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone_number">Phone Number:</label><br />
          <input
            type="phone_number"
            id="phone_number"
            value={phone_number}
            onChange={handlePhoneChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label><br />
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>

        <div>
          <label htmlFor="passwordConfirmation">Confirm Password:</label><br />
          <input
            type="password"
            id="passwordConfirmation"
            value={passwordConfirmation}
            onChange={handlePasswordConfirmationChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-outline-primary" >Sign In</button> <br />
     <li onClick={handleClick} style={{listStyle:'none', cursor:'pointer',textDecoration:"1px solid underline"}} >Already a have an account?Login</li>
      </form>
    </div>
  );
};






// import React, { SyntheticEvent, useState } from "react";
// import './auth.css'
// import { Login } from "./Login";
// // import { redirect } from "react-router-dom";
// // import axios from "axios";

// export const Register = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPass] = useState('');
//     const [name, setName] = useState('');
//     const [passwordConfirmation, setPasswordConfirmation] = useState('');
//     const [errors] = useState(null);
//     const [redirect, setRedirect] = useState(false);


//     const handleSubmit = async (e: SyntheticEvent) => {
//         e.preventDefault();
//         // console.log({
//         //   name,
//         //   email,
//         //   currentPassword,
//         // })
     
//       await fetch('http://127.0.0.1:8000/api/login', {
//             method:'POST',
//             headers:{
//               'Content-Type': 'application/json',
//               'Accept': 'application/json'
//           },
//             body:JSON.stringify({
//               name,
//               email,
//               password
//             })  
            
//           });
//             // const content = await response.json();
//             // console.log(content);

          
//       //     console.log(response.data.user);
//       // } catch (error) {
//       //     setErrors(error.response.data.errors);
//       // }
//       setRedirect(true);
//   }


//     const [showLogin, setShowLogin] = useState(false);

//   function goToLogin() {
//     setShowLogin(true);
//   }

//   if (showLogin) {
//     return <Login />;
//   }


//   if(redirect) {
//   return < Login/>

//  }
 
   
//     return (
//         <div className="auth-form">
//             <h2>Register</h2>
//         <form className="register-form" onSubmit={handleSubmit}>

//             <label htmlFor="name">Full name</label>
//             <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name" required />
//             {errors && errors.name && <span>{errors.name[0]}</span>}

//             <label htmlFor="email">email</label>
//             <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" required/>
//             {errors && errors.email && <span>{errors.email[0]}</span>}

//             <label htmlFor="password">password</label>
//             <input value={password} onChange={(e) => setPass(e.target.value)} type="password"  id="password" name="password" />
//             {errors && errors.password && <span>{errors.password[0]}</span>}

//             <label htmlFor="passwordConfirmation">Confirm Password</label>
//                 <input type="passwordConfirmation" id="passwordConfirmation" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)}  required/>
//                 {errors && errors.password_confirmation && <span>{errors.password_confirmation[0]}</span>}

//             <button className="btn-login"  type="submit">Register</button>
//         </form>
//         <li className="link" onClick={goToLogin}>Already have an account? Login here.</li>
        
//     </div>
//     )
//     }
// import React, { useState } from "react";