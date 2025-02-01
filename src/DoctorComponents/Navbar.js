import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../DoctorCSS/Navbar.css";
import { FaRegUserCircle } from 'react-icons/fa';

function Navbar({ changeSideNavStatus }) {

    const [isExpandedUser, setIsExpandedUser] = useState(false);

    const expandedUserFunc=()=>{
        setIsExpandedUser(prev => !prev);
    }

    return (
        <>
            <nav className="navbar navbar-expand navbar-dark  px-2" style={{ height: "60px" }}>
                <div className="nav-container">
                    <div className="side-nav-button p-2 me-3 text-light d-lg-none">
                        <FontAwesomeIcon icon={faBars} onClick={() => { changeSideNavStatus(); console.log('hi'); }} />
                    </div>

                    <div className="nav-name-routes">
                        <Link to="#" className="navbar-brand px-2">
                            DOCTOR ADMIN DASHBOARD
                        </Link>
                    </div>
                    <div className='user-icon'>
                        <a onClick={expandedUserFunc}>
                            <i className="fa-regular fa-circle-user" ></i>
                        </a>
                        {isExpandedUser && (
                            <div className='user-info-popup'>
                                    <div className='usericon-div'>
                                    <FaRegUserCircle className="popup-icon"  />   
                                    </div>   
                                    <div className="popup-container">
                                        <div className="popup-box">
                                            <p>Welcome, User!</p>
                                            <ul>
                                                <li>Profile</li>
                                                <li>Settings</li>
                                            
                                            </ul>
                                           
                                        </div>
                                        <Link to="/">
                                            <button className='logout-btn'>
                                                    Logout
                                            </button>
                                        </Link>
                                        
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;
