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
  const [isPasswordChanging, setIsPasswordChanging] = useState(false); // Track if password change form is visible
  const navigate = useNavigate();
  const { logout } = useAuth();
  const defaultProfileImage = '/main_images/default_avatar.webp';

  // Presaved avatar images
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
      console.log("Selected avatar URL:", selectedAvatarUrl);  // Debugging input
  
      const response = await fetch('http://localhost:5000/update-avatar', {
        method: 'POST',
        body: JSON.stringify({ avatarUrl: selectedAvatarUrl }),
        credentials: 'include',  // Ensure cookies are sent
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log("Response status:", response.status);  // Debugging response
  
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
  };

  const saveField = async (field) => {
    try {
      const response = await fetch("http://localhost:5000/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ [field]: userInfo[field] }),
      });
      if (response.ok) {
        setEditingField(null);
      } else {
        alert("Error saving field");
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
    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      if (response.ok) {
        alert("Password changed successfully");
        setIsPasswordChanging(false); // Hide input fields after successful change
      } else {
        alert("Error changing password");
      }
    } catch (error) {
      console.error("Password change error:", error);
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
      <div className="profile-header">
        <div className="profile-img-wrapper">
          <img
            src={profilePic || defaultProfileImage}
            alt="Profile"
            className="profile-img"
          />
        </div>

        <div className="section-card profile-info">
          <h3>Account Info</h3>
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
      </div>

      <div className = "section-card avatar-section">
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

      <div className="section-card learning-goal">
        <h3>Learning Goal</h3>
        <div className="progress-ring">
          <svg className="circular-progress" width="150" height="150">
            <circle className="circle-bg" cx="75" cy="75" r="60" />
            <circle
              className="circle"
              cx="75"
              cy="75"
              r="60"
              strokeDasharray={376}  // 2πr
              strokeDashoffset={learningGoal ? 376 - (progress / learningGoal) * 376 : 376}
            />
          </svg>
          <div className="progress-text">{`${progress} / ${learningGoal}`}</div>
        </div>

        <input
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
        <button onClick={handleLearningGoalChange}>Update Goal</button>
      </div>

      <div className="section-card change-password">
        <h3>Change Password</h3>
        <button onClick={() => setIsPasswordChanging(!isPasswordChanging)}>
          {isPasswordChanging ? 'Cancel' : 'Change Password'}
        </button>

        {isPasswordChanging && (
          <div className="change-password-inputs">
            <input
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <button onClick={handlePasswordChange}>Update Password</button>
          </div>
        )}
      </div>

      <div className="account-actions">
        <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
        <button className="btn btn-danger" onClick={handleAccountDeletion}>Delete Account</button>
      </div>
    </div>
  );
};

export default ProfilePage;
