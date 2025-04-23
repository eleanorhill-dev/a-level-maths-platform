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
    setFormData({ ...formData, [name]: value });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "450px" }}>
        <div className="text-center mb-3">
          <img
            src="/main_images/logo.png"
            alt="MathsUncoded Logo"
            style={{ maxHeight: "60px", width: "auto" }}
            className="mb-3"
          />
          <h4 className="fw-bold">Create your account</h4>
        </div>

        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <input
              type="text"
              name="fname"
              className="form-control"
              placeholder="First name"
              value={formData.fname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <input
              type="text"
              name="sname"
              className="form-control"
              placeholder="Surname"
              value={formData.sname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <input
              type="text"
              name="email"
              className="form-control"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <input
              type="text"
              name="uname"
              className="form-control"
              placeholder="Username"
              value={formData.uname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <input
              type={showPassword ? "text" : "password"}
              name="pword"
              className="form-control"
              placeholder="Password"
              value={formData.pword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPword"
              className="form-control"
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

          <button
            type="submit"
            className="w-full bg-[#E07A5F] text-white font-semibold py-2 rounded-lg hover:bg-[#d16c56] transition duration-200"
          >
            Register
          </button>
        </form>

        <div className="forgot-register">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-[#81B29A] hover:underline"
          >
            Already got an account? Login here
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
