import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [editingField, setEditingField] = useState(null);
  const [error, setError] = useState(null);
  const [learningGoal, setLearningGoal] = useState(0);
  const [profilePic, setProfilePic] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isPasswordChanging, setIsPasswordChanging] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const defaultProfileImage = '/main_images/default_avatar.webp';
  const [accountError, setAccountError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [quizStats, setQuizStats] = useState({
    totalQuizzesTaken: 0,
    highestScore: 0,
    mostImprovedTopic: "N/A"
  });

  const avatarOptions = [
    '/avatars/avatar1.webp',
    '/avatars/avatar2.webp',
    '/avatars/avatar3.png',
    '/avatars/avatar4.webp',
    '/avatars/avatar5.webp',
    '/avatars/avatar6.webp',
    '/avatars/avatar7.webp',
    '/avatars/avatar8.png',
    '/avatars/avatar9.webp',
    '/avatars/avatar10.webp',
    '/avatars/avatar11.webp',
    '/avatars/avatar12.webp'
  ];

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
            const data = await response.json();
            setProfileData(data);
            setUserInfo({
              fname: data.fname,
              sname: data.sname,
              email: data.email,
              uname: data.uname,
            });
  
            setProfilePic(data.profile_pic || null);
            setLearningGoal(data.learning_goal || 0);
            setProgress(data.quizzes_completed_this_month || 0);
  
            setQuizStats({
              totalQuizzesTaken: data.total_quizzes_taken || 0,
              highestScore: data.highest_score || 0,
              mostImprovedTopic: data.most_improved_topic || "N/A",
            });
  
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

  const handleAvatarSelect = async (selectedAvatarUrl) => {
    try {
      console.log("Selected avatar URL:", selectedAvatarUrl); 
  
      const response = await fetch('http://localhost:5000/update-avatar', {
        method: 'POST',
        body: JSON.stringify({ avatarUrl: selectedAvatarUrl }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log("Response status:", response.status);
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Avatar updated successfully', data);

      setProfilePic(selectedAvatarUrl);
    } catch (error) {
      console.error('Error updating avatar:', error);
      alert('Failed to update avatar, please try again.');
    }
  };
  

  const handleInputChange = (field, value) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
    setAccountError("");
  };

  const saveField = async (field) => {
    const value = userInfo[field];

    if (field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setAccountError("Please enter a valid email address.");
        return;
      }
    }

    if (field === "username" && value.trim() === "") {
      setAccountError("Username cannot be empty.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ [field]: value }),
      });

      const result = await response.json();

      if (response.ok) {
        setEditingField(null);
      } else {
        setAccountError(result.error || "Error saving field");
      }
    } catch (error) {
      console.error("Save field error:", error);
    }
  };

  const handleLearningGoalChange = async () => {
    try {
      const response = await fetch("http://localhost:5000/set-learning-goal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ learningGoal }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.error || "Error updating goal");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong");
    }
  };

  const handlePasswordChange = async () => {
  
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setPasswordError("All fields are required.");
      return;
    }
  
    if (!passwordRegex.test(newPassword)) {
      setPasswordError("New password must be at least 8 characters with uppercase, lowercase, number, and symbol.");
      return;
    }
  
    if (newPassword !== confirmNewPassword) {
      setPasswordError("New password and confirm password do not match.");
      return;
    }
  
    if (newPassword === currentPassword) {
      setPasswordError("New password cannot be the same as the current password.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          currentPassword: currentPassword,
          newPassword: newPassword,
          confirmNewPassword: confirmNewPassword
        }),
        
      });
  
      console.log("Password change request sent");
      console.log("Response:", response);
  
      const result = await response.json();
  
      if (response.ok) {
        alert("Password changed successfully");
        setIsPasswordChanging(false);
        setPasswordError("");
      } else {
        setPasswordError(result.error || "Error changing password");
      }
    } catch (error) {
      console.error("Password change request failed:", error);
      setPasswordError("Network error or server not responding.");
    }
  };
  

  const handleAccountDeletion = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action is permanent.")) {
      try {
        const response = await fetch("http://localhost:5000/delete-account", {
          method: "DELETE",
          credentials: "include",
        });
        if (response.ok) {
          alert("Account deleted successfully");
          sessionStorage.removeItem("authToken");
          logout(false);
          navigate("/login");
        } else {
          alert("Error deleting account");
        }
      } catch (error) {
        console.error("Account deletion error:", error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        sessionStorage.removeItem("authToken");
        logout(false);
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (error) return <div>{error}</div>;
  if (!profileData) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <h1>Profile</h1>
  
      <div className="profile-dashboard">
        {/* Left Column */}
        <div className="profile-column">
          {/* Profile Picture */}
          <div className="profile-header">
            <div className="profile-img-wrapper">
              <img
                src={profilePic || defaultProfileImage}
                alt="Profile"
                className="profile-img"
              />
            </div>
          </div>
  
          {/* Account Info */}
          <div className="section-card profile-info">
            <h3>Account Info</h3>

            {accountError && <div className="alert alert-danger">{accountError}</div>}
                
            {['First Name', 'Surname', 'Email', 'Username'].map((label, i) => {
              const fieldKey = ['fname', 'sname', 'email', 'uname'][i];
              return (
                <div key={fieldKey} className="editable-field">
                  {editingField === fieldKey ? (
                    <>
                      <div className="input-container">
                        <input
                          type="text"
                          value={userInfo[fieldKey] || ''}
                          onChange={e => handleInputChange(fieldKey, e.target.value)}
                          className="input-field"
                        />
                        <button onClick={() => saveField(fieldKey)} className="edit-icon-button save-btn">
                          💾
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p><strong>{label}:</strong> {userInfo[fieldKey]}</p>
                      <button onClick={() => setEditingField(fieldKey)} className="edit-icon-button edit-btn">
                        ✏️
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </div>


          {/* Change Password Section */}
          <div className="section-card change-password">
            <h3>Change Password</h3>

            {isPasswordChanging ? (
              <div className="change-password-inputs">

                {passwordError && <div className="alert alert-danger">{passwordError}</div>}
                
                <input
                  type="password"
                  placeholder="Current password"
                  value={currentPassword}
                  onChange={(e) => {
                    setPasswordError("");
                    setCurrentPassword(e.target.value);
                  }}
                />
                <input
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => {
                    setPasswordError("");
                    setNewPassword(e.target.value);
                  }}
                />
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmNewPassword}
                  onChange={(e) => {
                    setPasswordError("");
                    setConfirmNewPassword(e.target.value);
                  }}
                />

                <div className="button-row">
                  <button onClick={handlePasswordChange} className="btn btn-primary">Save Changes</button>
                  <button
                    onClick={() => {
                      setIsPasswordChanging(false);
                      setCurrentPassword("");
                      setNewPassword("");
                      setConfirmNewPassword("");
                      setPasswordError("");
                    }}
                    className="btn btn-primary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button onClick={() => setIsPasswordChanging(true)} className="btn btn-primary">
                Change Password
              </button>
            )}
          </div>

        </div>
  
        {/* Right Column */}
        <div className="profile-column">
          {/* Avatar Selection */}
          <div className="section-card avatar-section">
            <h3>Select Avatar</h3>
            <div className="avatar-options-container">
              <div className="avatar-options">
                {avatarOptions.map((avatarUrl, index) => (
                  <img
                    key={index}
                    src={avatarUrl}
                    alt={`Avatar ${index + 1}`}
                    className="avatar-option"
                    onClick={() => handleAvatarSelect(avatarUrl)}
                    style={{ border: profilePic === avatarUrl ? '2px solid #00f' : '' }}
                  />
                ))}
              </div>
            </div>
          </div>


          {/* Learning Goal & Progress */}
          <div className="section-card learning-goal">
            <h3>Learning Goal</h3>
            <div className="goal-container">
              <div className="progress-ring">
                <svg className="circular-progress" width="150" height="150">
                  <circle className="circle-bg" cx="75" cy="75" r="60" />
                  <circle
                    className="circle"
                    cx="75"
                    cy="75"
                    r="60"
                    strokeDasharray={376}
                    strokeDashoffset={learningGoal ? 376 - (Math.min(progress / learningGoal, 1) * 376) : 376}
                  />
                </svg>
                <div className="progress-text">{`${progress} / ${learningGoal}`}</div>
              </div>
              <div className="goal-form">
                <input
                  className="goal-input"
                  type="number"
                  value={learningGoal}
                  min={1}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    if (!isNaN(val) && val >= 1) {
                      setLearningGoal(val);
                    }
                  }}
                />
                <button onClick={handleLearningGoalChange} className="btn btn-primary goal-btn">Update</button>
              </div>
            </div>
          </div>

  
          
  
          {/* Account Actions (Logout & Delete) */}
          <div className="account-actions">
            <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
            <button className="btn btn-danger" onClick={handleAccountDeletion}>Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default ProfilePage;
