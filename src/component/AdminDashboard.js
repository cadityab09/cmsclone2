import React from 'react';
import '../CSS/AdminDashboard.css';

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className='rowclass'>
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="position-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Patients
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Appointments
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Messages
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Settings
                </a>
              </li>
            </ul>
          </div>
        </nav>
        </div>
        <div className='flexname'>
        {/* Main content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 dashboard">
          <h2>Doctor Dashboard</h2>
          <div className="row">
            {/* Example Cards */}
            <div className="col-md-6 col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Patients</h5>
                  <p className="card-text">View and manage patient records.</p>
                  <a href="#" className="btn btn-primary">Go to Patients</a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Appointments</h5>
                  <p className="card-text">Check and schedule appointments.</p>
                  <a href="#" className="btn btn-primary">Go to Appointments</a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Messages</h5>
                  <p className="card-text">Check and respond to messages.</p>
                  <a href="#" className="btn btn-primary">Go to Messages</a>
                </div>
              </div>
            </div>
          </div>
        </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
