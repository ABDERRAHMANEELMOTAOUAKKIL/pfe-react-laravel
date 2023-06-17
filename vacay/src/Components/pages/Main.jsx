import React, { useState } from "react";
import {Login} from "../Auth/Login";
import { Register } from "../Auth/Register";

function Main() {
    const [currentForm, setCurrentForm] = useState('login');

    const toggleForm = (formName) => {
      setCurrentForm(formName);
    }
  
    return (
      <div className="main">
        {
          currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
        }
      </div>
    );
  }
export default Main;