import React from 'react';
import '../rec-css/DashboardOverview.css';

function DashboardOverview() {
  return (
    <div className="dashboard-overview">
      <h1 className="dashboard-title">Dashboard Overview</h1>
      <p className="dashboard-welcome">Welcome to the Receptionist Dashboard!</p>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h2 className="stat-number">50</h2>
          <p className="stat-label">Patients Registered</p>
        </div>
        <div className="stat-card">
          <h2 className="stat-number">20</h2>
          <p className="stat-label">Appointments Scheduled</p>
        </div>
        <div className="stat-card">
          <h2 className="stat-number">5</h2>
          <p className="stat-label">Pending Approvals</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;
