import React from "react";
import "./PageNotFound.css"; // Make sure to create this CSS file for styles

const PageNotFound = () => {
  return (
    <main className="not-found-main">
      <div className="not-found-container">
      <div className="icon-container">
          <i className="bi bi-exclamation-circle"></i> {/* Bootstrap Icon */}
        </div>
        <p className="error-code">404</p>
        <h1 className="page-title">Page not found</h1>
        <p className="error-message">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="action-buttons">
          <a href="#" className="home-button">
            Go back home
          </a>
          <a href="/" className="support-link">
            Contact support <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
};

export default PageNotFound;
