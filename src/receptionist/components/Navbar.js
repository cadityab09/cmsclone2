import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';


import "../rec-css/Navbar.css";
import { Button } from 'bootstrap';

function Navbar({changeSideNavStatus}) {
    return (
        <>
            <nav className="navbar navbar-expand navbar-dark bg-dark px-2">
                <div className="container-fluid">
                    <div className="side-nav-button p-2 me-3 text-light" > 
                        <FontAwesomeIcon icon={faBars} onClick={()=>{changeSideNavStatus(); console.log('hi')}}/>
                    </div>

                    <div className='nav-name-routes d-flex justify-content-between'>
                    <Link to="#" className="navbar-brand px-1">
                        RECEPTIONIST DASHBOARD
                    </Link>
                    <Link to="/"><button className='backbutton'>home</button></Link>
                    <div className="navbar-collapse1 ">
                        {/* <form action="" className="d-flex me-5">
                            <input type="search" placeholder="search" className="form-control me-2" />
                            <button className="btn btn-outline-light" type="submit">
                                Search
                            </button>
                        </form> */}

                        {/* <div className="profile-logo dropstart">
                            <button className="btn btn-outline-light dropdown-toggle" data-bs-toggle="dropdown">
                                Profile
                            </button>
                            <ul className="dropdown-menu dropdown-menu-dark">
                                <li>
                                    <Link to="/register" className="dropdown-item">
                                        Sign up
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/login" className="dropdown-item">
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        Your Profile
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-item">
                                        Log Out
                                    </a>
                                </li>
                            </ul>
                        </div> */}
                    </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar