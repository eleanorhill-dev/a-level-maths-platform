import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index";
import { useAuth } from "../AuthContext";

const BaseLayout = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">MathsUncoded</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to={isAuthenticated ? "/" : "/login"}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to={isAuthenticated ? "/topics" : "/login"}>Topics</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to={isAuthenticated ? "/profile" : "/login"}>Profile</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to={isAuthenticated ? "/analytics" : "/login"}>Analytics</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="container-fluid">{children}</div>

      {/* Bootstrap JS */}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    </div>
  );
};

export default BaseLayout;
