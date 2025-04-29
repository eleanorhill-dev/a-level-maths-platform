import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/RegisterPage.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fname: "",
    sname: "",
    email: "",
    uname: "",
    pword: "",
    confirmPword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!passwordRegex.test(formData.pword)) {
      setErrorMessage("Password must be at least 8 characters, with uppercase, lowercase, number, and symbol.");
      return;
    }

    if (formData.pword !== formData.confirmPword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fname: formData.fname,
          sname: formData.sname,
          email: formData.email,
          uname: formData.uname,
          pword: formData.pword,
        }),
      });

      if (response.ok) {
        navigate("/login");
      } else {
        const errorText = await response.text();
        setErrorMessage(errorText || "Registration failed.");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred.");
    }
  };

  return (
    <div className="d-flex min-h-screen justify-content-center align-items-center vh-100">
      <div className="card">
        <div className="text-center mb-3">
          <img src="/main_images/logo.png" alt="MathsUncoded Logo" className="mb-3" />
          <h4 className="fw-bold">Create your account</h4>
        </div>
  
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
  
        <form onSubmit={handleSubmit}>
          <div className="mb-1">
            <input
              type="text"
              name="fname"
              className="w-full"
              placeholder="First name"
              value={formData.fname}
              onChange={handleChange}
              required
            />
          </div>
  
          <div className="mb-1">
            <input
              type="text"
              name="sname"
              className="w-full"
              placeholder="Surname"
              value={formData.sname}
              onChange={handleChange}
              required
            />
          </div>
  
          <div className="mb-1">
            <input
              type="text"
              name="email"
              className="w-full"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
  
          <div className="mb-1">
            <input
              type="text"
              name="uname"
              className="w-full"
              placeholder="Username"
              value={formData.uname}
              onChange={handleChange}
              required
            />
          </div>
  
          <div className="mb-1">
            <input
              type={showPassword ? "text" : "password"}
              name="pword"
              className="w-full"
              placeholder="Password"
              value={formData.pword}
              onChange={handleChange}
              required
            />
          </div>
  
          <div className="mb-1">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPword"
              className="w-full"
              placeholder="Confirm password"
              value={formData.confirmPword}
              onChange={handleChange}
              required
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
            <label className="form-check-label" htmlFor="showPassword">
              Show password
            </label>
          </div>
  
          <div className = "centered-button">
            <button type="submit">Register</button>
          </div>
        </form>
  
        <div className="forgot-register mt-3 text-center">
          <button type="button" onClick={() => navigate("/login")}>
            Already got an account? Login here
          </button>
        </div>
      </div>
    </div>
  );
  
  
};

export default RegisterForm;
