import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/NurseLoginForm.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Example login validation (replace with real authentication logic)
    if (email === 'nurse@gmail.com' && password === 'pass123') {
      // Save login state (e.g., using local storage or a global state)
      localStorage.setItem('isLoggedIn', true);
      navigate('/Nursedashboard'); // Redirect to the dashboard
    } else {
      alert('Invalid credentials');
    }
    
  };

  return (
    
    <div className="container nlf-container">
      
      <form onSubmit={handleLogin} className='nurse-login-form'>
      <h2>Nurse Login</h2>
        <div className="mb-3">
          <label htmlFor="email" className="form-labelemail">Email</label>
         
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-labelpassword">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
