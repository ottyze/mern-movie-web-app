import React from 'react';
import "./Register.css";
import { useAppContext } from './AppContext';

function Register({setAuth}) {

  const { setEmail } = useAppContext();

  const onFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const userData = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      const response = await fetch('http://localhost:3030/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(userData),
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        setEmail(userData.email)
        setAuth(data.userName)
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error');
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Register</h2>
        <form className="register" onSubmit={onFormSubmit}>
          <div>
            <label>First Name</label>
            <input type="text" name="firstName" placeholder="First Name" required />
          </div>
          <div>
            <label>Last Name</label>
            <input type="text" name="lastName" placeholder="Last Name" required />
          </div>
          <div>
            <label>Email</label>
            <input type="email" name="email" placeholder="Email" required />
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" placeholder="Password" required />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Register;