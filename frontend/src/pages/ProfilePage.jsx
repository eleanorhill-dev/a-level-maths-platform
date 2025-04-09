import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    } else {
      const fetchProfile = async () => {
        try {
          const response = await fetch('http://localhost:5000/profile', {
            method: 'GET',
            credentials: 'include', 
          });
      
          if (response.ok) {
            const profileData = await response.json();
            setProfileData(profileData);
          } else {
            console.error('Profile fetch failed');
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      };

      fetchProfile(); 
    }
  }, [navigate]); 

  
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include",
      });
  
      if (response.ok) {
        sessionStorage.removeItem("authToken");
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  
  if (error) {
    return <div>{error}</div>;
  }

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p><strong>First Name:</strong> {profileData.fname}</p>
      <p><strong>Last Name:</strong> {profileData.sname}</p>
      <p><strong>Email:</strong> {profileData.email}</p>
      <p><strong>Username:</strong> {profileData.uname}</p>

      <button onClick={handleLogout} className="btn btn-danger">Logout</button>
    </div>
  );
};

export default ProfilePage;
