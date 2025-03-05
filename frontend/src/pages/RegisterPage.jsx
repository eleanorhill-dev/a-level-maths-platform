import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      fname: formData.fname,
      sname: formData.sname,
      email: formData.email,
      uname: formData.uname,
      pword: formData.pword,
    };

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log("Registration successful");
        navigate("/login");  
      } else {
        const errorText = await response.text();
        console.error("Error:", errorText);
        setErrorMessage("An error occurred during registration.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred.");
    }
  };

  
  

  return (
    <div className="container">
      <h2>Register</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <div className="mb-3">
          <label htmlFor="fname" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="fname"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            required
          />
        </div>

        {/* Surname */}
        <div className="mb-3">
          <label htmlFor="sname" className="form-label">
            Surname
          </label>
          <input
            type="text"
            className="form-control"
            id="sname"
            name="sname"
            value={formData.sname}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Username */}
        <div className="mb-3">
          <label htmlFor="uname" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="uname"
            name="uname"
            value={formData.uname}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="pword" className="form-label">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            id="pword"
            name="pword"
            value={formData.pword}
            onChange={handleChange}
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-3">
          <label htmlFor="confirmPword" className="form-label">
            Confirm Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            id="confirmPword"
            name="confirmPword"
            value={formData.confirmPword}
            onChange={handleChange}
            required
          />
        </div>

        {/* Show Password Checkbox */}
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="showPassword"
            checked={showPassword}
            onChange={handleShowPassword}
          />
          <label className="form-check-label" htmlFor="showPassword">
            Show Password
          </label>
        </div>

        {/* Register Button */}
        <button type="submit" className="btn btn-primary mt-3">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
