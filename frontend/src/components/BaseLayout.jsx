import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index";
import { useAuth } from "../AuthContext";

const BaseLayout = ({ children }) => {
  const { isAuthenticated, xp } = useAuth();
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-navbar">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src="/main_images/logo2.png"
              alt="MathsUncoded Logo"
              style={{ height: "40px", width: "auto" }}
              className="me-2"
            />
          </Link>
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
                <Link
                  className={`nav-link ${isActive("/") ? "active" : ""}`}
                  to={"/"}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/topics") ? "active" : ""}`}
                  to={isAuthenticated ? "/topics" : "/login"}
                >
                  Topics
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/profile") ? "active" : ""}`}
                  to={isAuthenticated ? "/profile" : "/login"}
                >
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/analytics") ? "active" : ""}`}
                  to={isAuthenticated ? "/analytics" : "/login"}
                >
                  Analytics
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="content-container">{children}</div>

      {/* Floating XP Box */}
      {isAuthenticated && (
        <div className="floating-xp">
          XP: {xp}
        </div>
      )}

      {/* Bootstrap JS */}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    </div>
  );
};

export default BaseLayout;
