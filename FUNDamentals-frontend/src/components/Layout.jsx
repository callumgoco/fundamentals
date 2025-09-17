import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import './Layout.css';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false);
  const [completedModules, setCompletedModules] = useState(0);
  const [sidebarProgress, setSidebarProgress] = useState(0);
  const { user, logout } = useAuth();
  const location = useLocation();
  const totalModules = 5;

  const isActive = (path) => location.pathname === path;

  // Fetch user progress data
  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        // Get module progress
        const { data: moduleProgress } = await supabase
          .from('module_progress')
          .select('*')
          .eq('user_id', user?.id)
          .single();

        if (moduleProgress) {
          let completed = 0;
          if (moduleProgress.budgeting_progress === 100) completed++;
          if (moduleProgress.savings_progress === 100) completed++;
          if (moduleProgress.investing_progress === 100) completed++;
          if (moduleProgress.debt_progress === 100) completed++;
          if (moduleProgress.insurance_progress === 100) completed++;
          
          setCompletedModules(completed);
          setSidebarProgress(Math.round((completed / totalModules) * 100));
        }
      } catch (error) {
        console.error('Error fetching user progress:', error);
      }
    };

    // Only fetch if we don't already have progress data
    if (user?.id && sidebarProgress === 0) {
      fetchUserProgress();
    }
  }, [user?.id, totalModules, sidebarProgress]);

  const handleSignOut = async () => {
    try {
      await logout();
      setAvatarDropdownOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleAvatarDropdown = () => {
    setAvatarDropdownOpen(!avatarDropdownOpen);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (avatarDropdownOpen && !event.target.closest('.avatar-dropdown-container')) {
        setAvatarDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [avatarDropdownOpen]);

  return (
    <div className="app-layout">
      {/* Mobile Header */}
      <header className="mobile-header">
        <div className="avatar-dropdown-container">
          <button className="mobile-avatar" onClick={toggleAvatarDropdown}>
            <div className="avatar">
              {user?.username?.charAt(0) || 'U'}
            </div>
            <div 
              className="progress-ring" 
              style={{ '--progress': sidebarProgress }}
            >
              <div className="progress-fill"></div>
            </div>
          </button>

          {avatarDropdownOpen && (
            <div className="avatar-dropdown">
              <div className="dropdown-header">
                <div className="user-name">
                  {user?.username || 'User'}
                </div>
                <div className="user-progress">
                  {sidebarProgress}% Complete
                </div>
              </div>
              
              <div className="dropdown-stats">
                <div className="stat">
                  <div className="stat-value">{completedModules}</div>
                  <div className="stat-label">Modules Completed</div>
                </div>
                <div className="stat">
                  <div className="stat-value">{totalModules}</div>
                  <div className="stat-label">Total Modules</div>
                </div>
              </div>

              <button className="dropdown-logout" onClick={handleSignOut}>
                <span className="material-icons">logout</span>
                Logout
              </button>
            </div>
          )}
        </div>
        
        <div className="mobile-logo">
          <span className="material-icons logo-icon">savings</span>
          <div className="logo">FUNDamentals</div>
        </div>

        <button className="burger-menu" onClick={toggleMobileMenu}>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </button>
      </header>

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(false)}>
          <nav className="mobile-nav" onClick={(e) => e.stopPropagation()}>
            <ul>
              <li>
                <Link 
                  to="/dashboard" 
                  className={isActive('/dashboard') ? 'active' : ''}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="material-icons">dashboard</span> Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  to="/modules" 
                  className={isActive('/modules') ? 'active' : ''}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="material-icons">menu_book</span> Modules
                </Link>
              </li>
              <li>
                <Link 
                  to="/simulations" 
                  className={isActive('/simulations') ? 'active' : ''}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="material-icons">science</span> Calculators
                </Link>
              </li>
              <li>
                <Link 
                  to="/games" 
                  className={isActive('/games') ? 'active' : ''}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="material-icons">sports_esports</span> Mini-Games
                </Link>
              </li>
              <li>
                <Link 
                  to="/vocab" 
                  className={isActive('/vocab') ? 'active' : ''}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="material-icons">school</span> Money Words
                </Link>
              </li>
              <li>
                <Link 
                  to="/profile" 
                  className={isActive('/profile') ? 'active' : ''}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="material-icons">person</span> Profile
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-container">
          <span className="material-icons logo-icon">savings</span>
          <div className="logo">FUNDamentals</div>
        </div>
        
        <nav>
          <ul>
            <li>
              <Link 
                to="/dashboard" 
                className={isActive('/dashboard') ? 'active' : ''}
              >
                <span className="material-icons">dashboard</span> Dashboard
              </Link>
            </li>
            <li>
              <Link 
                to="/modules" 
                className={isActive('/modules') ? 'active' : ''}
              >
                <span className="material-icons">menu_book</span> Modules
              </Link>
            </li>
            <li>
              <Link 
                to="/simulations" 
                className={isActive('/simulations') ? 'active' : ''}
              >
                <span className="material-icons">science</span> Calculators
              </Link>
            </li>
            <li>
              <Link 
                to="/games" 
                className={isActive('/games') ? 'active' : ''}
              >
                <span className="material-icons">sports_esports</span> Mini-Games
              </Link>
            </li>
            <li>
              <Link 
                to="/vocab" 
                className={isActive('/vocab') ? 'active' : ''}
              >
                <span className="material-icons">school</span> Money Words
              </Link>
            </li>
            <li>
              <Link 
                to="/profile" 
                className={isActive('/profile') ? 'active' : ''}
              >
                <span className="material-icons">person</span> Profile
              </Link>
            </li>
          </ul>
        </nav>

        {/* User Profile Box */}
        <div className="profile-box">
          <div className="avatar-container">
            <div className="avatar">
              {user?.username?.charAt(0) || 'U'}
            </div>
            <div 
              className="progress-ring" 
              style={{ '--progress': sidebarProgress }}
            >
              <div className="progress-fill"></div>
            </div>
          </div>
          
          <div className="user-info">
            <div className="user-name">
              {user?.username || 'User'}
            </div>
            <div className="user-progress">
              {sidebarProgress}% Complete
            </div>
          </div>

          {/* Tooltip */}
          <div className="tooltip">
            <div className="tooltip-header">Progress Overview</div>
            <div className="tooltip-stats">
              <div className="stat">
                <div className="stat-value">{completedModules}</div>
                <div className="stat-label">Modules</div>
              </div>
              <div className="stat">
                <div className="stat-value">{totalModules}</div>
                <div className="stat-label">Total</div>
              </div>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button className="logout-btn" onClick={handleSignOut}>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;
