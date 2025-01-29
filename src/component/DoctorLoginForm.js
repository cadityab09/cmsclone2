import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/DoctorLoginForm.css';
import authServices from '../services/AuthServices';
import UserStorageService from '../services/UserStorageService';

const DoctorLoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogin = (e) => {
        e.preventDefault();
        const hardCodedUsername = "doctor@gmail.com";
        const hardCodedPassword = "pass123";

        // if (username === hardCodedUsername && password === hardCodedPassword) {
        //     setMessage("Login successful!");
        //     setTimeout(() => {
        //         navigate('/Doctordashboard'); // Navigate to dashboard after success
        //     }, 1000); // Delay for user to see the success message
        // } else {
        //     setMessage("Invalid username or password.");
        // }
        authServices.login({"username": username, "password": password}).then((res)=>{
            console.log("login successfull");
            console.log(res);

            if(res.data != null){
                console.log(res);
                const user = {
                  id: res.data.username,
                  role: res.data.userRole
                }
        
                UserStorageService.saveUser(user);
                UserStorageService.saveToken(res.data.jwt);
                
                if(user.role=="ADMIN"){
                    navigate('/DoctorDashboard');
                }
                else if(UserStorageService.isCustomerLoggedIn()){
                    navigate('/customer/rooms');
                }
              }
        }).catch((err)=>{
            console.log("invalid Credintial.")
        });
    };

    return (
        <div className="position-relative d-flex justify-content-center align-items-center vh-100">
            {/* Background Video */}
            <video autoPlay loop muted className="position-absolute w-100 h-100" style={{ objectFit: 'cover', zIndex: -1 }}>
                <source src="../" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Custom Background Shapes */}
            <div className="position-absolute shape"></div>
            <div className="position-absolute shape"></div>

            <form onSubmit={handleLogin} className="doctor-login-form p-4 bg-white bg-opacity-25 rounded shadow-lg" style={{ backdropFilter: 'blur(10px)', maxWidth: '400px' }}>
                <h3 className="text-center mb-4">Doctor Login</h3>

                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Email or Phone"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">Log In</button>

                {message && <div className={`mt-3 text-center ${message === "Login successful!" ? 'text-success' : 'text-danger'}`}>{message}</div>}

                <div className="d-flex justify-content-between mt-4">
                    <button type="button" className="btn btn-light d-flex align-items-center">
                        <i className="fab fa-google me-2"></i> Google
                    </button>
                    <button type="button" className="btn btn-light d-flex align-items-center">
                        <i className="fab fa-facebook me-2"></i> Facebook
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DoctorLoginForm;
