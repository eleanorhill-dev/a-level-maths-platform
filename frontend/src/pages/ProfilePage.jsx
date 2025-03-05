import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { id } = useParams();  
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/profile/${id}`); 
        if (!response.ok) {
          throw new Error("User not found");
        }
        const data = await response.json();
        setProfileData(data); 
      } catch (err) {
        setError("Error fetching profile data: " + err.message);
      }
    };

    fetchProfileData();
  }, [id]); 

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
    </div>
  );
};

export default ProfilePage;
