import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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
        console.error("Unexpected response:", errorText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F1DE] px-4 bg-pattern">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-semibold text-[#3D405B] text-center mb-6">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-[#3D405B] font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#81B29A]"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-[#3D405B] font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#81B29A]"
            />
          </div>

          <div className="forgot-register">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-[#81B29A] hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#E07A5F] text-white font-semibold py-2 rounded-lg hover:bg-[#d16c56] transition duration-200"
          >
            Log In
          </button>
        </form>

        <div className="forgot-register">
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-[#81B29A] hover:underline"
          >
            Not got an account? Register here
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
