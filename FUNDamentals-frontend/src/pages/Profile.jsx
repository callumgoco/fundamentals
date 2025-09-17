import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import './Profile.css'

function Profile() {
  const { user } = useAuth()

  return (
    <div className="profile">
      <div className="profile-header">
        <div className="header-content">
          <div className="header-text">
            <h1 className="profile-title">Profile</h1>
            <p className="profile-subtitle">Manage your account and personalize your learning experience</p>
          </div>
          <div className="profile-animation-container">
            <div className="profile-icon-wrapper">
              <span className="material-icons profile-icon">person</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="profile-content">
        <div className="profile-section">
          <h3>Account Information</h3>
          <div className="profile-info">
            <div className="info-item">
              <label>Username:</label>
              <span>{user?.username}</span>
            </div>
            <div className="info-item">
              <label>Email:</label>
              <span>{user?.email}</span>
            </div>
            <div className="info-item">
              <label>Member since:</label>
              <span>January 2025</span>
            </div>
          </div>
        </div>
        
        <div className="profile-section">
          <h3>Learning Preferences</h3>
          <div className="profile-info">
            <div className="info-item">
              <label>Financial Goal:</label>
              <span>{user?.goal || 'Not set'}</span>
            </div>
            <div className="info-item">
              <label>Confidence Level:</label>
              <span>{user?.confidence || 'Not set'}/10</span>
            </div>
            <div className="info-item">
              <label>Learning Style:</label>
              <span>{user?.learning_style || 'Not set'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
