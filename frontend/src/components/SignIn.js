import React from 'react';
import "./SignIn.css";
import { useAppContext } from './AppContext';

function SignIn({ setAuth }) {

  const { setEmail } = useAppContext();

  const onFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      const response = await fetch('http://localhost:3030/signin', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(userData),
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        console.log("email_Signin.js", userData.email)
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
    <div className="sign-in-container">
      <div className='sign-in-form'>
        <h2>Sign In</h2>
        <form onSubmit={onFormSubmit}>
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

export default SignIn;