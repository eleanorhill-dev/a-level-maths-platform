import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrorMessage("");
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setErrorMessage("You must enter all details.");
      return;
    }

    const userData = {
      uname: formData.username,
      pword: formData.password,
    };

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
      });

      const contentType = response.headers.get("content-type");
      if (response.ok && contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (data && data.id) {
          sessionStorage.setItem("userId", data.id);
          login(true);
          navigate("/profile");
        }
      } else {
        const errorText = await response.text();
        setErrorMessage(errorText.message || "Invalid Credentials");
      }
    } catch (error) {
      setErrorMessage("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F4F1DE] px-4 bg-pattern">
      <img
        src="/main_images/logo.png"
        alt="MathsUncoded Logo"
        className="login-logo"
      />
  
      <div className="login-form-container">
        <div className="text-center mb-3">
          <h4 className="login-form-title">Login</h4>
        </div>

        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
  
          <div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
  
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="showPassword"
              checked={showPassword}
              onChange={handleShowPassword}
            />
            <label className="show-password-label" htmlFor="showPassword">
              Show password
            </label>
          </div>

          <div className="centered-button">
          <button
            type="submit"
          >
            Log In
          </button>
          </div>
        </form>
  
        <div className="forgot-register mt-3 text-center">
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="register-link"
          >
            Not got an account? Register here
          </button>
        </div>
      </div>
    </div>
  );

};

export default LoginPage;
